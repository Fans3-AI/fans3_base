import React, { CSSProperties, ReactNode, useContext } from 'react';
import Overlayer from '../../base/Overlayer/Overlayer';
import Avatar from '../../base/Avatar';
import Loading from '../../base/Loading';
import { CallInfoContext } from '../../../context';
import { classNames } from '../../../util/classnames';
import { TObjectFit } from '../../../const/common';
import MicrophoneVolumn from '../MicrophoneVolumn/MicrophoneVolumn';
import defaultAvatarSrc from '../../../assets/common/defaultAvatar.svg';
import overlayStreamStyle from './OverlayStream.module.scss';

interface IOverlayStreamProps {
  avatar?: string;
  username?: string;
  isMobile?: boolean;
  blur?: boolean;
  showAvatar?: boolean;
  showUsername?: boolean;
  theme?: 'circle' | 'dot';
  style?: CSSProperties;
  showOverlayer?: boolean;
  showLoading?: boolean;
  showBackground?: boolean;
  className?: string;
  showVolumn?: boolean;
  volume?: number;
  isMute?: boolean;
  tip?: string;
  isSmall?: boolean;
  showTip?: boolean;
  children?: ReactNode;
  background?: string;
  fit?: TObjectFit;
  onError?: (event?: object) => void;
}

export default function OverlayStream(props: IOverlayStreamProps) {
  const {
    avatar,
    username,
    isMobile,
    isSmall,
    blur = true,
    theme = 'circle',
    children,
    className,
    tip = '',
    volume,
    isMute = false,
    showAvatar = true,
    showUsername = true,
    showOverlayer,
    showBackground = true,
    showLoading = true,
    showVolumn = false,
    style = {},
    showTip = true,
    background = '',
    fit,
    onError,
  } = props;
  const { isFloat } = useContext(CallInfoContext);
  const classnames = classNames([
    className,
    overlayStreamStyle['overlay-stream-container'],
    {
      [overlayStreamStyle.mobile]: isMobile,
      [overlayStreamStyle.pc]: !isMobile,
    },
  ]);

  const handleImgError = (event) => {
    onError?.(event);
  };

  return (
    <div className={classnames} style={style}>
      <Loading showLoading={showLoading} size={40} theme={theme} showOverlayer={false}>
        <div className={overlayStreamStyle['user-info-container']}>
          {showAvatar && (
          <Avatar
            className={classNames([
              overlayStreamStyle.avatar,
              {
                [overlayStreamStyle.small]: isSmall,
                [overlayStreamStyle.float]: isFloat,
              },
            ])}
            image={avatar}
          />
          )}
          {showUsername && (
            <div className={overlayStreamStyle.username}>
              <div className={classNames([
                overlayStreamStyle.nick,
                { [overlayStreamStyle.small]: isSmall, [overlayStreamStyle.float]: isFloat }])}
              >
                {username}
              </div>
              {showVolumn && <MicrophoneVolumn volume={volume} close={isMute} style={{ marginLeft: '10px' }} />}
            </div>
          )}
          {showTip && <div className={overlayStreamStyle.tip}>{tip}</div>}
          {children}
        </div>
        {showBackground && (
          <Overlayer
            showOverlayer={showOverlayer}
            className={classNames({ [overlayStreamStyle.blur]: blur })}
            background={background}
            fit={fit}
            defaultSrc={defaultAvatarSrc}
            onError={handleImgError}
          />
        )}
      </Loading>
    </div>
  );
}
