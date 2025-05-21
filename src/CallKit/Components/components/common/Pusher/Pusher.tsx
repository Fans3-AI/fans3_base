import React, { CSSProperties, useContext, useMemo } from 'react';
import { UserInfoContext, CallInfoContext, CustomUIConfigContext } from '../../../context';
import useNetWorkStatus from '../../../hooks/useNetWorkStatus';
import StreamInfo from '../StreamInfo';
import { classNames } from '../../../util/classnames';
import useGetVolumeMap from '../../../hooks/useGetVolumeMap';
import { TUIGlobal } from '../../../../TUICallService';
import pusherStyle from './Pusher.module.scss';

interface IPusher {
  style?: CSSProperties;
  showStreamInfo?: boolean;
  loading?: boolean;
  renderLoading?: Function;
  renderAudioStream?: any;
  isSpkear?: boolean;
  className?: string;
  isLargeView?: boolean;
}

const Pusher = React.memo((props: IPusher) => {
  const {
    loading = true,
    renderLoading,
    renderAudioStream,
    isSpkear,
    className,
    showStreamInfo = true,
    isLargeView = false,
  } = props;
  const {
    localUserInfo: {
      domId,
      nick,
      userId,
      isAudioAvailable,
      isVideoAvailable,
    },
  } = useContext(UserInfoContext);
  const customUI = useContext(CustomUIConfigContext);
  const { isGroupCall } = useContext(CallInfoContext);
  const netWorkQualityList = useNetWorkStatus();

  const showNetWorkStatus = useMemo(() => {
    if (!netWorkQualityList) return;
    const targetNetwork = netWorkQualityList.find((item) => item.userId === userId);
    if (targetNetwork && targetNetwork.quality >= 4) {
      return true;
    }
    return false;
  }, [netWorkQualityList]);

  const displayUserInfo = nick || userId;

  const volumnMap = useGetVolumeMap();
  const classnames = classNames([
    className,
    pusherStyle['pusher-container'],
  ]);

  const showUserName = useMemo(() => {
    if (isGroupCall) {
      return TUIGlobal.isPC
        ? true
        : !!isLargeView;
    }

    return false;
  }, [isLargeView, isGroupCall]);
  const showSwitchCamera = !TUIGlobal.isPC
    && isVideoAvailable
    && isGroupCall
    && isLargeView
    && customUI?.button?.switchCamera?.show !== false;

  return (
    <>
      <div id={domId} key={domId} className={classnames}>
        {!loading && renderAudioStream?.()}
        {loading && renderLoading?.()}
        {showStreamInfo && (
          <StreamInfo
            volume={volumnMap[domId]}
            isSpkear={isSpkear}
            isMute={!isAudioAvailable}
            displayName={displayUserInfo}
            isMe
            showUserName={showUserName}
            showSwitchCamera={showSwitchCamera}
            showNetWorkStatus={showNetWorkStatus}
          />
        )}
      </div>
    </>
  );
});

export default Pusher;
