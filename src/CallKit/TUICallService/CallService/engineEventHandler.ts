import { ITUIStore } from '../interface/ITUIStore';
// @ts-ignore
import { TUICallEvent } from 'tuicall-engine-webrtc';
import { IUserInfo } from '../interface/ICallService';
import { StoreName, CallStatus, CallMediaType, NAME, CallRole, StatusChange, ErrorCode, ErrorMessage, AudioPlayBackDevice,
  NETWORK_QUALITY_THRESHOLD } from '../const/index';
import { CallTips, t } from '../locales/index';
import { initAndCheckRunEnv } from './miniProgram';
import { getMyProfile, getRemoteUserProfile, updateRoomIdAndRoomIdType, analyzeEventData, deleteRemoteUser } from './utils';
import promiseRetryDecorator from '../utils/decorators/promise-retry';
import { UIDesign } from './UIDesign';
import TuiStore from '../TUIStore/tuiStore';
const TUIStore: ITUIStore = TuiStore.getInstance();
const uiDesign = UIDesign.getInstance();


export default class EngineEventHandler {
  static instance: EngineEventHandler;
  private _callService: any;

  constructor(options) {
    this._callService = options.callService;
  }

  static getInstance(options) {
    if (!EngineEventHandler.instance) {
      EngineEventHandler.instance = new EngineEventHandler(options);
    }
    return EngineEventHandler.instance;
  }
  public addListenTuiCallEngineEvent() {
    const callEngine = this._callService?.getTUICallEngineInstance();

    if (!callEngine) {
      console.warn(`${NAME.PREFIX}add engine event listener failed, engine is empty.`);
      return;
    }

    callEngine.on(TUICallEvent.ERROR, this._handleError, this);
    callEngine.on(TUICallEvent.INVITED, this._handleNewInvitationReceived, this); // 收到邀请事件
    callEngine.on(TUICallEvent.USER_ACCEPT, this._handleUserAccept, this); // 主叫收到被叫接通事件
    callEngine.on(TUICallEvent.USER_ENTER, this._handleUserEnter, this); // 有用户进房事件
    callEngine.on(TUICallEvent.USER_LEAVE, this._handleUserLeave, this); // 有用户离开通话事件
    callEngine.on(TUICallEvent.REJECT, this._handleInviteeReject, this); // 主叫收到被叫的拒绝通话事件
    callEngine.on(TUICallEvent.NO_RESP, this._handleNoResponse, this); // 主叫收到被叫的无应答事件
    callEngine.on(TUICallEvent.LINE_BUSY, this._handleLineBusy, this); // 主叫收到被叫的忙线事件
    callEngine.on(TUICallEvent.CALLING_CANCEL, this._handleCallingCancel, this); // 主被叫在通话未建立时, 收到的取消事件
    callEngine.on(TUICallEvent.SDK_READY, this._handleSDKReady, this); // SDK Ready 回调
    callEngine.on(TUICallEvent.KICKED_OUT, this._handleKickedOut, this); // 未开启多端登录时, 多端登录收到的被踢事件
    callEngine.on(TUICallEvent.MESSAGE_SENT_BY_ME, this._messageSentByMe, this);
    // @ts-ignore
    TUICallEvent.CALL_MESSAGE && callEngine.on(TUICallEvent.CALL_MESSAGE, this._handleCallMessage, this); // call message card display event
    // @ts-ignore
    TUICallEvent.ON_USER_NETWORK_QUALITY_CHANGED && callEngine.on(TUICallEvent.ON_USER_NETWORK_QUALITY_CHANGED, this._handleNetworkQuality, this); // 用户网络质量
    callEngine.on(TUICallEvent.CALLING_END, this._handleCallingEnd, this); // 主被叫在通话结束时, 收到的通话结束事件
    callEngine.on(TUICallEvent.CALL_TYPE_CHANGED, this._handleCallTypeChange, this);
    callEngine.on(TUICallEvent.USER_VIDEO_AVAILABLE, this._handleUserVideoAvailable, this);
    callEngine.on(TUICallEvent.USER_AUDIO_AVAILABLE, this._handleUserAudioAvailable, this);
    callEngine.on(TUICallEvent.USER_VOICE_VOLUME, this._handleUserVoiceVolume, this);
    callEngine.on(TUICallEvent.DEVICED_UPDATED, this._handleDeviceUpdate, this);
  }
  public removeListenTuiCallEngineEvent() {
    const callEngine = this._callService?.getTUICallEngineInstance();

    callEngine.off(TUICallEvent.ERROR, this._handleError, this);
    callEngine.off(TUICallEvent.INVITED, this._handleNewInvitationReceived, this);
    callEngine.off(TUICallEvent.USER_ACCEPT, this._handleUserAccept, this);
    callEngine.off(TUICallEvent.USER_ENTER, this._handleUserEnter, this);
    callEngine.off(TUICallEvent.USER_LEAVE, this._handleUserLeave, this);
    callEngine.off(TUICallEvent.REJECT, this._handleInviteeReject, this);
    callEngine.off(TUICallEvent.NO_RESP, this._handleNoResponse, this);
    callEngine.off(TUICallEvent.LINE_BUSY, this._handleLineBusy, this);
    callEngine.off(TUICallEvent.CALLING_CANCEL, this._handleCallingCancel, this);
    callEngine.off(TUICallEvent.SDK_READY, this._handleSDKReady, this);
    callEngine.off(TUICallEvent.KICKED_OUT, this._handleKickedOut, this);
    callEngine.off(TUICallEvent.MESSAGE_SENT_BY_ME, this._messageSentByMe, this);
    // @ts-ignore
    TUICallEvent.ON_USER_NETWORK_QUALITY_CHANGED && callEngine.off(TUICallEvent.ON_USER_NETWORK_QUALITY_CHANGED, this._handleNetworkQuality, this);
    callEngine.off(TUICallEvent.CALLING_END, this._handleCallingEnd, this);
    callEngine.off(TUICallEvent.CALL_TYPE_CHANGED, this._handleCallTypeChange, this); // TODO: web 是 CALL_TYPE_CHANGED 事件, miniProgram 为 CALL_MODE
    callEngine.off(TUICallEvent.USER_VIDEO_AVAILABLE, this._handleUserVideoAvailable, this);
    callEngine.off(TUICallEvent.USER_AUDIO_AVAILABLE, this._handleUserAudioAvailable, this);
    callEngine.off(TUICallEvent.USER_VOICE_VOLUME, this._handleUserVoiceVolume, this); // web
    callEngine.off(TUICallEvent.DEVICED_UPDATED, this._handleDeviceUpdate, this);
  }
  private _callerChangeToConnected() {
    const callRole = TUIStore.getData(StoreName.CALL, NAME.CALL_ROLE);
    const callStatus = TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS);

