import { NAME, StoreName, CallStatus, StatusChange, CallMediaType, ROOM_ID_TYPE } from '../const/index';
import { handleNoDevicePermissionError } from '../utils/common-utils';
import { IUserInfo } from '../interface/ICallService';
import { ITUIStore } from '../interface/ITUIStore';
import { CallTips, t } from '../locales/index';
import TuiStore from '../TUIStore/tuiStore';
// @ts-ignore
const TUIStore: ITUIStore = TuiStore.getInstance();

// 设置默认的 UserInfo 信息
export function setDefaultUserInfo(userId: string, domId?: string): IUserInfo {
  const userInfo: IUserInfo = {
    userId,
    nick: '',
    avatar: '',
    remark: '',
    displayUserInfo: '',
    isAudioAvailable: false,
    isVideoAvailable: false,
    isEnter: false,
    domId: domId || userId,
  };
  return domId ? userInfo : { ...userInfo, isEnter: false }; // localUserInfo 没有 isEnter, remoteUserInfoList 有 isEnter
}
// 获取个人用户信息
export async function getMyProfile(myselfUserId: string, tim: any): Promise<IUserInfo> {
  let localUserInfo: IUserInfo = setDefaultUserInfo(myselfUserId, NAME.LOCAL_VIDEO);
  try {
    if (!tim) return localUserInfo;
    const res = await tim.getMyProfile();
    const currentLocalUserInfo = TUIStore?.getData(StoreName.CALL, NAME.LOCAL_USER_INFO); // localUserInfo may have been updated
    if (res?.code === 0) {
      if (res?.data?.userID.startsWith('custom')) {
        localUserInfo = {
          ...localUserInfo,
          ...currentLocalUserInfo,
          userId: res?.data?.userID,
          nick: 'virtual',
          avatar: res?.data?.avatar,
          displayUserInfo: res?.data?.nick || res?.data?.userID,
        };
      } else {
        localUserInfo = {
          ...localUserInfo,
          ...currentLocalUserInfo,
          userId: res?.data?.userID,
          nick: res?.data?.nick,
          avatar: res?.data?.avatar,
          displayUserInfo: res?.data?.nick || res?.data?.userID,
        };
      }
      
    }
    return localUserInfo;
  } catch (error) {
    console.error(`${NAME.PREFIX}getMyProfile failed, error: ${error}.`);
    return localUserInfo;
  }
}
// 获取远端用户列表信息
export async function getRemoteUserProfile(userIdList: Array<string>, tim: any): Promise<any> {
  let remoteUserInfoList: IUserInfo[] = userIdList.map((userId: string) => setDefaultUserInfo(userId));
  try {
    if (!tim) return remoteUserInfoList;
    const res = await tim.getFriendProfile({ userIDList: userIdList });
    if (res.code === 0) {
      const { friendList = [], failureUserIDList = [] } = res.data;
      let unFriendList: IUserInfo[] = failureUserIDList.map((obj: any) => obj.userID);
      if (failureUserIDList.length > 0) {
        const res = await tim.getUserProfile({ userIDList: failureUserIDList.map((obj: any) => obj.userID) });
        if (res?.code === 0) {
          unFriendList = res?.data || [];
        }
      }
      const currentRemoteUserInfoList = TUIStore?.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST); // remoteUserInfoList may have been updated
      const tempFriendIdList: string[] = friendList.map((obj: any) => obj.userID);
      const tempUnFriendIdList: string[] = unFriendList.map((obj: any) => obj.userID);
      remoteUserInfoList = userIdList.map((userId: string) => {
        const defaultUserInfo: IUserInfo = setDefaultUserInfo(userId);
        const friendListIndex: number = tempFriendIdList.indexOf(userId);
        const unFriendListIndex: number = tempUnFriendIdList.indexOf(userId);
        let remark = '';
        let nick = '';
        let displayUserInfo = '' ;
        let avatar = '';
        if (friendListIndex !== -1) {
          remark = friendList[friendListIndex]?.remark || '';
          nick = friendList[friendListIndex]?.profile?.nick || '';
          displayUserInfo = remark || nick || defaultUserInfo.userId || '';
          avatar = friendList[friendListIndex]?.profile?.avatar || '';
        }
        if (unFriendListIndex !== -1) {
          nick = unFriendList[unFriendListIndex]?.nick || '';
          displayUserInfo = nick || defaultUserInfo.userId || '';
          avatar = unFriendList[unFriendListIndex]?.avatar || '';
        }
        const userInfo = currentRemoteUserInfoList.find(subObj => subObj.userId === userId) || {};
        return { ...defaultUserInfo, ...userInfo, remark, nick, displayUserInfo, avatar };
      });
    }
    return remoteUserInfoList;
  } catch (error) {
    console.error(`${NAME.PREFIX}getRemoteUserProfile failed, error: ${error}.`);
    return remoteUserInfoList;
  }
}
// 生成弹框提示文案
export function generateText(key: string, prefix?: string, suffix?: string): string {
  const isGroup = TUIStore.getData(StoreName.CALL, NAME.IS_GROUP);
  let callTips = `${t(key)}`;
  if (isGroup) {
    callTips = prefix ? `${prefix} ${callTips}` : callTips;
    callTips = suffix ? `${callTips} ${suffix}` : callTips;
  }
  return callTips;
}
// 生成 statusChange 抛出的字符串
export function generateStatusChangeText(): string {
  const callStatus = TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS);
  if (callStatus === CallStatus.IDLE) {
    return StatusChange.IDLE;
  }
  const isGroup = TUIStore.getData(StoreName.CALL, NAME.IS_GROUP);
  if (callStatus === CallStatus.CALLING) {
    return isGroup ? StatusChange.DIALING_GROUP : StatusChange.DIALING_C2C;
  }
  const callMediaType = TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE);
  if (isGroup) {
    return callMediaType === CallMediaType.AUDIO ? StatusChange.CALLING_GROUP_AUDIO : StatusChange.CALLING_GROUP_VIDEO;
  }
  return callMediaType === CallMediaType.AUDIO ? StatusChange.CALLING_C2C_AUDIO : StatusChange.CALLING_C2C_VIDEO;
}
// 获取群组[offset, count + offset]区间成员
export async function getGroupMemberList(groupID: string, tim: any, count, offset) {
  let groupMemberList = [];
  try {
    const res = await tim.getGroupMemberList({ groupID, count, offset }); 
    if (res.code === 0) {
      return res.data.memberList || groupMemberList;
    }
  } catch(error) {
    console.error(`${NAME.PREFIX}getGroupMember failed, error: ${error}.`);
    return groupMemberList;
  }
}
// 获取 IM 群信息
export async function getGroupProfile(groupID: string, tim: any): Promise<any> {
  let groupProfile = {};
  try {
    const res = await tim.getGroupProfile({ groupID }); 
    return res.data.group || groupProfile;
  } catch(error) {
    console.warn(`${NAME.PREFIX}getGroupProfile failed, error: ${error}.`);
    return groupProfile;
  }
}
/**
 * update roomId and roomIdType
 * @param {number} roomId number roomId
 * @param {string} strRoomId string roomId
 */
