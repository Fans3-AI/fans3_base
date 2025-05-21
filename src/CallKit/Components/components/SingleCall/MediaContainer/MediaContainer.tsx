import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { CallMediaType, CallStatus, TUIGlobal } from '../../../../TUICallService';
import { ToggleWindow, ToggleWindowItem } from '../../base/ToggleWindow';
import Player from '../../common/Player/Player';
import Pusher from '../../common/Pusher/Pusher';
import { CallInfoContext, UserInfoContext } from '../../../context';
import AudioStream from './AudioStream/AudioStream';
import { classNames } from '../../../util/classnames';
import Portal from '../../base/Portal/Portal';
import useGetLargeViewName from './hooks/useGetLargeViewName';
import { ViewName } from '../../../../TUICallService/const/index';
import mediaContainerStyle from './MediaContainer.module.scss';

interface IRenderAudioStreamProps {
  avatar?: string;
  username?: string;
  visible?: boolean;
  isSmall?: boolean;
  isVideoAvailable?: boolean;
  userId?: string;
  classnames?: string;
}

export default function MediaContainer() {
  const { remoteList, localUserInfo } = useContext(UserInfoContext);
  const { callType, callStatus, isFloat } = useContext(CallInfoContext);
  const [largeViewName, setLargeViewName] = useGetLargeViewName();
  const isAudioCall = useMemo(() => callType === CallMediaType.AUDIO, [callType]);
  const [showSmallWindow, setShowSmallWindow] = useState(false);

  useEffect(() => {
    if (remoteList?.[0]?.isEnter) {
      if (!isAudioCall) {
        setShowSmallWindow(true);
      } else {
        setShowSmallWindow(false);
      }
    }
  }, [remoteList, isAudioCall]);

  function renderAudioStream(props: IRenderAudioStreamProps) {
    return <AudioStream {...props} />;
  }

  const attachId = useMemo(() => {
    if (isFloat) {
      return '#float';
    }

    return '#single-container';
  }, [isFloat]);

  const showPusherStreamInfo = TUIGlobal.isPC
    && callStatus === CallStatus.CONNECTED
    && !isAudioCall
    && !isFloat;
  const classnames = classNames([
    mediaContainerStyle['single-stream-container'],
    {
      [mediaContainerStyle.mobile]: !TUIGlobal.isPC,
      [mediaContainerStyle.pc]: TUIGlobal.isPC,
      [mediaContainerStyle.float]: isFloat,
    },
  ]);

  return (
    <div id='single-container' className={classnames}>
      <Portal attach={attachId} style={{ width: '100%', height: '100%', position: 'relative' }}>
        <ToggleWindow
          isMobile={!TUIGlobal.isPC}
          bigWindow={largeViewName}
          showSmallWindow={showSmallWindow}
          onToggle={setLargeViewName}
        >
          <ToggleWindowItem key={ViewName.LOCAL} value={ViewName.LOCAL}>
            <Pusher
              loading={
                callStatus === CallStatus.CALLING
                && (callType === CallMediaType.VIDEO ? !localUserInfo?.isVideoAvailable : true)
              }
              renderAudioStream={() => renderAudioStream({
                isVideoAvailable: localUserInfo.isVideoAvailable,
                avatar: isAudioCall ? remoteList?.[0]?.avatar : localUserInfo.avatar,
                username: isAudioCall
                  ? remoteList?.[0]?.displayUserInfo
                  : (localUserInfo.nick || localUserInfo.userId),
                isSmall: largeViewName !== ViewName.LOCAL,
                userId: isAudioCall ? remoteList?.[0]?.userId : localUserInfo.userId,
                classnames: mediaContainerStyle['single-call-audio-stream'],
              })}
              showStreamInfo={showPusherStreamInfo}
            />
          </ToggleWindowItem>
          <ToggleWindowItem
            key={ViewName.REMOTE}
            value={ViewName.REMOTE}
            className={mediaContainerStyle.remote}
          >
            {remoteList.length !== 0 && callStatus === CallStatus.CONNECTED && (
              <Player
                renderAudioStream={(props) => renderAudioStream({
                  isVideoAvailable: remoteList[0].isVideoAvailable,
                  avatar: remoteList[0].avatar,
                  username: remoteList[0].displayUserInfo,
                  isSmall: largeViewName !== ViewName.REMOTE,
                  userId: remoteList[0].userId,
                  classnames: mediaContainerStyle['single-call-audio-stream'],
                  ...props,
                })}
                showStreamInfo={TUIGlobal.isPC && !isAudioCall && !isFloat}
                streamInfo={remoteList[0]}
              />
            )}
          </ToggleWindowItem>
        </ToggleWindow>
      </Portal>
    </div>
  );
}
