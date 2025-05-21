import {
  ITUICallService, ICallParams, IGroupCallParams, IUserInfo, ICallbackParam, ISelfInfoParams, IBellParams,
  IInviteUserParams, IJoinInGroupCallParams, IInitParams,
} from '../interface/ICallService';
import {
  StoreName, CallStatus, CallMediaType, NAME, CALL_DATA_KEY, LanguageType, CallRole, LOG_LEVEL, VideoDisplayMode,
  VideoResolution, StatusChange, AudioPlayBackDevice, CameraPosition, COMPONENT, FeatureButton, ButtonState,
  LayoutMode, DEFAULT_BLUR_LEVEL,
} from '../const/index';
// @ts-ignore
import { TUICallEngine } from 'tuicall-engine-webrtc';
import { checkLocalMP3FileExists } from '../utils/index';
import { CallTips, t } from '../locales/index';
import { BellContext } from './bellContext';
import { VALIDATE_PARAMS, avoidRepeatedCall, paramValidate, statusValidate } from '../utils/validate/index';
import { handleRepeatedCallError, formatTime, performanceNow } from '../utils/common-utils';
import { getRemoteUserProfile, generateStatusChangeText, noDevicePermissionToast, setLocalUserInfoAudioVideoAvailable,
  getGroupMemberList, getGroupProfile, updateRoomIdAndRoomIdType, updateDeviceList } from './utils';
import timer from '../utils/timer';
import { ITUIGlobal, ITUIStore } from '../interface/index';
import TuiGlobal from '../TUIGlobal/tuiGlobal';
import TuiStore from '../TUIStore/tuiStore';
import { UIDesign } from './UIDesign';
// import { AIAssistant } from './AIAssistant';
import ChatCombine from './chatCombine';
import EngineEventHandler from './engineEventHandler';
const TUIGlobal: ITUIGlobal = TuiGlobal.getInstance();
const TUIStore: ITUIStore = TuiStore.getInstance();
const uiDesign = UIDesign.getInstance();
uiDesign.setTUIStore(TUIStore);
// const aiAssistant = AIAssistant.getInstance();
const version = '3.3.9';
const frameWork = 'react';
export { TUIGlobal, TUIStore, uiDesign };

export default class TUICallService implements ITUICallService {
  static instance: TUICallService;
  public _tuiCallEngine: any;
  private _tim: any = null;
  private _TUICore: any = null;
  private _timerId: number = -1;
  private _startTimeStamp: number = performanceNow();
  private _bellContext: any = null;
  private _isFromChat: boolean = false;
  private _currentGroupId: string = ''; // The currentGroupId of the group chat that the user is currently in
  private _offlinePushInfo = null;
  private _permissionCheckTimer: any = null;
  private _chatCombine: any = null;
  private _engineEventHandler: any = null;

