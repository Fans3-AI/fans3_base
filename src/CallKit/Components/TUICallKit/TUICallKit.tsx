import React, {
  useState, useEffect, CSSProperties, useMemo, useLayoutEffect,
} from 'react';
import {
  TUIGlobal,
  TUIStore,
  StoreName,
  NAME,
  CallStatus,
  TUICallKitServer,
  CallMediaType,
  VideoDisplayMode,
  VideoResolution,
} from '../../TUICallService';
import SingleCall from '../components/SingleCall/SingleCall';
import GroupCall from '../components/GroupCall/GroupCall';
import { classNames } from '../util/classnames';
import {
  CallInfoContext,
  UserInfoContext,
  CallerUserInfoContext,
  CustomUIConfigContext,
  TranslateContext,
} from '../context';
import { MessagePlugin } from '../components/base/Message/MessagePlugin';
import FloatingWindow from '../components/common/FloatingWindow';
import useGetSpeakers from '../hooks/useGetSpeakers';
import TUICallKitStyle from './TUICallKit.module.scss';
import Portal from '../components/base/Portal/Portal';

interface ITUICallKitProps {
  style?: CSSProperties;
  className?: string;
  allowedMinimized?: boolean;
  allowedFullScreen?: boolean;
  videoDisplayMode?: VideoDisplayMode;
  videoResolution?: VideoResolution;
  beforeCalling?: any;
  afterCalling?: any;
  onMinimized?: any;
}

