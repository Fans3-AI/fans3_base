import React, { useCallback, useContext, useMemo } from 'react';
import { CallMediaType, CallStatus, TUIGlobal } from '../../../../TUICallService';
import GridLayout from '../../base/GridLayout/GridLayout';
import { GridPlusItem } from '../../base/GridLayout';
import Portal from '../../base/Portal/Portal';
import Pusher from '../../common/Pusher/Pusher';
import AudioStream from './AudioStream/AudioStream';
import { CallInfoContext, FocusItemContext, UserInfoContext } from '../../../context';
import { classNames } from '../../../util/classnames';
import useGetSpeakers from '../../../hooks/useGetSpeakers';
import Player from '../../common/Player/Player';
import StreamLoading from './StreamLoading/StreamLoading';
import mediaContainerStyle from './MediaContainer.module.scss';

interface IRenderAudioStreamProps {
  avatar?: string;
  username?: string;
  visible?: boolean;
  isVideoAvailable?: boolean;
  background?: string;
  userId?: string;
}
interface IRenderStreamLoadingProps {
  avatar?: string;
  username?: string;
  userId?: string;
}

export default function MediaContainer() {
  const { localUserInfo, remoteList } = useContext(UserInfoContext);
  const { callStatus, callType } = useContext(CallInfoContext);
  const { focusItem, setFocusItem } = useContext(FocusItemContext);
  const { isFloat } = useContext(CallInfoContext);
  const speakerIdList = useGetSpeakers();
  const pusherLoading = useMemo(() => {
    if (callStatus === CallStatus.CALLING) {
      if ((callType === CallMediaType.AUDIO && !localUserInfo.isAudioAvailable)
          || (callType === CallMediaType.VIDEO && !localUserInfo.isVideoAvailable)) {
        return true;
      }
    }

    return false;
  }, [localUserInfo, callStatus, callType]);

  function renderLoading(props: IRenderStreamLoadingProps) {
    return <StreamLoading {...props} />;
  }

  function renderAudioStream(props: IRenderAudioStreamProps) {
    return <AudioStream {...props} />;
  }

  const renderRemoteList = useCallback(() => remoteList.map((stream, index) => (
    <GridPlusItem index={index + 1} key={stream.userId}>
      <Player
        className={classNames({
          [mediaContainerStyle.hidden]: isFloat && !speakerIdList.includes(stream.domId),
        })}
        renderLoading={() => renderLoading({
          avatar: stream.avatar,
          username: stream.displayUserInfo,
          userId: stream.userId,
        })}
        renderAudioStream={() => renderAudioStream({
          avatar: stream.avatar,
          username: stream.displayUserInfo,
          visible: !stream.isVideoAvailable,
          userId: stream.userId,
        })}
        loading={!stream.isEnter}
        streamInfo={stream}
        showStreamInfo={!isFloat}
        isSpkear={speakerIdList.includes(stream.domId)}
        isLargeView={focusItem === (index + 1)}
      />
    </GridPlusItem>
  )), [remoteList, speakerIdList, focusItem]);

  const classnames = classNames([
    mediaContainerStyle['groupcall-gridplus-container'],
    {
      [mediaContainerStyle.pc]: TUIGlobal.isPC,
      [mediaContainerStyle.mobile]: !TUIGlobal.isPC,
      [mediaContainerStyle.float]: isFloat,
      [mediaContainerStyle['two-layout']]: remoteList.length === 1 && focusItem === null && !isFloat,
    },
  ]);

  return (
    <div
      id='group-container'
      className={classNames([
        mediaContainerStyle['stream-container'],
        {
          [mediaContainerStyle.mobile]: !TUIGlobal.isPC,
          [mediaContainerStyle.pc]: TUIGlobal.isPC,
          [mediaContainerStyle.float]: isFloat,
        },
      ])}
    >
      <Portal attach={isFloat ? '#float' : '#group-container'} style={{ width: '100%', height: '100%', position: 'relative' }}>
        <GridLayout
          className={classnames}
          isMobile={!TUIGlobal.isPC}
          enableFocus={!TUIGlobal.isPC && !isFloat}
          unit={TUIGlobal.isPC ? '%' : 'vw'}
          onHandleFocusChange={setFocusItem}
        >
          <GridPlusItem index={0} key={localUserInfo.userId}>
            <Pusher
              className={classNames({
                [mediaContainerStyle.hidden]: isFloat
                  && !speakerIdList.includes(localUserInfo.domId),
              })}
              loading={pusherLoading}
              showStreamInfo={!isFloat}
              renderLoading={() => renderLoading({
                avatar: localUserInfo.avatar,
                username: localUserInfo.nick || localUserInfo.userId,
                userId: localUserInfo.userId,
              })}
              renderAudioStream={() => renderAudioStream({
                avatar: localUserInfo.avatar,
                username: localUserInfo.nick || localUserInfo.userId,
                visible: !localUserInfo.isVideoAvailable,
                userId: localUserInfo.userId,
              })}
              isSpkear={speakerIdList.includes(localUserInfo.domId)}
              isLargeView={focusItem === 0}
            />
          </GridPlusItem>
          {/* {...renderRemoteList()} */}
          {React.createElement('GridLayout', null, ...renderRemoteList())}
        </GridLayout>
      </Portal>
    </div>
  );
}
