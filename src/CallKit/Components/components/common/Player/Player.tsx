import React, { CSSProperties, useContext, useMemo } from 'react';
import { IUserInfo } from '../../../../TUICallService/interface';
import { TUIGlobal } from '../../../../TUICallService';
import StreamInfo from '../StreamInfo';
import { classNames } from '../../../util/classnames';
import useGetVolumeMap from '../../../hooks/useGetVolumeMap';
import { CallInfoContext } from '../../../context';
import playerStyle from './Player.module.scss';

interface IPlayer {
  streamInfo?: IUserInfo;
  style?: CSSProperties;
  showStreamInfo?: boolean;
  loading?: boolean;
  renderLoading?: (params?: any) => any;
  renderAudioStream?: (params?: any) => any;
  className?: string;
  isSpkear?: boolean;
  isLargeView?: boolean;
}

export default function Player(props: IPlayer) {
  const volumnMap = useGetVolumeMap();
  const { isGroupCall } = useContext(CallInfoContext);
  const {
    streamInfo = {},
    showStreamInfo = true,
    isSpkear,
    style,
    renderAudioStream,
    className,
    loading,
    renderLoading,
    isLargeView = false,
  } = props;
  const {
    domId,
    isAudioAvailable,
    displayUserInfo,
  } = streamInfo as IUserInfo;

  const classnames = classNames([
    className,
    playerStyle['player-container'],
  ]);

  const showUserName = useMemo(() => {
    if (isGroupCall) {
      return TUIGlobal.isPC
        ? true
        : !!isLargeView;
    }

    return false;
  }, [isLargeView, isGroupCall]);

  return (
    <div id={domId} style={style} className={classnames}>
      {!loading && renderAudioStream?.({
        volume: volumnMap[domId],
        isMute: !isAudioAvailable,
      })}
      {loading && renderLoading?.()}
      {showStreamInfo && (
        <StreamInfo
          volume={volumnMap[domId]}
          isSpkear={isSpkear}
          isMute={!isAudioAvailable}
          displayName={displayUserInfo}
          showUserName={showUserName}
        />
      )}
    </div>
  );
}
