import { TUICore, TUILogin, TUIConstants, ExtensionInfo } from '@tencentcloud/tui-core';
import { CallMediaType, AudioCallIcon, VideoCallIcon, LOG_LEVEL, COMPONENT, StoreName, NAME, CallStatus, CallType, ACTION_TYPE } from '../const/index';
import { isUndefined, formatTime, JSONToObject } from '../utils/common-utils';
import { getRemoteUserProfile } from './utils';
import { ITUIStore } from '../interface/ITUIStore';
import TuiStore from '../TUIStore/tuiStore';
// @ts-ignore
import TencentCloudChat from '@tencentcloud/chat';
import { t } from '../locales/index';
const TUIStore: ITUIStore = TuiStore.getInstance();

const cmd2messageCardContentMap = {
  audioCall: () => 'Voice call',
  videoCall: () => 'Video call',
  switchToAudio: () => 'Switch audio call',
  switchToVideo: () => 'Switch video call',
  hangup: ({ callDuration }) => `${t('Call duration')}：${callDuration}`,
};
export default class ChatCombine {
  static instance: ChatCombine;
  private _callService: any;

  constructor(options) {
    this._callService = options.callService;

    // 下面：TUICore注册事件，注册组件服务，注册界面拓展
    TUICore.registerEvent(TUIConstants.TUILogin.EVENT.LOGIN_STATE_CHANGED, TUIConstants.TUILogin.EVENT_SUB_KEY.USER_LOGIN_SUCCESS, this); // onNotifyEvent 
    // @ts-ignore
    if (TUIConstants.TUIChat?.EVENT) {
      // @ts-ignore
      TUICore.registerEvent(TUIConstants.TUIChat.EVENT?.CHAT_STATE_CHANGED, TUIConstants.TUIChat.EVENT_SUB_KEY?.CHAT_OPENED, this); // onNotifyEvent 
    }
    TUICore.registerService(TUIConstants.TUICalling.SERVICE.NAME, this); // onCall
    TUICore.registerExtension(TUIConstants.TUIChat.EXTENSION.INPUT_MORE.EXT_ID, this); // onGetExtension
  }

