import React, { ReactNode, useContext } from 'react';
import { classNames } from '../../../../util/classnames';
import Icon from '../../../base/Icon/Icon';
import { CallInfoContext } from '../../../../context';
import { useTranslate, useCallDuration } from '../../../../hooks';
import {
  CallMediaType, CallStatus, TUICallKitServer, TUIGlobal,
} from '../../../../../TUICallService';
import EarphoneSrc from '../../../../assets/floatingWindow/mobile/earphone.svg';
import floatingWindowSingleCallStyle from './style/FloatingWindowSingleCall.module.scss';

interface IFloatingWindowProps {
  showVideo?: boolean;
  enable?: boolean;
  hasVideo?: boolean;
  clickable?: boolean;
  children?: ReactNode;
}

export default function FloatingWindowSingleCall(props: IFloatingWindowProps) {
  const { hasVideo, clickable } = props;
  const { callStatus, callType } = useContext(CallInfoContext);
  const { isFloat } = useContext(CallInfoContext);
  const duration = useCallDuration();
  const { t } = useTranslate();

  const renderCallStatus = () => {
    const classnames = classNames([
      floatingWindowSingleCallStyle['video-stream'],
      {
        [floatingWindowSingleCallStyle.hidden]: !hasVideo,
      },
    ]);
    return (
      <>
        <div className={classnames} id='float' />
        {!hasVideo ? (
          <div className={floatingWindowSingleCallStyle['audio-stream']}>
            <div className={floatingWindowSingleCallStyle.earphone}><Icon url={EarphoneSrc} /></div>
            <div className={floatingWindowSingleCallStyle.info}>
              {callStatus === CallStatus.CONNECTED ? duration : t('wait to be called')}
            </div>
          </div>
        ) : (
          <div className={floatingWindowSingleCallStyle.info}>
            {callStatus === CallStatus.CONNECTED ? '' : t('wait to be called')}
          </div>
        )}
      </>
    );
  };

  const classnames = classNames([
    {
      [floatingWindowSingleCallStyle['floating-window-h5-singlecall-container']]: !TUIGlobal.isPC,
      [floatingWindowSingleCallStyle['floating-window-pc-singlecall-container']]: TUIGlobal.isPC,
      [floatingWindowSingleCallStyle['audio-call']]: callType === CallMediaType.AUDIO,
    },
  ]);

  return (
    <div onClick={() => {clickable && TUICallKitServer.toggleMinimize()}} className={classnames}>
      <div className={floatingWindowSingleCallStyle['click-overlay']} />
      <div className={classNames([
        [floatingWindowSingleCallStyle['call-status']],
        {
          [floatingWindowSingleCallStyle.float]: isFloat,
          [floatingWindowSingleCallStyle.video]: hasVideo,
        }])}
      >
        {renderCallStatus()}
      </div>
    </div>
  );
}