export function updateRoomIdAndRoomIdType(roomId, strRoomId) {
  if (roomId === 0 && strRoomId) { // use strRoomID
    TUIStore.update(StoreName.CALL, NAME.ROOM_ID, strRoomId);
    TUIStore.update(StoreName.CALL, NAME.ROOM_ID_TYPE, ROOM_ID_TYPE.STRING_ROOM_ID);
  } else {
    TUIStore.update(StoreName.CALL, NAME.ROOM_ID, roomId);
    TUIStore.update(StoreName.CALL, NAME.ROOM_ID_TYPE, ROOM_ID_TYPE.NUMBER_ROOM_ID);
  }
}
/**
 * web and miniProgram call engine throw event data structure are different
 * @param {any} event call engine throw out data
 * @returns {any} data
 */
export function analyzeEventData(event: any): any {
  return event || {}; // web INVITED
}
/**
 * delete user from remoteUserInfoList
 * @param {string[]} userIdList to be deleted userIdList
 * @param {ITUIStore} TUIStore TUIStore instance
 */
export function deleteRemoteUser(userIdList: string[]): void {
  if (userIdList.length === 0) return;
  let remoteUserInfoList = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST);
  userIdList.forEach((userId) => {
    remoteUserInfoList = remoteUserInfoList.filter((obj: IUserInfo) => obj.userId !== userId);
  });
  TUIStore.update(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST, remoteUserInfoList);
  TUIStore.update(StoreName.CALL, NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST, remoteUserInfoList);
}
export function updateDeviceList(tuiCallEngine) {
  tuiCallEngine?.getDeviceList('speaker').then((result)=>{
    const deviceList = TUIStore.getData(StoreName.CALL, NAME.DEVICE_LIST);
    const currentSpeaker = result?.[0] || {};
    TUIStore.update(
      StoreName.CALL,
      NAME.DEVICE_LIST,
      { ...deviceList, speakerList: result, currentSpeaker },
    );
  }).catch(error =>{
    console.error(`${NAME.PREFIX}updateSpeakerList failed, error: ${JSON.stringify(error)}.`);
  });
  const callMediaType = TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE);
  if (callMediaType === CallMediaType.VIDEO) {
    tuiCallEngine?.getDeviceList('camera').then((result) => {
      const deviceList = TUIStore.getData(StoreName.CALL, NAME.DEVICE_LIST);
      const currentCamera = result?.[0] || {};
      TUIStore.update(
        StoreName.CALL,
        NAME.DEVICE_LIST,
        { ...deviceList, cameraList: result, currentCamera },
      );
    }).catch(error => {
      console.error(`${NAME.PREFIX}updateCameraList failed, error: ${error}.`);
    });
  }
  tuiCallEngine?.getDeviceList('microphones').then((result) => {
    const deviceList = TUIStore.getData(StoreName.CALL, NAME.DEVICE_LIST);
    const currentMicrophone = result?.[0] || {};
    TUIStore.update(
      StoreName.CALL,
      NAME.DEVICE_LIST,
      { ...deviceList, microphoneList: result, currentMicrophone },
    );
  }).catch(error => {
    console.error(`${NAME.PREFIX}updateMicrophoneList failed, error: ${error}.`);
  });
}
/**
 * update the no device permission toast
 * @param {any} error error
 * @param {CallMediaType} type call midia type
 * @param {any} tuiCallEngine TUICallEngine instance
 */