  constructor() {
    console.log(`${NAME.PREFIX}version: ${version}`);
    this._watchTUIStore();
    this._engineEventHandler = EngineEventHandler.getInstance({ callService: this });

    this._chatCombine = ChatCombine.getInstance({ callService: this });
  }
  static getInstance() {
    if (!TUICallService.instance) {
      TUICallService.instance = new TUICallService();
    }
    return TUICallService.instance;
  }
  @avoidRepeatedCall()
  @paramValidate(VALIDATE_PARAMS.init)
  public async init(params: IInitParams) {
    try {
      if (this._tuiCallEngine) return;
      // @ts-ignore
      let { userID, tim, userSig, sdkAppID, SDKAppID, isFromChat, component = COMPONENT.TUI_CALL_KIT } = params;
      if (this._TUICore) {
        sdkAppID = this._TUICore.SDKAppID;
        tim = this._TUICore.tim;
      }
      this._tim = tim;
      console.log(`${NAME.PREFIX}init sdkAppId: ${sdkAppID || SDKAppID}, userId: ${userID}`);
      this._tuiCallEngine = TUICallEngine.createInstance({
        tim,
        SDKAppID: sdkAppID || SDKAppID, // 兼容传入 SDKAppID 的问题
        // @ts-ignore
        frameWork,
        language: 7,
        callkitVersion: version,
        chat: isFromChat || false,
        component,
      });
      uiDesign.setEngineInstance(this._tuiCallEngine);
      this._addListenTuiCallEngineEvent();
      this._bellContext =  new BellContext();
      TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO, { userId: userID });
      TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN, { userId: userID });
      uiDesign.updateViewBackgroundUserId('local');
      await this._tuiCallEngine.login({ userID, userSig, assetsPath: '' }); // web && mini
      const uiConfig = TUIStore.getData(StoreName.CALL, NAME.CUSTOM_UI_CONFIG);
      // aiAssistant.setEngineInstance(this._tuiCallEngine);
      // aiAssistant.setImInstance(this.getTim());
      this._tuiCallEngine?.reportLog?.({
        name: 'TUICallkit.init',
        data: {
          uiConfig,
        }
      });
    } catch (error) {
      console.error(`${NAME.PREFIX}init failed, error: ${error}.`);
      throw error;
    }
  }
  // component destroy
  public async destroyed() {
    try {
      const currentCallStatus = TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS);
      if (currentCallStatus !== CallStatus.IDLE) {
        throw new Error(`please destroyed when status is idle, current status: ${currentCallStatus}`);
      }
      if (this._tuiCallEngine) {
        this._removeListenTuiCallEngineEvent();
        await this._tuiCallEngine.destroyInstance();
        this._tuiCallEngine = null;
      }
      this._bellContext?.destroy();
      this._bellContext = null;
    } catch (error) {
      console.error(`${NAME.PREFIX}destroyed failed, error: ${error}.`);
      throw error;
    }
  }
  // ===============================【通话操作】===============================
  @avoidRepeatedCall()
  @paramValidate(VALIDATE_PARAMS.call)
  @statusValidate({ engineInstance: true })
  public async call(callParams: ICallParams) {
    console.error('kit-call');
    
    if (TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS) !== CallStatus.IDLE) return; // avoid double click when application stuck
    try {
      const { type, userID, offlinePushInfo } = callParams;
      if (TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS) !== CallStatus.IDLE) return;
      await this._updateCallStoreBeforeCall(type, [{ userId: userID }]);
      this.executeExternalBeforeCalling(); // 执行外部传入的 beforeCall 方法
      callParams.offlinePushInfo = { ...this.getDefaultOfflinePushInfo(), ...offlinePushInfo };
      const response = await this._tuiCallEngine.call(callParams);
      await this._updateCallStoreAfterCall([userID], response);
    } catch (error: any) {
      this._handleCallError(error, 'call');
    }
  };
  @avoidRepeatedCall()
  @paramValidate(VALIDATE_PARAMS.groupCall)
  @statusValidate({ engineInstance: true })
  public async groupCall(groupCallParams: IGroupCallParams) {
    if (TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS) !== CallStatus.IDLE) return; // avoid double click when application stuck
    try {
      const { userIDList, type, groupID, offlinePushInfo } = groupCallParams;
      if (TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS) !== CallStatus.IDLE) return;
      const remoteUserInfoList = userIDList.map(userId => ({ userId }));
      await this._updateCallStoreBeforeCall(type, remoteUserInfoList, groupID);
      this.executeExternalBeforeCalling();
      groupCallParams.offlinePushInfo = { ...this.getDefaultOfflinePushInfo(), ...offlinePushInfo };
      const response = await this._tuiCallEngine.groupCall(groupCallParams);
      await this._updateCallStoreAfterCall(userIDList, response);
    } catch (error: any) {
      this._handleCallError(error, 'groupCall');
    }
  }
  @avoidRepeatedCall()
  @paramValidate(VALIDATE_PARAMS.inviteUser)
  @statusValidate({ engineInstance: true })
  public async inviteUser(params: IInviteUserParams) {
    if (TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS) === CallStatus.IDLE) return; // avoid double click when application stuck
    try {
      const { userIDList } = params;
      let inviteUserInfoList = await getRemoteUserProfile(userIDList, this.getTim());
      const remoteUserInfoList = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST);
      const userIDListNotInRemoteUserInfoList = userIDList.filter(userId => {
        return !remoteUserInfoList.some(remoteUserInfo => remoteUserInfo.userId === userId);
      });
      if (userIDListNotInRemoteUserInfoList.length === 0) {
        return;
      }
      TUIStore.update(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST, [...remoteUserInfoList, ...inviteUserInfoList]);
      TUIStore.update(StoreName.CALL, NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST, [...remoteUserInfoList, ...inviteUserInfoList]);
      this._tuiCallEngine && await this._tuiCallEngine.inviteUser(params);
    } catch (error: any) {
      console.error(`${NAME.PREFIX}inviteUser failed, error: ${error}.`);
    }
  }
  @avoidRepeatedCall()
  @paramValidate(VALIDATE_PARAMS.joinInGroupCall)
  @statusValidate({ engineInstance: true })
  public async joinInGroupCall(params: IJoinInGroupCallParams) {
    if (TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS) === CallStatus.CONNECTED) return; // avoid double click when application stuck
    try {
      const updateStoreParams = {
        [NAME.CALL_ROLE]: CallRole.CALLEE,
        [NAME.IS_GROUP]: true,
        [NAME.CALL_STATUS]: CallStatus.CONNECTED,
        [NAME.CALL_MEDIA_TYPE]: params.type,
        [NAME.GROUP_ID]: params.groupID,
        [NAME.ROOM_ID]: params.roomID,
      };
      TUIStore.updateStore(updateStoreParams, StoreName.CALL);
      const response = await this._tuiCallEngine.joinInGroupCall(params);
      const isCameraDefaultStateClose = this._getFeatureButtonDefaultState(FeatureButton.Camera) === ButtonState.Close;
      (params.type === CallMediaType.VIDEO) && !isCameraDefaultStateClose && await this.openCamera(NAME.LOCAL_VIDEO);
      TUIStore.update(StoreName.CALL, NAME.IS_CLICKABLE, true);
      this.startTimer();
      updateDeviceList(this._tuiCallEngine);;
      await this._tuiCallEngine.setVideoQuality(TUIStore.getData(StoreName.CALL, NAME.VIDEO_RESOLUTION));
      const localUserInfo = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO);
      TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO, { ...localUserInfo, isEnter: true });
      TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN, { ...localUserInfo, isEnter: true });
      setLocalUserInfoAudioVideoAvailable(true, NAME.AUDIO);
    } catch (error) {
      this._handleCallError(error, 'joinInGroupCall');
    }
  }
  // ===============================【其它对外接口】===============================
  public getTUICallEngineInstance(): any {
    return this?._tuiCallEngine || null;
  }
  public setLogLevel(level: LOG_LEVEL) {
    this?._tuiCallEngine?.setLogLevel(level);
  }
  @paramValidate(VALIDATE_PARAMS.setLanguage)
  public setLanguage(language: string) {
    if (language && Object.values(LanguageType).includes(language as LanguageType)) {
      TUIStore.update(StoreName.CALL, NAME.LANGUAGE, language);
      TUIStore.update(StoreName.CALL, NAME.TRANSLATE, t.bind(null));
    }
  }
  @paramValidate(VALIDATE_PARAMS.enableFloatWindow)
  public enableFloatWindow(enable: boolean) {
    TUIStore.update(StoreName.CALL, NAME.ENABLE_FLOAT_WINDOW, enable);
  }
  @paramValidate(VALIDATE_PARAMS.setSelfInfo)
  public async setSelfInfo(params: ISelfInfoParams) {
    const { nickName, avatar } = params;
    try {
      await this._tuiCallEngine.setSelfInfo({ nickName, avatar });
    } catch (error) {
      console.error(`${NAME.PREFIX}setSelfInfo failed, error: ${error}.`);
    }
  }
  public async enableVirtualBackground(enable: boolean) {
    TUIStore.update(StoreName.CALL, NAME.IS_SHOW_ENABLE_VIRTUAL_BACKGROUND, enable);
  }
  @paramValidate(VALIDATE_PARAMS.enableAIVoice)
  public async enableAIVoice(enable: boolean) {
    try {
      await this._tuiCallEngine.enableAIVoice(enable);
      console.log(`${NAME.PREFIX}enableAIVoice: ${enable}.`);
    } catch (error: any) {
      console.error(`${NAME.PREFIX}enableAIVoice failed, error: ${error}.`);
      throw error;
    }
  }
  // 修改默认铃声：只支持本地铃声文件，不支持在线铃声文件；修改铃声修改的是被叫的铃声
  @paramValidate(VALIDATE_PARAMS.setCallingBell)
  public async setCallingBell(filePath?: string) {
    let isCheckFileExist: boolean = true;
    isCheckFileExist = await checkLocalMP3FileExists(filePath);
    if (!isCheckFileExist) {
      console.warn(`${NAME.PREFIX}setCallingBell failed, filePath: ${filePath}.`);
      return ;
    }
    const bellParams: IBellParams = { calleeBellFilePath: filePath };
    this._bellContext.setBellProperties(bellParams);
  }
  @paramValidate(VALIDATE_PARAMS.enableMuteMode)
  public async enableMuteMode(enable: boolean) {
    try {
      const bellParams: IBellParams = { isMuteBell: enable };
      this._bellContext.setBellProperties(bellParams);
      await this._bellContext.setBellMute(enable);
    } catch (error) {
      console.warn(`${NAME.PREFIX}enableMuteMode failed, error: ${error}.`);
    }
  }
  public hideFeatureButton(buttonName: FeatureButton) {
    uiDesign.hideFeatureButton(buttonName);
  }
  public setLocalViewBackgroundImage(url: string) {
    uiDesign.setLocalViewBackgroundImage(url);
  }
  public setRemoteViewBackgroundImage(userId: string, url: string) {
    uiDesign.setRemoteViewBackgroundImage(userId, url);
  }
  public setLayoutMode(layoutMode: LayoutMode) {
    uiDesign.setLayoutMode(layoutMode);
  }
  public setCameraDefaultState(isOpen: boolean) {
    uiDesign.setCameraDefaultState(isOpen);
  }
  public enableAISubtitle(enable: boolean): void {
    // aiAssistant.enableAISubtitle(enable);
  }
  // =============================【内部按钮操作方法】=============================
  @avoidRepeatedCall()
  public async accept() {
    const callStatus = TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS);
    this._tuiCallEngine?.reportLog?.({
      name: 'TUICallKit.accept.start',
      data: { callStatus },
    });
    if (callStatus === CallStatus.CONNECTED) return; // avoid double click when application stuck, especially for miniProgram
    try {
      TUIStore.update(StoreName.CALL, NAME.CALL_STATUS, CallStatus.CONNECTED);
      updateDeviceList(this._tuiCallEngine);
      const response = await this._tuiCallEngine.accept();
      if (response) {
        this._chatCombine?.callTUIService({ message: response?.data?.message });
        TUIStore.update(StoreName.CALL, NAME.IS_CLICKABLE, true);
        this.startTimer();
        const callMediaType = TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE);
        const isCameraDefaultStateClose = this._getFeatureButtonDefaultState(FeatureButton.Camera) === ButtonState.Close;
        (callMediaType === CallMediaType.VIDEO) && !isCameraDefaultStateClose && await this.openCamera(NAME.LOCAL_VIDEO);
        await this._tuiCallEngine.setVideoQuality(TUIStore.getData(StoreName.CALL, NAME.VIDEO_RESOLUTION));
        const localUserInfo = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO);
        TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO, { ...localUserInfo, isEnter: true });
        TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN, { ...localUserInfo, isEnter: true });
        setLocalUserInfoAudioVideoAvailable(true, NAME.AUDIO); // web && mini default open audio
      }
    } catch (error) {
      this._tuiCallEngine?.reportLog?.({
        name: 'TUICallKit.accept.fail',
        level: 'error',
        error,
      });
      if (handleRepeatedCallError(error)) return;
      noDevicePermissionToast(error, CallMediaType.AUDIO, this._tuiCallEngine);
      this._resetCallStore();
    }
  }
  @avoidRepeatedCall()
  public async hangup() {
    if (TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS) === CallStatus.IDLE) return; // avoid double click when application stuck
    try {
      const response = await this._tuiCallEngine.hangup();
      response?.forEach((item) => {
        if (item?.code === 0) {
          this._chatCombine?.callTUIService({ message: item?.data?.message });
        }
      });
    } catch (error) {
      console.debug(error);
    }
    this._resetCallStore();
  }
  @avoidRepeatedCall()
  public async reject() {
    if (TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS) === CallStatus.IDLE) return; // avoid double click when application stuck
    try {
      const response = await this._tuiCallEngine.reject();
      if (response?.code === 0) {
        this._chatCombine?.callTUIService({ message: response?.data?.message });
      }
    } catch (error) {
      console.debug(error);
    }
    this._resetCallStore();
  }
  @avoidRepeatedCall()
  public async openCamera(videoViewDomID: string) {
    // 客服: 不推视频流，只推音频流
    // 用户: 推视频流，音频流
    const localUserInfo = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN);
    if (localUserInfo.userId.startsWith('custom')) {
      setLocalUserInfoAudioVideoAvailable(true, NAME.VIDEO);
      return;
    }

    try {
      if (TUIGlobal.isH5) {
        const currentPosition = TUIStore.getData(StoreName.CALL, NAME.CAMERA_POSITION);
        const isFrontCamera = currentPosition === CameraPosition.FRONT ? true : false;
        await this._tuiCallEngine.openCamera(videoViewDomID, isFrontCamera);
      } else {
        await this._tuiCallEngine.openCamera(videoViewDomID);
      }
      setLocalUserInfoAudioVideoAvailable(true, NAME.VIDEO);
    } catch (error: any) {
      noDevicePermissionToast(error, CallMediaType.VIDEO, this._tuiCallEngine);
      console.error(`${NAME.PREFIX}openCamera error: ${error}.`);
    }
  }
  @avoidRepeatedCall()
  public async closeCamera() {
    const localUserInfo = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN);
    if (localUserInfo.userId.startsWith('custom')) {
      setLocalUserInfoAudioVideoAvailable(true, NAME.VIDEO);
      return;
    }
    
    try {
      await this._tuiCallEngine.closeCamera();
      setLocalUserInfoAudioVideoAvailable(false, NAME.VIDEO);
    } catch (error: any) {
      console.error(`${NAME.PREFIX}closeCamera error: ${error}.`);
    }
  }
  @avoidRepeatedCall()
  public async openMicrophone() {
    try {
      await this._tuiCallEngine.openMicrophone();
      setLocalUserInfoAudioVideoAvailable(true, NAME.AUDIO);
    } catch (error: any) {
      console.error(`${NAME.PREFIX}openMicrophone failed, error: ${error}.`);
    }
  }
  @avoidRepeatedCall()
  public async closeMicrophone() {
    try {
      await this._tuiCallEngine.closeMicrophone();
      setLocalUserInfoAudioVideoAvailable(false, NAME.AUDIO);
    } catch (error: any) {
      console.error(`${NAME.PREFIX}closeMicrophone failed, error: ${error}.`);
    }
  }
  @avoidRepeatedCall()
  public unMuteSpeaker() {
    try {
      const trtcCloudInstance = this._tuiCallEngine?.getTRTCCloudInstance?.();
      if (trtcCloudInstance) {
        trtcCloudInstance.muteAllRemoteAudio(false);
        TUIStore.update(StoreName.CALL, NAME.IS_MUTE_SPEAKER, false);
      }
    } catch (error: any) {
      console.error(`${NAME.PREFIX}unMuteSpeaker failed, error: ${error}.`);
    }
  }
  @avoidRepeatedCall()
  public muteSpeaker() {
    try {
      const trtcCloudInstance = this._tuiCallEngine?.getTRTCCloudInstance?.();
      if (trtcCloudInstance) {
        trtcCloudInstance.muteAllRemoteAudio(true);
        TUIStore.update(StoreName.CALL, NAME.IS_MUTE_SPEAKER, true);
      }
    } catch (error: any) {
      console.error(`${NAME.PREFIX}muteSpeaker failed, error: ${error}.`);
    }
  }
  @avoidRepeatedCall()
  public switchScreen(userId: string) {
    if(!userId) return;
    TUIStore.update(StoreName.CALL, NAME.BIG_SCREEN_USER_ID, userId);
  }
  // support video to audio; not support audio to video
  @avoidRepeatedCall()
  public async switchCallMediaType() {
    try {
      const callMediaType = TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE);
      if (callMediaType === CallMediaType.AUDIO) {
        console.warn(`${NAME.PREFIX}switchCallMediaType failed, ${callMediaType} not support.`);
        return;
      }
      const response = await this._tuiCallEngine.switchCallMediaType(CallMediaType.AUDIO);
      if (response?.code === 0) {
        this._chatCombine?.callTUIService({ message: response?.data?.message });
      }
      TUIStore.update(StoreName.CALL, NAME.CALL_MEDIA_TYPE, CallMediaType.AUDIO);
      const isGroup = TUIStore.getData(StoreName.CALL, NAME.IS_GROUP);
      const oldStatus = isGroup ? StatusChange.CALLING_GROUP_VIDEO : StatusChange.CALLING_C2C_VIDEO;
      const newStatus = generateStatusChangeText();
      this.statusChanged && this.statusChanged({ oldStatus, newStatus });
    } catch (error: any) {
      console.error(`${NAME.PREFIX}switchCallMediaType failed, error: ${error}.`);
    }
  }
  @avoidRepeatedCall()
  public async switchCamera() {
    const currentPosition = TUIStore.getData(StoreName.CALL, NAME.CAMERA_POSITION);
    const targetPosition = currentPosition === CameraPosition.BACK ? CameraPosition.FRONT : CameraPosition.BACK;
    try {
      await this._tuiCallEngine.switchCamera(targetPosition);
      TUIStore.update(StoreName.CALL, NAME.CAMERA_POSITION, targetPosition);
    } catch (error) {
      console.error(`${NAME.PREFIX}_switchCamera failed, error: ${error}.`);
    }
  }
  @avoidRepeatedCall()
  public async setBlurBackground(enable: boolean) {
    try {
      await this._tuiCallEngine.setBlurBackground(enable ? DEFAULT_BLUR_LEVEL : 0); // 0 indicate close blurBackground
      TUIStore.update(StoreName.CALL, NAME.ENABLE_VIRTUAL_BACKGROUND, enable);
    } catch (error) {
      console.error(`${NAME.PREFIX}_setBlurBackground failed, error: ${error}.`);
    }
  }
  @avoidRepeatedCall()
  public async switchDevice(params) {
    try {
      await this._tuiCallEngine.switchDevice(params);
    } catch (error) {
      console.error(`${NAME.PREFIX}_switchDevice failed, error: ${error}.`);
    }
  }
  public async getDeviceList(deviceType: string) {
    try {
      const response = await this._tuiCallEngine.getDeviceList(deviceType);
      return response;
    } catch (error: any) {
      this._handleCallError(error, 'call');
    }
  };
  // ==========================【TUICallEngine 事件处理】==========================
  private _addListenTuiCallEngineEvent() {
    this._engineEventHandler.addListenTuiCallEngineEvent();
  }
  private _removeListenTuiCallEngineEvent() {
    this._engineEventHandler.removeListenTuiCallEngineEvent();
  }
  // ========================【原 Web CallKit 提供的方法】========================
  public beforeCalling: ((...args: any[]) => void) | undefined; // 原来
  public afterCalling: ((...args: any[]) => void) | undefined;
  public onMinimized: ((...args: any[]) => void) | undefined;
  public onMessageSentByMe: ((...args: any[]) => void) | undefined;
  public kickedOut: ((...args: any[]) => void) | undefined;
  public statusChanged: ((...args: any[]) => void) | undefined;
  public setCallback(params: ICallbackParam) {
    const { beforeCalling, afterCalling, onMinimized, onMessageSentByMe, kickedOut, statusChanged } = params;
    beforeCalling && (this.beforeCalling = beforeCalling);
    afterCalling && (this.afterCalling = afterCalling);
    onMinimized && (this.onMinimized = onMinimized);
    onMessageSentByMe && (this.onMessageSentByMe = onMessageSentByMe);
    kickedOut && (this.kickedOut = kickedOut);
    statusChanged && (this.statusChanged = statusChanged);
  }
  public toggleMinimize() {
    const isMinimized = TUIStore.getData(StoreName.CALL, NAME.IS_MINIMIZED);
    TUIStore.update(StoreName.CALL, NAME.IS_MINIMIZED, !isMinimized);
    console.log(`${NAME.PREFIX}toggleMinimize: ${isMinimized} -> ${!isMinimized}.`);
    this.onMinimized && this.onMinimized(isMinimized, !isMinimized);
  }
  public executeExternalBeforeCalling(): void {
    this.beforeCalling && this.beforeCalling();
  }
  public executeExternalAfterCalling(): void {
    this.afterCalling && this.afterCalling();
  }
  // ========================【TUICallKit 组件属性设置方法】========================
  @paramValidate(VALIDATE_PARAMS.setVideoDisplayMode)
  public setVideoDisplayMode(displayMode: VideoDisplayMode) {
    TUIStore.update(StoreName.CALL, NAME.DISPLAY_MODE, displayMode);
  }
  @paramValidate(VALIDATE_PARAMS.setVideoResolution)
  public async setVideoResolution(resolution: VideoResolution) {
    try {
      if (!resolution) return;
      TUIStore.update(StoreName.CALL, NAME.VIDEO_RESOLUTION, resolution);
      await this._tuiCallEngine?.setVideoQuality(resolution);
    } catch (error) {
      console.warn(`${NAME.PREFIX}setVideoResolution failed, error: ${error}.`);
    }
  }
  // 通话时长更新
  public startTimer(): void {
    if (this._timerId === -1) {
      this._startTimeStamp = performanceNow();
      this._timerId = timer.run(NAME.TIMEOUT, this._updateCallDuration.bind(this), { delay: 1000 });
    }
  }
  // =========================【private methods for service use】=========================
  // 处理 “呼叫” 抛出的异常
  private _handleCallError(error: any, methodName?: string) {
    this._permissionCheckTimer && clearInterval(this._permissionCheckTimer);

    if (handleRepeatedCallError(error)) return;
    noDevicePermissionToast(error, CallMediaType.AUDIO, this._tuiCallEngine);
    console.error(`${NAME.PREFIX}${methodName} failed, error: ${error}.`);
    this._resetCallStore();
    throw error;
  }
  private async _updateCallStoreBeforeCall(type: number, remoteUserInfoList: IUserInfo[], groupID?: string): Promise<void> {
    const callTips = groupID || TUIStore.getData(StoreName.CALL, NAME.IS_MINIMIZED) ? CallTips.CALLER_GROUP_CALLING_MSG : CallTips.CALLER_CALLING_MSG;
    let updateStoreParams: any = {
      [NAME.CALL_MEDIA_TYPE]: type,
      [NAME.CALL_ROLE]: CallRole.CALLER,
      [NAME.REMOTE_USER_INFO_LIST]: remoteUserInfoList,
      [NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST]: remoteUserInfoList,
      [NAME.IS_GROUP]: !!groupID,
      [NAME.CALL_TIPS]: callTips,
      [NAME.GROUP_ID]: groupID
    };
    TUIStore.updateStore({ ...updateStoreParams, [NAME.CALL_STATUS]: CallStatus.CALLING }, StoreName.CALL);
    this.statusChanged && this.statusChanged({
      oldStatus: StatusChange.IDLE,
      newStatus: groupID ? StatusChange.DIALING_GROUP : StatusChange.DIALING_C2C,
    });
    updateDeviceList(this._tuiCallEngine);;
    const remoteUserInfoLists = await getRemoteUserProfile(remoteUserInfoList.map(obj => obj.userId), this.getTim());

    if (remoteUserInfoLists.length > 0) {
      TUIStore.update(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST, remoteUserInfoLists);
      TUIStore.update(StoreName.CALL, NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST, remoteUserInfoLists);
    }

  }
  private async _updateCallStoreAfterCall(userIdList: string[], response: any) {
    if (response) {
      TUIStore.update(StoreName.CALL, NAME.IS_CLICKABLE, true);
      updateRoomIdAndRoomIdType(response?.roomID, response?.strRoomID);
      const callMediaType = TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE);
      if (response.code === 0) {
        this._chatCombine?.callTUIService({ message: response?.data?.message });
        try {
          await this._tuiCallEngine.setVideoQuality(TUIStore.getData(StoreName.CALL, NAME.VIDEO_RESOLUTION));
        } catch (error) {
          console.warn(`${NAME.PREFIX}setVideoQuality failed, error: ${error}.`);
        }
      } else {
        this._resetCallStore();
        return;
      }
      const isCameraDefaultStateClose = this._getFeatureButtonDefaultState(FeatureButton.Camera) === ButtonState.Close;
      const localUserInfo = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO);
      (callMediaType === CallMediaType.VIDEO) && !isCameraDefaultStateClose && await this.openCamera(NAME.LOCAL_VIDEO);
      setLocalUserInfoAudioVideoAvailable(true, NAME.VIDEO);
      TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO, { ...localUserInfo, isEnter: true });
      TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN, { ...localUserInfo, isEnter: true });
      setLocalUserInfoAudioVideoAvailable(true, NAME.AUDIO); // web && mini, default open audio
    } else {
      this._permissionCheckTimer && clearInterval(this._permissionCheckTimer);
      this._permissionCheckTimer = null;
      this._resetCallStore();
    }
  }
  private _getFeatureButtonDefaultState(buttonName: FeatureButton) {
    const { button: buttonConfig } = TUIStore.getData(StoreName.CALL, NAME.CUSTOM_UI_CONFIG);
    return buttonConfig?.[buttonName]?.state;
  }
  private _updateCallDuration(): void {
    const callDurationNum = Math.round((performanceNow() - this._startTimeStamp) / 1000); // miniProgram stop timer when background
    const callDurationStr = formatTime(callDurationNum);
    TUIStore.update(StoreName.CALL, NAME.CALL_DURATION, callDurationStr);
  }
  private _stopTimer(): void {
    if (this._timerId !== -1) {
      timer.clearTask(this._timerId);
      this._timerId = -1;
    }
  }
  private _resetCallStore() {
    const oldStatusStr = generateStatusChangeText();
    this._stopTimer();
    // localUserInfo, language 在通话结束后不需要清除
    // callStatus 清除需要通知; isMinimized 也需要通知（basic-vue3 中切小窗关闭后, 再呼叫还是小窗, 因此需要通知到组件侧）
    // isGroup 也不清除(engine 先抛 cancel 事件, 再抛 reject 事件)
    // displayMode、videoResolution 也不能清除, 组件不卸载, 这些属性也需保留, 否则采用默认值.
    // enableFloatWindow 不清除：开启/关闭悬浮窗功能。
    let notResetOrNotifyKeys = Object.keys(CALL_DATA_KEY).filter((key) => {
      switch (CALL_DATA_KEY[key]) {
        case NAME.CALL_STATUS:
        case NAME.LANGUAGE:
        case NAME.IS_GROUP:
        case NAME.DISPLAY_MODE:
        case NAME.VIDEO_RESOLUTION:
        case NAME.ENABLE_FLOAT_WINDOW:
        case NAME.LOCAL_USER_INFO:
        case NAME.IS_SHOW_ENABLE_VIRTUAL_BACKGROUND:
        case NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN: {
          return false;
        }
        default: {
          return true;
        }
      }
    });
    notResetOrNotifyKeys = notResetOrNotifyKeys.map(key => CALL_DATA_KEY[key]);
    TUIStore.reset(StoreName.CALL, notResetOrNotifyKeys);
    const callStatus = TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS);
    callStatus !== CallStatus.IDLE && TUIStore.reset(StoreName.CALL, [NAME.CALL_STATUS], true); // callStatus reset need notify
    TUIStore.reset(StoreName.CALL, [NAME.IS_MINIMIZED], true); // isMinimized reset need notify
    TUIStore.reset(StoreName.CALL, [NAME.IS_EAR_PHONE], true); // isEarPhone reset need notify
    TUIStore.reset(StoreName.CALL, [NAME.ENABLE_VIRTUAL_BACKGROUND], true); // ENABLE_VIRTUAL_BACKGROUND reset need notify
    TUIStore.reset(StoreName.CALL, [NAME.IS_MUTE_SPEAKER], true); // IS_MUTE_SPEAKER reset need notify

    const localUserInfo = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO)
    TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO, {
      ...localUserInfo,
      isVideoAvailable: false,
      isAudioAvailable: false,
      nick: localUserInfo.userId.startsWith('custom') ? 'virtual' : localUserInfo.nick,
      virtualId: '',
    });
    TUIStore.update(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN, {
      ...TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN),
      isVideoAvailable: false,
      isAudioAvailable: false,
    });
    TUIStore.update(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST, []);
    TUIStore.update(StoreName.CALL, NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST, []);
    TUIStore.update(StoreName.CALL, NAME.CAMERA_POSITION, CameraPosition.FRONT);

    const newStatusStr = generateStatusChangeText();
    if (oldStatusStr !== newStatusStr) {
      this.statusChanged && this.statusChanged({ oldStatus: oldStatusStr, newStatus: newStatusStr });
    }
  }
  // =========================【Calling the Chat SDK APi】=========================
  // 获取群成员
  public async getGroupMemberList(count: number, offset: number) {
    const groupID = TUIStore.getData(StoreName.CALL, NAME.GROUP_ID);
    let groupMemberList = await getGroupMemberList(groupID, this.getTim(), count, offset);
    return groupMemberList;
  }
  // 获取群信息
  public async getGroupProfile() {
    const groupID: string = TUIStore.getData(StoreName.CALL, NAME.GROUP_ID);
    return await getGroupProfile(groupID, this.getTim());
  }
  // =========================【监听 TUIStore 中的状态及处理】=========================
  private _handleCallStatusChange = async (value: CallStatus) => {
    try {
      const bellParams: IBellParams = {
        callRole: TUIStore.getData(StoreName.CALL, NAME.CALL_ROLE),
        callStatus: TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS),
      };
      this._bellContext.setBellProperties(bellParams);
      if (value === CallStatus.CALLING) {
        await this?._bellContext?.play();
      } else {
        // 状态变更通知
        if (value === CallStatus.CONNECTED) {
          const isGroup = TUIStore.getData(StoreName.CALL, NAME.IS_GROUP);
          const callMediaType = TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE);
          const remoteUserInfoList = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST);
          const oldStatus = isGroup ? StatusChange.DIALING_GROUP : StatusChange.DIALING_C2C;
          TUIStore.update(StoreName.CALL, NAME.CALL_TIPS, '');
          this.statusChanged && this.statusChanged({ oldStatus, newStatus: generateStatusChangeText() });
          if (!isGroup && callMediaType === CallMediaType.VIDEO) {
            this.switchScreen(remoteUserInfoList[0].domId);
          }
        }
        if (value === CallStatus.IDLE) {
          if (this._isFromChat) {
            const groupAttributes = this._currentGroupId ? await this._chatCombine?.getGroupAttributes(this._tim, this._currentGroupId) : {};
            await this._chatCombine?.updateStoreBasedOnGroupAttributes(groupAttributes, TUIStore, this);
          }
        }
        await this?._bellContext?.stop();
      }
    } catch (error) {
      console.warn(`${NAME.PREFIX}handleCallStatusChange, ${error}.`);
    }
  };
  private _watchTUIStore() {
    TUIStore?.watch(StoreName.CALL, {
      [NAME.CALL_STATUS]: this._handleCallStatusChange,
    });
  }
  private _unwatchTUIStore() {
    TUIStore?.unwatch(StoreName.CALL, {
      [NAME.CALL_STATUS]: this._handleCallStatusChange,
    });
  }
  // =========================【融合 chat 】=========================
  public bindTUICore(TUICore: any) {
    this._TUICore = TUICore;
  }
  // =========================【set、get methods】=========================
  public getTim() {
    if (this._tim) return this._tim;
    if (!this._tuiCallEngine) {
      console.warn(`${NAME.PREFIX}getTim warning: _tuiCallEngine Instance is not available.`);
      return null;
    }
    return this._tuiCallEngine?.tim || this._tuiCallEngine?.getTim(); // mini support getTim interface
  }
  public setIsFromChat(isFromChat: boolean) {
    this._isFromChat = isFromChat;
  }
  public setCurrentGroupId(groupId: string) {
    this._currentGroupId = groupId;
  }
  public getCurrentGroupId() {
    return this._currentGroupId;
  }
  public setDefaultOfflinePushInfo(offlinePushInfo) {
    this._offlinePushInfo = offlinePushInfo;
  }
  public getDefaultOfflinePushInfo() {
    const localUserInfo: IUserInfo = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO);
   if (this._offlinePushInfo) {
      return this._offlinePushInfo;
    }

    return {
      title: localUserInfo?.displayUserInfo || '',
      description: t('you have a new call'),
    };
  }
  public async getCallMessage(message) {
    return await this._chatCombine.getCallKitMessage(message, this.getTim());
  }
  // ------------------ MindFans： 客服 mute 虚拟人、用户声音 -----------------------
  public async muteRemoteAudio(userId: string, isMute: boolean) {
    try {
      const trtcCloudInstance = this?._tuiCallEngine?.getTRTCCloudInstance();
      trtcCloudInstance.muteRemoteAudio(userId, isMute);
    } catch (error) {
      console.warn(error);
    }
  }
}