    if (callStatus === CallStatus.CALLING && callRole === CallRole.CALLER) {
      TUIStore.update(StoreName.CALL, NAME.CALL_STATUS, CallStatus.CONNECTED);
      this._callService?.startTimer();
    }
  }
  private _unNormalEventsManager(event: any, eventName: TUICallEvent): void {
    console.log(`${NAME.PREFIX}${eventName} event data: ${JSON.stringify(event)}.`);
    const isGroup = TUIStore.getData(StoreName.CALL, NAME.IS_GROUP);
    const remoteUserInfoList = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST);

    switch (eventName) {
      case TUICallEvent.REJECT:
      case TUICallEvent.LINE_BUSY: {
        const { userID: userId } = analyzeEventData(event);
        let callTipsKey = eventName === TUICallEvent.REJECT ? CallTips.OTHER_SIDE_REJECT_CALL : CallTips.OTHER_SIDE_LINE_BUSY;
        let userListNeedToShow = '';
        if (isGroup) {
          userListNeedToShow = (remoteUserInfoList.find(obj => obj.userId === userId) || {}).displayUserInfo || userId;
          callTipsKey = eventName === TUICallEvent.REJECT ? CallTips.REJECT_CALL : CallTips.IN_BUSY;
        }
        TUIStore.update(StoreName.CALL, NAME.TOAST_INFO, { content: { key: callTipsKey, options: { userList: userListNeedToShow } } });
        userId && deleteRemoteUser([userId]);
        break;
      }
      case TUICallEvent.NO_RESP: {
        const { userIDList = [] } = analyzeEventData(event);
        const callTipsKey = isGroup ? CallTips.TIMEOUT : CallTips.CALL_TIMEOUT;
        const userInfoList: string[] = userIDList.map(userId => {
          const userInfo: IUserInfo = remoteUserInfoList.find(obj => obj.userId === userId) || {};
          return userInfo.displayUserInfo || userId;
        });
        TUIStore.update(StoreName.CALL, NAME.TOAST_INFO, { content: { key: callTipsKey, options: { userList: userInfoList.join() } } });
        userIDList.length > 0 && deleteRemoteUser(userIDList);
        break;
      }
      case TUICallEvent.CALLING_CANCEL: {
        this._callService?._resetCallStore();
        break;
      }
    }
  }


  private _handleError(event: any): void {
    const { code, message } = event || {};
    const index = Object.values(ErrorCode).indexOf(code);
    let callTips = '';

    if (index !== -1) {
      const key = Object.keys(ErrorCode)[index];
      callTips = t(ErrorMessage[key]);
      callTips && TUIStore.update(StoreName.CALL, NAME.TOAST_INFO, { content: ErrorMessage[key], type: NAME.ERROR });
    }
    this._callService?.executeExternalAfterCalling();
    console.error(`${NAME.PREFIX}_handleError, errorCode: ${code}; errorMessage: ${callTips || message}.`);
  }
  private async _handleNewInvitationReceived(event: any) {
    console.log(`${NAME.PREFIX}onCallReceived event data: ${JSON.stringify(event)}.`);
    const { sponsor = '', isFromGroup, callMediaType, inviteData = {}, calleeIdList = [], groupID = '', roomID, strRoomID } = analyzeEventData(event);
    const currentUserInfo: IUserInfo = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO);
    const remoteUserIdList: string[] = [sponsor, ...calleeIdList.filter((userId: string) => userId !== currentUserInfo.userId)];
    const type = callMediaType || inviteData.callType;
    const callTipsKey = type === CallMediaType.AUDIO ? CallTips.CALLEE_CALLING_AUDIO_MSG : CallTips.CALLEE_CALLING_VIDEO_MSG;
    const updateStoreParams = {
      [NAME.CALL_ROLE]: CallRole.CALLEE,
      [NAME.IS_GROUP]: isFromGroup,
      [NAME.CALL_STATUS]: CallStatus.CALLING,
      [NAME.CALL_MEDIA_TYPE]: type,
      [NAME.CALL_TIPS]: callTipsKey,
      [NAME.CALLER_USER_INFO]: { userId: sponsor },
      [NAME.GROUP_ID]: groupID,
    };
    updateRoomIdAndRoomIdType(roomID, strRoomID);
    TUIStore.updateStore(updateStoreParams, StoreName.CALL);
    this._callService?.executeExternalBeforeCalling();
    this._callService?.statusChanged && this._callService?.statusChanged({ oldStatus: StatusChange.IDLE, newStatus: StatusChange.BE_INVITED });

    const remoteUserInfoList = await getRemoteUserProfile(remoteUserIdList, this._callService?.getTim());
    const [userInfo] = remoteUserInfoList.filter((userInfo: IUserInfo) => userInfo.userId === sponsor);

    remoteUserInfoList.length > 0 && TUIStore.updateStore({
      [NAME.REMOTE_USER_INFO_LIST]: remoteUserInfoList,
      [NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST]: remoteUserInfoList,
      [NAME.CALLER_USER_INFO]: {
        userId: sponsor,
        nick: userInfo?.nick || '',
        avatar: userInfo?.avatar || '',
        displayUserInfo: userInfo?.remark || userInfo?.nick || sponsor,
      },
    }, StoreName.CALL);
  }
  private _handleUserAccept(event: any): void {
    this._callerChangeToConnected();
    TUIStore.update(StoreName.CALL, NAME.CALL_TIPS, { text: 'answered', duration: 2000 });
    console.log(`${NAME.PREFIX}accept event data: ${JSON.stringify(event)}.`);
  }
  private async _handleUserEnter(event: any): Promise<void> {

    this._callerChangeToConnected();
    const { userID: userId, data } = analyzeEventData(event);
    let remoteUserInfoList = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST);
    const isInRemoteUserList = remoteUserInfoList.find(item => item?.userId === userId);

    if (!isInRemoteUserList) {
      remoteUserInfoList.push({ userId });

      if (remoteUserInfoList.length > 0) {
        TUIStore.update(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST, remoteUserInfoList);
        TUIStore.update(StoreName.CALL, NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST, remoteUserInfoList);
      }
      const [userInfo] = await getRemoteUserProfile([userId], this._callService?.getTim());
      remoteUserInfoList = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST);
      remoteUserInfoList.forEach((obj) => {
        if (obj?.userId === userId) {
          obj = Object.assign(obj, userInfo);
        }
      });
    }
    remoteUserInfoList = remoteUserInfoList.map((obj: IUserInfo) => {
      if (obj.userId === userId) obj.isEnter = true;
      return obj;
    });

    if (remoteUserInfoList.length > 0) {
      TUIStore.update(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST, remoteUserInfoList);
      TUIStore.update(StoreName.CALL, NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST, remoteUserInfoList);
      uiDesign.updateViewBackgroundUserId('remote');
    }
    console.log(`${NAME.PREFIX}userEnter event data: ${JSON.stringify(event)}.`);
  }
  private _handleUserLeave(event: any): void {
    console.log(`${NAME.PREFIX}userLeave event data: ${JSON.stringify(event)}.`);
    const { data, userID: userId } = analyzeEventData(event);

    if (TUIStore.getData(StoreName.CALL, NAME.IS_GROUP)) {
      const remoteUserInfoList = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST);
      const userListNeedToShow: string = (remoteUserInfoList.find(obj => obj.userId === userId) || {}).displayUserInfo || userId;
      TUIStore.update(StoreName.CALL, NAME.TOAST_INFO, { content: { key: CallTips.END_CALL, options: { userList: userListNeedToShow } } });
    }
    userId && deleteRemoteUser([userId]);
  }
  private _handleInviteeReject(event: any): void {
    this._unNormalEventsManager(event, TUICallEvent.REJECT);
  }
  private _handleNoResponse(event: any): void {
    this._unNormalEventsManager(event, TUICallEvent.NO_RESP);
  }
  private _handleLineBusy(event: any): void {
    this._unNormalEventsManager(event, TUICallEvent.LINE_BUSY);
  }
  private _handleCallingCancel(event: any): void {
    this._callService?.executeExternalAfterCalling();
    this._unNormalEventsManager(event, TUICallEvent.CALLING_CANCEL);
  }
  private _handleCallingEnd(event: any): void {
    console.log(`${NAME.PREFIX}callEnd event data: ${JSON.stringify(event)}.`);

    this._callService?.executeExternalAfterCalling();
    this._callService?._resetCallStore();
  }
  // SDK_READY 后才能调用 tim 接口, 否则登录后立刻获取导致调用接口失败. v2.27.4+、v3 接口 login 后会抛出 SDK_READY
  private async _handleSDKReady(event: any): Promise<void> {
    let localUserInfo: IUserInfo = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO);
    localUserInfo = await getMyProfile(localUserInfo.userId, this._callService?.getTim());

    TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO, localUserInfo);
    TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN, localUserInfo);
  }
  private _handleKickedOut(event: any): void {
    console.log(`${NAME.PREFIX}kickOut event data: ${JSON.stringify(event)}.`);

    this._callService?.kickedOut && this._callService?.kickedOut(event);

    TUIStore.update(StoreName.CALL, NAME.CALL_TIPS, CallTips.KICK_OUT);
    this._callService?._resetCallStore();
  }
  private _messageSentByMe(event: any): void {
    const message = event?.data;

    this._callService?.onMessageSentByMe && this._callService?.onMessageSentByMe(message);
  }
  private _handleCallMessage(event: any) {
    const message = analyzeEventData(event);
    this._callService._chatCombine.callTUIService({ message });
  }
  private _handleCallTypeChange(event: any): void {
    const { newCallType, type } = analyzeEventData(event);
    TUIStore.update(StoreName.CALL, NAME.CALL_MEDIA_TYPE, newCallType || type);

  }
  private _handleNetworkQuality(event) {
    const { networkQualityList = [] } = analyzeEventData(event);
    TUIStore.update(StoreName.CALL, NAME.NETWORK_STATUS, networkQualityList);
    const isGroup = TUIStore.getData(StoreName.CALL, NAME.IS_GROUP);
    const localUserInfo = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO);
    const remoteUserInfoList = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST);

    if(!isGroup) {
      const isLocalNetworkPoor = networkQualityList.find(user => localUserInfo?.userId === user?.userId && user?.quality >= NETWORK_QUALITY_THRESHOLD);
      if(isLocalNetworkPoor) {
        TUIStore.update(StoreName.CALL, NAME.CALL_TIPS, CallTips.LOCAL_NETWORK_IS_POOR);
        return;
      }
    }
  }
  // =============================【 WEB 私有事件】==============================
  @promiseRetryDecorator({
    retries: 5,
    timeout: 200,
    onRetrying(retryCount) {
      console.warn(`${NAME.PREFIX}_startRemoteView, retrying [${retryCount}]`);
    },
  })
  private async _startRemoteView(userId: string, domId: string) {
    if (!userId) {
      console.warn(`${NAME.PREFIX}_startRemoteView userID is empty`);
      return;
    }

    if (!document.getElementById(domId)) {
      console.warn(`${NAME.PREFIX}_startRemoteView can't find HTMLElement sid: ${userId}`);
      return Promise.reject();
    }

    try {
      const displayMode = TUIStore.getData(StoreName.CALL, NAME.DISPLAY_MODE);
      await this._callService?.getTUICallEngineInstance().startRemoteView({ userID: userId, videoViewDomID: domId, options: { objectFit: displayMode } });
    } catch (error: any) {
      console.error(`${NAME.PREFIX}_startRemoteView error: ${error}.`);
      return Promise.reject(error);
    }


  }
  private _setRemoteUserInfoAudioVideoAvailable(isAvailable: boolean, type: string, userId: string) {
    let remoteUserInfoList = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST);

    remoteUserInfoList = remoteUserInfoList.map((obj: IUserInfo) => {
      if (obj.userId === userId) {
        if (type === NAME.AUDIO) {
          return { ...obj, isAudioAvailable: isAvailable };
        }
        if (type === NAME.VIDEO) {
          return { ...obj, isVideoAvailable: isAvailable };
        }
      }
      return obj;
    });

    if (remoteUserInfoList.length > 0) {
      TUIStore.update(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST, remoteUserInfoList);
      TUIStore.update(StoreName.CALL, NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST, remoteUserInfoList);
    }
  }
  private async _handleUserVideoAvailable(event: any): Promise<any> {
    const { userID: userId, isVideoAvailable } = analyzeEventData(event);
    console.log(`${NAME.PREFIX}_handleUserVideoAvailable event data: ${JSON.stringify(event)}.`);
    let localUserInfo = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN);
    let domId = '';

    if (localUserInfo?.userId?.startsWith('user')) { // 用户：local 渲染自己，remote 渲染 virtual
      if (userId?.startsWith('virtual')) {
        domId = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST)[0].domId;

        try {
          isVideoAvailable && await this._startRemoteView(userId, domId);
        } catch (error) {
          console.error(`${NAME.PREFIX}_startRemoteView failed, error: ${error}.`);
        }
        const remoteUserInfoList: IUserInfo[] = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST);
        this._setRemoteUserInfoAudioVideoAvailable(isVideoAvailable, NAME.VIDEO, remoteUserInfoList[0].userId);

      } else {
        return;
      }
    } else if (localUserInfo?.userId?.startsWith('custom')) { // 客服：local 渲染 virtual, remote 渲染 user
      if (userId?.startsWith('user')) {
        domId = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST)[0].domId;

        try {
          isVideoAvailable && await this._startRemoteView(userId, domId);
        } catch (error) {
          console.error(`${NAME.PREFIX}_startRemoteView failed, error: ${error}.`);
        }
    
        const remoteUserInfoList: IUserInfo[] = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST);
        this._setRemoteUserInfoAudioVideoAvailable(isVideoAvailable, NAME.VIDEO, remoteUserInfoList[0].userId);

      } else if (userId?.startsWith('virtual')) {
        domId = 'localVideo';
        try {
          isVideoAvailable && await this._startRemoteView(userId, domId);
        } catch (error) {
          console.error(`${NAME.PREFIX}_startRemoteView failed, error: ${error}.`);
        }

        const [virtualUserInfo] = await getRemoteUserProfile([userId], this._callService.getTim());
        localUserInfo = { ...localUserInfo, virtualId: virtualUserInfo.userId, nick: virtualUserInfo.nick || virtualUserInfo.userId, isVideoAvailable };
        
        TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO, localUserInfo);
        TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN, localUserInfo);
      } else {
        return;
      }
    } else { // 非用户or客服，不做处理
      return ;
    }
  }
  private async _handleUserAudioAvailable(event: any): Promise<void>  {
    const { userID: userId, isAudioAvailable } = analyzeEventData(event);
    console.log(`${NAME.PREFIX}_handleUserAudioAvailable event data: ${JSON.stringify(event)}.`);
    const localUserInfo = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN);
    const trcCloudInstance = this._callService.getTUICallEngineInstance().getTRTCCloudInstance();
   
    if (localUserInfo?.userId?.startsWith('user')) { // 用户：订阅 virtual 音频
      if (!userId?.startsWith('virtual')) {
        setTimeout(async () => {
          await trcCloudInstance.muteRemoteAudio(userId, true);
          await trcCloudInstance.setRemoteAudioVolume(userId, 0);
        }, 300)
      }
    } else if (localUserInfo?.userId?.startsWith('custom')) { // 客服：订阅 virtual、user 音频

    } else { // 非用户or客服，不做处理
      return ;
    }
    
    const remoteUserInfoList: IUserInfo[] = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST);
    this._setRemoteUserInfoAudioVideoAvailable(isAudioAvailable, NAME.AUDIO, remoteUserInfoList[0].userId);
    

  }
  private _handleUserVoiceVolume(event: any): void {
    try {
      const { volumeMap: volumeList } = analyzeEventData(event);
      if ((volumeList || []).length === 0) return; // 减少不必要的更新

      const localUserInfo: IUserInfo = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO);
      let remoteUserInfoList: IUserInfo[] = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST);
      const [localUserVolumeObj] = volumeList.filter((obj: any) => obj.userId === localUserInfo.userId);
      const remoteUserVolumeObj = volumeList.reduce((acc: any, obj: any) => {
        if (obj.userId !== localUserInfo.userId) {
          return { ...acc, [obj.userId]: obj.audioVolume };
        }
        return acc;
      }, {});
      localUserInfo.volume = localUserVolumeObj.audioVolume;
      remoteUserInfoList = remoteUserInfoList.map((obj: any) => ({ ...obj, volume: remoteUserVolumeObj[obj.userId] }));
      const updateStoreParams = {
        [NAME.LOCAL_USER_INFO]: localUserInfo,
        [NAME.REMOTE_USER_INFO_LIST]: remoteUserInfoList,
      };
      TUIStore.updateStore(updateStoreParams, StoreName.CALL);
    } catch (error) {
      console.debug(error);
    }
  }
  private _handleDeviceUpdate(event: any): void {
    const { cameraList, microphoneList, speakerList, currentCamera, currentMicrophone, currentSpeaker } = event;
    TUIStore.update(StoreName.CALL, NAME.DEVICE_LIST, { cameraList, microphoneList, speakerList, currentCamera, currentMicrophone, currentSpeaker });
  }
}