export default function TUICallKit(props: ITUICallKitProps) {
  const {
    style,
    className,
    allowedMinimized = true,
    allowedFullScreen = true,
    videoDisplayMode = VideoDisplayMode.COVER,
    videoResolution = VideoResolution.RESOLUTION_1080P,
    beforeCalling,
    afterCalling,
    onMinimized,
  } = props;
  const [callStatus, setCallStatus] = useState(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));
  const [isGroupCall, setIsGroupCall] = useState(TUIStore.getData(StoreName.CALL, NAME.IS_GROUP));
  const [
    callerUserInfo,
    setCallerUserInfo,
  ] = useState(TUIStore.getData(StoreName.CALL, NAME.CALLER_USER_INFO));
  const [
    localUserInfo,
    setLocalUserInfo,
  ] = useState(TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO));
  const [
    remoteList,
    setRemoteList,
  ] = useState(TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST));
  const [callType, setCallType] = useState(TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE));
  const [callRole, setCallRole] = useState(TUIStore.getData(StoreName.CALL, NAME.CALL_ROLE));
  const [isEarPhone, setIsEarPhone] = useState(TUIStore.getData(StoreName.CALL, NAME.IS_EAR_PHONE));
  const [isFloat, setIsFloat] = useState(false);
  const [
    enableVirtualBackground,
    setEnableVirtualBackground,
  ] = useState(TUIStore.getData(StoreName.CALL, NAME.ENABLE_VIRTUAL_BACKGROUND));
  const [
    isShowEnableVirtualBackground,
    setIsShowEnableVirtualBackground,
  ] = useState(TUIStore.getData(StoreName.CALL, NAME.IS_SHOW_ENABLE_VIRTUAL_BACKGROUND));
  const [
    isMuteSpeaker,
    setIsMuteSpeaker,
  ] = useState(TUIStore.getData(StoreName.CALL, NAME.IS_MUTE_SPEAKER));
  const speakerIdList = useGetSpeakers();
  const callInfoContextValue = useMemo(() => ({
    callStatus,
    callRole,
    callType,
    isEarPhone,
    isGroupCall,
    isFloat,
    allowedMinimized,
    allowedFullScreen,
    enableVirtualBackground,
    isShowEnableVirtualBackground,
    isMuteSpeaker,
  }), [
    callStatus,
    callRole,
    callType,
    isEarPhone,
    isGroupCall,
    isFloat,
    allowedFullScreen,
    enableVirtualBackground,
    isShowEnableVirtualBackground,
    isMuteSpeaker,
  ]);
  const UserInfoContextValue = useMemo(() => ({
    localUserInfo,
    remoteList,
  }), [localUserInfo, remoteList]);
  const [
    customUIConfigContextValue,
    setCustomUIConfigContextValue,
  ] = useState(TUIStore.getData(StoreName.CALL, NAME.CUSTOM_UI_CONFIG));
  const [translateContextValue, setTranslateContextValue] = useState({ t: TUIStore.getData(StoreName.CALL, NAME.TRANSLATE) });
  const classnames = classNames([
    className,
    TUICallKitStyle['tuicallkit-container'],
    {
      [TUICallKitStyle.mobile]: !TUIGlobal.isPC,
      [TUICallKitStyle.float]: isFloat,
    },
  ]);

  const handleCallStatusChange = (value) => {
    setCallStatus(value);
  };
  const handleIsGroupChange = (value) => {
    setIsGroupCall(value);
  };
  const handleCallerUserInfoChange = (value) => {
    setCallerUserInfo(value);
  };
  const handleLocalUserInfoChange = (value) => {
    setLocalUserInfo(value);
  };
  const handleRemoteUserInfoListChange = (value) => {
    setRemoteList(value);
  };
  const handleCallMediaTypeChange = (value) => {
    setCallType(value);
  };
  const handleCallRoleChange = (value) => {
    setCallRole(value);
  };
  const handEarPhoneChange = (value) => {
    setIsEarPhone(value);
  };

  const handleToastInfoChange = (value) => {
    const { content, type = 'info' } = value || {};
    if (content) {
      MessagePlugin[type]({ content: translateContextValue?.t?.(content) });
    }
  };
  const handleIsMinizedChange = (value) => {
    setIsFloat(value);
  };
  const handleEnableVirtualBackgroundChange = (value) => {
    setEnableVirtualBackground(value);
  };
  const handleIsShowEnableVirtualBackgroundChange = (value) => {
    setIsShowEnableVirtualBackground(value);
  };
  const handleCustomUIConfigChange = (value) => {
    setCustomUIConfigContextValue(value);
  };
  const handleMuteSpeakerChange = (value) => {
    setIsMuteSpeaker(value);
  };
  const handleTranslateChange = (value) => {
    setTranslateContextValue({ t: value });
  }

  const watchOptions = {
    [NAME.CALL_STATUS]: handleCallStatusChange,
    [NAME.IS_GROUP]: handleIsGroupChange,
    [NAME.CALLER_USER_INFO]: handleCallerUserInfoChange,
    [NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN]: handleLocalUserInfoChange,
    [NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST]: handleRemoteUserInfoListChange,
    [NAME.CALL_MEDIA_TYPE]: handleCallMediaTypeChange,
    [NAME.CALL_ROLE]: handleCallRoleChange,
    [NAME.IS_EAR_PHONE]: handEarPhoneChange,
    [NAME.TOAST_INFO]: handleToastInfoChange,
    [NAME.CUSTOM_UI_CONFIG]: handleCustomUIConfigChange,
    [NAME.ENABLE_VIRTUAL_BACKGROUND]: handleEnableVirtualBackgroundChange,
    [NAME.IS_SHOW_ENABLE_VIRTUAL_BACKGROUND]: handleIsShowEnableVirtualBackgroundChange,
    [NAME.IS_MUTE_SPEAKER]: handleMuteSpeakerChange,
    [NAME.TRANSLATE]: handleTranslateChange,
  };

  useLayoutEffect(() => {
    const uikitTheme = document.documentElement.dataset?.uikitTheme;
    if (['light', 'dark'].indexOf(uikitTheme) === -1) {
      document.documentElement.dataset.uikitTheme = 'light';
    }
  }, []);

  useEffect(() => {
    TUIStore.watch(
      StoreName.CALL,
      watchOptions,
      {
        notifyRangeWhenWatch: NAME.MYSELF,
      },
    );

    TUIStore.watch(StoreName.CALL, {
      [NAME.IS_MINIMIZED]: handleIsMinizedChange,
    });

    return () => {
      TUIStore.unwatch(
        StoreName.CALL,
        { ...watchOptions, [NAME.IS_MINIMIZED]: handleIsMinizedChange },
      );
    };
  }, []);

  useEffect(() => {
    TUICallKitServer.enableFloatWindow(allowedMinimized);
    TUICallKitServer.setVideoDisplayMode(videoDisplayMode as any);
    TUICallKitServer.setVideoResolution(videoResolution as any);
    TUICallKitServer.setCallback({
      beforeCalling,
      afterCalling,
      onMinimized,
    });
  }, [
    beforeCalling,
    afterCalling,
    TUICallKitServer,
    videoDisplayMode,
    videoResolution,
    allowedMinimized,
    onMinimized,
  ]);

  return callStatus !== CallStatus.IDLE && (
    <UserInfoContext.Provider value={UserInfoContextValue}>
      <CallerUserInfoContext.Provider value={callerUserInfo}>
        <CallInfoContext.Provider value={callInfoContextValue}>
          <CustomUIConfigContext.Provider value={customUIConfigContextValue}>
            <TranslateContext.Provider value={translateContextValue}>
              <div style={{ ...style }} className={classnames} id='tuicallkit-id'>
                {!isGroupCall && <SingleCall />}
                {isGroupCall && <GroupCall />}
              </div>
              <Portal attach="body">
                <FloatingWindow
                  show={isFloat}
                  hasVideo={isGroupCall
                    ? speakerIdList.length !== 0
                    : callType === CallMediaType.VIDEO}
                  isAudioAvailable={localUserInfo.isAudioAvailable}
                />
              </Portal>
            </TranslateContext.Provider>
          </CustomUIConfigContext.Provider>
        </CallInfoContext.Provider>
      </CallerUserInfoContext.Provider>
    </UserInfoContext.Provider>
  );
}