export function noDevicePermissionToast(error, type: CallMediaType, tuiCallEngine: any) {
  let toastInfoKey = '';
  if (handleNoDevicePermissionError(error)) {
    if (type === CallMediaType.AUDIO) {
      toastInfoKey = CallTips.NO_MICROPHONE_DEVICE_PERMISSION;
    }
    if (type === CallMediaType.VIDEO) {
      toastInfoKey = CallTips.NO_CAMERA_DEVICE_PERMISSION;
    }

    const permission = tuiCallEngine?.getDevicePermission();
    if (!permission?.audio) {
      TUIStore.update(StoreName.CALL, NAME.SHOW_PERMISSION_TIP, true);
    }

    toastInfoKey && TUIStore.update(StoreName.CALL, NAME.TOAST_INFO, { content: toastInfoKey, type: NAME.ERROR });
    console.error(`${NAME.PREFIX}call failed, error: ${error.message}.`);
  }
}
/**
 * set localUserInfo audio/video available
 * @param {boolean} isAvailable is available
 * @param {string} type callMediaType 'audio' | 'video'
 * @param {ITUIStore} TUIStore TUIStore instance
 */
export function setLocalUserInfoAudioVideoAvailable(isAvailable: boolean, type: string) {
  let localUserInfo = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO);
  if (type === NAME.AUDIO) {
    localUserInfo = { ...localUserInfo, isAudioAvailable: isAvailable };
  }
  if (type === NAME.VIDEO) {
    localUserInfo = { ...localUserInfo, isVideoAvailable: isAvailable };
  }

  TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO, localUserInfo);
  TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN, localUserInfo);
}
