import React, {
  useMemo,
  useContext,
  useState,
  useEffect,
} from 'react';
import {
  CallRole,
  CallStatus,
  CallMediaType,
  TUIGlobal,
  TUIStore,
  StoreName,
  NAME,
} from '../../../../TUICallService';
import { ButtonPanelConfig } from './config';
import ButtonPanelH5 from './ButtonPanelH5/ButtonPanelH5';
import ButtonPanelPC from './ButtonPanelPC/ButtonPanelPC';
import BackgroundBlur from './button/BackgroundBlur';
import { CallInfoContext, IsClickableContext, UserInfoContext } from '../../../context';
import { deepClone } from '../../../util';
import useCustomButtonUIConfig from '../../../hooks/useCustomButtonUIConfig';
import { modify, add } from '../../../util/uiDesign';

const isMobile = !TUIGlobal.isPC;

export default function ButtonPanel() {
  const {
    callStatus, isGroupCall, callRole, callType, isShowEnableVirtualBackground,
  } = useContext(CallInfoContext);
  const { localUserInfo } = useContext(UserInfoContext);
  const customButtonUIConfig = useCustomButtonUIConfig();
  const [
    isClickable,
    setIsClickable,
  ] = useState(TUIStore.getData(StoreName.CALL, NAME.IS_CLICKABLE));
  const IsClickableContextValue = useMemo(() => isClickable, [isClickable]);
  const handleIsClickableChange = (value) => {
    setIsClickable(value);
  };
  useEffect(() => {
    TUIStore.watch(
      StoreName.CALL,
      { [NAME.IS_CLICKABLE]: handleIsClickableChange },
      { notifyRangeWhenWatch: NAME.MYSELF },
    );

    return () => {
      TUIStore.unwatch(
        StoreName.CALL,
        { [NAME.IS_CLICKABLE]: handleIsClickableChange },
      );
    };
  }, []);
  const setVirtualBackgroundConfig = (config) => {
    const newButtonPanelConfig = deepClone(config);
    add(newButtonPanelConfig, 'pc.singleCall.video.calling[0][2]', { component: BackgroundBlur, props: {} });
    add(newButtonPanelConfig, 'pc.singleCall.video.accept[0][1]', { component: BackgroundBlur, props: {} });
    add(newButtonPanelConfig, 'pc.singleCall.video.connected[0][3]', { component: BackgroundBlur, props: {} });
    add(newButtonPanelConfig, 'pc.groupCall.video.calling[0][2]', { component: BackgroundBlur, props: {} });
    add(newButtonPanelConfig, 'pc.groupCall.video.connected[0][2]', { component: BackgroundBlur, props: {} });
    return newButtonPanelConfig;
  };
  const setCloseCameraConfig = (config, isVideoAvailable, isShowVirtualBackgroundIcon) => {
    const newConfig = deepClone(config);
    if (isVideoAvailable) {
      modify(newConfig, 'h5.singleCall.video.connected[1][2].props.show', true);
      if (isShowVirtualBackgroundIcon) {
        setVirtualBackgroundConfig(newConfig);
      }
    } else {
      modify(newConfig, 'h5.singleCall.video.connected[1][2].props.show', false);
      if (isShowVirtualBackgroundIcon) {
        modify(newConfig, 'pc.singleCall.video.connected[0][3].props.show', false);
        modify(newConfig, 'pc.groupCall.video.connected[0][2].props.show', false);
      }
    }
    return newConfig;
  };
  const buttons = useMemo(() => {
    let newButtonPanelConfig = deepClone(ButtonPanelConfig);

    if (isShowEnableVirtualBackground) {
      newButtonPanelConfig = setVirtualBackgroundConfig(ButtonPanelConfig);
    }

    if (callStatus === CallStatus.CONNECTED) {
      newButtonPanelConfig = setCloseCameraConfig(
        newButtonPanelConfig,
        localUserInfo?.isVideoAvailable,
        isShowEnableVirtualBackground,
      );
    }

    customButtonUIConfig?.forEach((item) => {
      const { path, value } = item;
      modify(newButtonPanelConfig, path, value);
    });

    const platform = TUIGlobal.isPC ? 'pc' : 'h5';
    const callScene = isGroupCall ? 'groupCall' : 'singleCall';
    const mediaType = callType === CallMediaType.AUDIO ? 'audio' : 'video';
    const status = callStatus === CallStatus.CALLING
      ? callRole === CallRole.CALLER ? 'calling' : 'accept'
      : callStatus;
    const rs = newButtonPanelConfig?.[platform]?.[callScene]?.[mediaType]?.[status] || [];
    if (rs.length === 1) {
      rs.unshift([]);
    }

    return rs;
  }, [
    isGroupCall,
    callType,
    callStatus,
    callRole,
    isShowEnableVirtualBackground,
    customButtonUIConfig,
    localUserInfo?.isVideoAvailable,
  ]);

  return (
    <IsClickableContext.Provider value={IsClickableContextValue}>
      {isMobile ? <ButtonPanelH5 buttons={buttons} /> : <ButtonPanelPC buttons={buttons} />}
    </IsClickableContext.Provider>
  );
}
