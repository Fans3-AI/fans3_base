import React, { ReactNode, useContext } from 'react';
import { classNames } from '../../../../util/classnames';
import Icon from '../../../base/Icon/Icon';
import { CallInfoContext, UserInfoContext } from '../../../../context';
import {
  CallStatus, TUICallKitServer, TUIGlobal,
} from '../../../../../TUICallService';
import { useTranslate, useCallDuration } from '../../../../hooks';
import EarphoneSrc from '../../../../assets/floatingWindow/mobile/earphone.svg';
import CameraOpenSrc from '../../../../assets/floatingWindow/mobile/camera-open.svg';
import MicrophoneOpenSrc from '../../../../assets/floatingWindow/mobile/microphone-open.svg';
import CameraCloseSrc from '../../../../assets/floatingWindow/mobile/camera-close.svg';
import MicrophoneCloseSrc from '../../../../assets/floatingWindow/mobile/microphone-close.svg';
import floatingWindowGroupCallStyle from './style/FloatingWindowGroupCall.module.scss';

interface IFloatingWindowH5Props {
  showVideo?: boolean;
  hasVideo?: boolean;
  clickable?: boolean;
  children?: ReactNode;
}

export default function FloatingWindowGroupCall(props: IFloatingWindowH5Props) {
  const { hasVideo, clickable } = props;
  const { isGroupCall, callStatus } = useContext(CallInfoContext);
  const { isFloat } = useContext(CallInfoContext);
  const { localUserInfo: { isAudioAvailable, isVideoAvailable } } = useContext(UserInfoContext);
  const duration = useCallDuration();
  const { t } = useTranslate();
  const cameraSrc = isVideoAvailable ? CameraOpenSrc : CameraCloseSrc;
  const microphoneSrc = isAudioAvailable ? MicrophoneOpenSrc : MicrophoneCloseSrc;

  const renderCallStatus = () => {
    const classnames = classNames([
      floatingWindowGroupCallStyle['video-stream'],
    ]);
    return (
      <>
        <div
          className={classnames}
          id='float'
        />
        {!hasVideo && (
          <div className={floatingWindowGroupCallStyle['audio-stream']}>
            <div className={floatingWindowGroupCallStyle.earphone}><Icon url={EarphoneSrc} /></div>
            <div className={floatingWindowGroupCallStyle.info}>
              {callStatus === CallStatus.CONNECTED ? duration : t('wait to be called')}
            </div>
          </div>
        )}
      </>
    );
  };

  const floatingWindowGroupCallClassNames = classNames([
    {
      [floatingWindowGroupCallStyle['floating-window-h5-groupcall-container']]: !TUIGlobal.isPC,
      [floatingWindowGroupCallStyle['floating-window-pc-groupcall-container']]: TUIGlobal.isPC,
    },
  ]);

  return (
    <div
      onClick={() => clickable && TUICallKitServer.toggleMinimize()}
      className={floatingWindowGroupCallClassNames}
    >
      <div className={floatingWindowGroupCallStyle['click-overlay']} />
      <div className={classNames([
        floatingWindowGroupCallStyle['call-status'],
        {
          [floatingWindowGroupCallStyle.float]: isFloat,
          [floatingWindowGroupCallStyle.video]: hasVideo,
        }])}
      >
        {renderCallStatus()}
      </div>
      {isGroupCall && isFloat && (
        <div className={floatingWindowGroupCallStyle['device-status']}>
          <div className={classNames([
            floatingWindowGroupCallStyle.icon,
            floatingWindowGroupCallStyle.camera,
          ])}
          >
            <Icon url={cameraSrc} />
          </div>
          <div className={classNames([
            floatingWindowGroupCallStyle.icon,
            floatingWindowGroupCallStyle.micphone,
          ])}
          >
            <Icon url={microphoneSrc} />
          </div>
        </div>
      )}
    </div>
  );
}
