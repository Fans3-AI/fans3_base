import { CallStatus, CallRole, CallMediaType, VideoDisplayMode, VideoResolution, CameraPosition, LayoutMode, NAME } from '../const/index';
import { ICallStore } from '../interface/ICallStore';
import { t } from '../locales/index';
import { getLanguage } from '../utils/common-utils';
import { deepClone } from "../utils/index";

export default class CallStore {
  public defaultStore: ICallStore = {
    callStatus: CallStatus.IDLE,
    callRole: CallRole.UNKNOWN,
    callMediaType: CallMediaType.UNKNOWN,
    localUserInfo: { userId: '' },
    localUserInfoExcludeVolume: { userId: '' },
    remoteUserInfoList: [],
    remoteUserInfoExcludeVolumeList: [],
    callerUserInfo: { userId: '' },
    isGroup: false,
    callDuration: '00:00:00', // 通话时长
    callTips: '', // 通话提示的信息. 例如: '等待谁接听', 'xxx 拒绝通话', 'xxx 挂断通话'
    toastInfo: { text: '' }, // 远端用户挂断、拒绝、超时、忙线等的 toast 提示信息
    isMinimized: false, // 用来记录当前是否悬浮窗模式
    enableFloatWindow: false, // 开启/关闭悬浮窗功能，设置为false，通话界面左上角的悬浮窗按钮会隐藏
    bigScreenUserId: '', // 当前大屏幕显示的 userID 用户
    language: getLanguage(), // en, zh-cn
    isClickable: false, // 是否可点击, 用于按钮增加 loading 效果，不可点击
    deviceList: { cameraList: [], microphoneList: [], currentCamera: {}, currentMicrophone: {} },
    showPermissionTip: false,
    netWorkQualityList: [], // 显示网络状态差的提示
    isMuteSpeaker: false,
    groupID: '',
    roomID: 0,
    roomIdType: 0,
    cameraPosition: CameraPosition.FRONT, // 前置或后置，值为front, back
    groupCallMembers: [], // chat 群会话在的通话中的成员
    // TUICallKit 组件上的属性
    displayMode: VideoDisplayMode.COVER, // 设置预览远端的画面显示模式
    videoResolution: VideoResolution.RESOLUTION_480P,
    showSelectUser: false,
    // 小程序相关属性
    pusher: {},
    player: [],
    isEarPhone: false, // 是否是听筒, 默认: false
    pusherId: NAME.INITIAL_PUSHER, // 重新渲染 live-Pusher 的标识位
    // 是否开启虚拟背景, 目前仅 web 支持
    isShowEnableVirtualBackground: false, // 是否显示虚拟背景图标, 默认: false
    enableVirtualBackground: false, // 是否开启虚拟背景， 默认: false
    // customUIConfig
    customUIConfig: {
      button: {},
      viewBackground: {},
      layoutMode: LayoutMode.RemoteInLargeView,
    },
    // translate function
    translate: t,
  };
  public store: ICallStore = deepClone(this.defaultStore);
  public prevStore: ICallStore = deepClone(this.defaultStore);

  public update(key: keyof ICallStore, data: any): void {
    switch (key) {
      case NAME.CALL_TIPS:
        const preData = this.getData(key);
        (this.prevStore[key] as any) = preData;
      default:
        // resolve "Type 'any' is not assignable to type 'never'.ts", ref: https://github.com/microsoft/TypeScript/issues/31663
        (this.store[key] as any) = data as any;
    }
  }

  public getPrevData(key: string | undefined): any {
    if (!key) return this.prevStore;
    return this.prevStore[key as keyof ICallStore];
  }

  public getData(key: string | undefined): any {
    if (!key) return this.store;
    return this.store[key as keyof ICallStore];
  }
  // reset call store
  public reset(keyList: Array<string> = []) {
    if (keyList.length === 0) {
      keyList = Object.keys(this.store);
    }
    const resetToDefault = keyList.reduce((acc, key) => ({ ...acc, [key]: this.defaultStore[key as keyof ICallStore] }), {});
    this.store = {
      ...this.defaultStore,
      ...this.store,
      ...resetToDefault,
    };
  }
}