  static getInstance(options) {
    if (!ChatCombine.instance) {
      ChatCombine.instance = new ChatCombine(options);
    }
    return ChatCombine.instance;
  }
  // ================ 【】 ================
  /**
   * message on screen
   * @param {Any} params Parameters for message up-screening
   */
  public callTUIService(params) {
    const { message } = params || {};
    TUICore.callService({
      serviceName: TUIConstants.TUIChat.SERVICE.NAME,
      method: TUIConstants.TUIChat.SERVICE.METHOD.UPDATE_MESSAGE_LIST,
      params: { message },
    });
  }
  /**
   * tuicore getExtension
   * @param {String} extensionID extension id
   * @param {Any} params tuicore pass parameters
   * @returns {Any[]} return extension
   */
  public onGetExtension(extensionID: string, params: any) {
    if (extensionID === TUIConstants.TUIChat.EXTENSION.INPUT_MORE.EXT_ID) {
      this._callService.getTUICallEngineInstance()?.reportLog?.({ name: 'TUICallKit.onGetExtension', data: { extensionID, params } });

      if (isUndefined(params)) return [];
      // room and customer_service ChatType not show audio and video icon.
      // @ts-ignore
      if ([TUIConstants.TUIChat.TYPE.ROOM, TUIConstants.TUIChat.TYPE.CUSTOMER_SERVICE].includes(params.chatType)) return [];

      let list = [];
      const audioCallExtension: ExtensionInfo = {
        weight: 1000,
        text: '语音通话',
        icon: AudioCallIcon,
        data: {
          name: 'voiceCall',
        },
        listener: {
          onClicked: async options => await this._handleTUICoreOnClick(options, options.type || CallMediaType.AUDIO),
        },
      };
      const videoCallExtension: ExtensionInfo = {
        weight: 900,
        text: '视频通话',
        icon: VideoCallIcon,
        data: {
          name: 'videoCall',
        },
        listener: {
          onClicked: async options => await this._handleTUICoreOnClick(options, options.type || CallMediaType.VIDEO),
        },
      };

      if (params?.chatType) {
        list = [audioCallExtension, videoCallExtension];
      } else {
        !params?.filterVoice && list.push(audioCallExtension);
        !params?.filterVideo && list.push(videoCallExtension);
      }
      return list;
    }
  }
  public async onCall(method: String, params: any) {
    if (method === TUIConstants.TUICalling.SERVICE.METHOD.START_CALL) {
      await this._handleTUICoreOnClick(params, params.type);
    }
  }
  /**
   * tuicore notify event manager
   * @param {String} eventName event name
   * @param {String} subKey sub key
   * @param {Any} options tuicore event parameters
   */
  public async onNotifyEvent(eventName: string, subKey: string, options?: any) {
    try {
      if (eventName === TUIConstants.TUILogin.EVENT.LOGIN_STATE_CHANGED) {
        // TUICallkit executes its own business logic when it receives a successful login.
        if (subKey === TUIConstants.TUILogin.EVENT_SUB_KEY.USER_LOGIN_SUCCESS) {
          // @ts-ignore
          const { chat, userID, userSig, SDKAppID } = TUILogin.getContext();

          await this._callService?.init({ tim: chat, userID, userSig, sdkAppID: SDKAppID, isFromChat: true, component: COMPONENT.TIM_CALL_KIT });
          this._callService?.setIsFromChat(true);
          this._callService?.setLogLevel(LOG_LEVEL.NORMAL); // setLogLevel to 0 in tuikit. easy to find out problem via logs.
          this._addListenChatEvent();
        } else if (subKey === TUIConstants.TUILogin.EVENT_SUB_KEY.USER_LOGOUT_SUCCESS) {
          this._removeListenChatEvent();
          await this._callService?.destroyed();
        }
      }
      // @ts-ignore
      if (TUIConstants.TUIChat?.EVENT && eventName === TUIConstants.TUIChat.EVENT.CHAT_STATE_CHANGED) {
        // @ts-ignore
        if (subKey === TUIConstants.TUIChat.EVENT_SUB_KEY.CHAT_OPENED) {
          this._callService?.setCurrentGroupId(options?.groupID || '');
          if (TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS) !== CallStatus.IDLE) return;
          
          const currentGroupId = this._callService?.getCurrentGroupId();
          const groupAttributes = currentGroupId ? await this.getGroupAttributes(this._callService?.getTim(), currentGroupId) : {};
          await this.updateStoreBasedOnGroupAttributes(groupAttributes);
        }
      }
    } catch (error) {
      console.error(`${NAME.PREFIX}TUICore onNotifyEvent failed, error: ${error}.`);
    }
  }
  // Handling the chat+call scenario, data required for the joinInGroupCall API: update store / clear relevant store data
  public async updateStoreBasedOnGroupAttributes(groupAttributes: any) {
    this._callService?.getTUICallEngineInstance()?.reportLog?.({
      name: 'TUICallKit.getJoinGroupCallInfo.success',
      data: { groupAttributes },
    });
    try {
      const {
        group_id: groupId = '',
        room_id: roomId = 0, 
        room_id_type: roomIdType = 0,
        call_media_type: callType = NAME.UNKNOWN,
        // @ts-ignore
        user_list: userList, // The default value of the user list returned by the background is null
      } = groupAttributes[NAME.INNER_ATTR_KIT_INFO] ? JSON.parse(groupAttributes[NAME.INNER_ATTR_KIT_INFO]) : {};
      let userListInfo = (userList || []).map(user => user.userid);
      userListInfo = userListInfo.length && await getRemoteUserProfile(userListInfo, this._callService?.getTim());
      const updateStoreParams = {
        [NAME.GROUP_ID]: groupId,
        [NAME.GROUP_CALL_MEMBERS]: userListInfo,
        [NAME.ROOM_ID]: roomId,
        [NAME.CALL_MEDIA_TYPE]: CallType[callType],
        [NAME.ROOM_ID_TYPE]: roomIdType,
      };
      TUIStore.updateStore(updateStoreParams, StoreName.CALL);
    } catch (error) {
      console.warn(`${NAME.PREFIX}updateStoreBasedOnGroupAttributes fail, error: ${error}`);
    }
  }
  // Get group attribute
  public async getGroupAttributes(tim: any, groupId: string) {
    if (!groupId) return {};

    try {
      const { data } = await tim.getGroupAttributes({
        groupID: groupId,
        keyList: []
      });
      return data?.groupAttributes || {};
    } catch (error) {
      console.warn(`${NAME.PREFIX}getGroupAttributes fail: ${error}`);
      return {};
    }
  }
  isLineBusy(message) {
    const callMessage: any = JSONToObject(message.payload.data);
    const objectData = JSONToObject(callMessage?.data);

    return objectData?.line_busy === 'line_busy' || objectData?.line_busy === '' || objectData?.data?.message === 'lineBusy';
  }
  async getCallKitMessage(message: any, tim: any) {
    const callMessage: any = JSONToObject(message.payload.data);
    if (callMessage?.businessID !== 1) {
      return {};
    }

    let messageCardContent = '';
    const objectData = JSONToObject(callMessage?.data);
    const callMediaType = objectData.call_type;
    const inviteeList = callMessage.inviteeList;
    const inviter = objectData?.data?.inviter;
    const localUserId = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO).userId;
    const isInviter = inviter === localUserId;

    const cmd = objectData?.data?.cmd;
    switch (callMessage?.actionType) {
      case ACTION_TYPE.INVITE: {
        messageCardContent = cmd2messageCardContentMap[cmd]({ callDuration: formatTime(objectData?.call_end) });
        break;
      }
      case ACTION_TYPE.CANCEL_INVITE:
        messageCardContent = isInviter ? 'Call Cancel' : 'Other Side Cancel';
        break;
      case ACTION_TYPE.ACCEPT_INVITE:
        if (['switchToAudio', 'switchToVideo'].includes(cmd)) {
          messageCardContent = cmd2messageCardContentMap?.[cmd]?.();
        } else {
          messageCardContent = t('Answered');
        }

        break;
      case ACTION_TYPE.REJECT_INVITE:
        if (this.isLineBusy(message)) {
          messageCardContent = isInviter ? 'Line Busy' : 'Other Side Line Busy';
        } else {
          messageCardContent = isInviter ? 'Other Side Decline' : 'Decline';
        }

        break;
      case ACTION_TYPE.INVITE_TIMEOUT:
        if (['switchToAudio', 'switchToVideo'].includes(cmd)) {
          messageCardContent = cmd2messageCardContentMap?.[cmd]?.();
        } else {
          messageCardContent = isInviter ? 'Other Side No Answer' : 'No answer';
        }

        break;
    }

    return { messageCardContent, callMediaType, inviteeList };
  }
  // =========================【chat: event listening】=========================
  private _addListenChatEvent() {
    if (!this._callService?.getTim()) {
      console.warn(`${NAME.PREFIX}add tim event listener failed, tim is empty.`);
      return;
    }
    this._callService?.getTim().on(TencentCloudChat.EVENT.GROUP_ATTRIBUTES_UPDATED, this._handleGroupAttributesUpdated, this);
  }
  private _removeListenChatEvent() {
    if (!this._callService?.getTim()) {
      console.warn(`${NAME.PREFIX}remove tim event listener failed, tim is empty.`);
      return;
    }
    this._callService?.getTim().off(TencentCloudChat.EVENT.GROUP_ATTRIBUTES_UPDATED, this._handleGroupAttributesUpdated, this);
  }
  /**
   * chat start audio/video call via click
   * @param {Any} options Parameters passed in when clicking on an audio/video call from chat
   * @param {CallMediaType} type call media type. 0 - audio; 1 - video.
   */
  private async _handleTUICoreOnClick(options, type: CallMediaType) {
    try {
      const { groupID, userIDList = [], ...rest } = options;
      
      if (groupID) {
        await this._callService?.groupCall({ groupID, userIDList, type, ...rest });
      } else if (userIDList.length === 1) {
        console.error('chat-call');
        
        await this._callService?.call({ userID: userIDList[0], type, ...rest });
      }
    } catch (error: any) {
      console.debug(error);
    }
  }
  private async _handleGroupAttributesUpdated(event) {
    if (TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS) !== CallStatus.IDLE) return;

    const data = event?.data || {};
    const { groupID: groupId = '', groupAttributes = {} } = data;

    if (groupId !== this._callService?.getCurrentGroupId()) return;

    await this.updateStoreBasedOnGroupAttributes(groupAttributes);
  }
}
