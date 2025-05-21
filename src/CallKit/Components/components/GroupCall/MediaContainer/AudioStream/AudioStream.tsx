import React, { useEffect, useState } from 'react';
import { TUIGlobal } from '../../../../../TUICallService';
import OverlayStream from '../../../common/OverlayStream/OverlayStream';
import useViewBackgroundConfig from '../../../../hooks/useViewBackgroundConfig';
import defaultAvatarSrc from '../../../../assets/common/defaultAvatar.svg';

interface IRenderAudioStreamProps {
  avatar?: string;
  username?: string;
  visible?: boolean;
  isVideoAvailable?: boolean;
  background?: string;
  userId?: string;
}

export default function AudioStream(props: IRenderAudioStreamProps) {
  const viewBackgroundConfigObj = useViewBackgroundConfig();
  const {
    avatar, username, visible, userId,
  } = props || {};
  const [background, setBackground] = useState(viewBackgroundConfigObj[userId] || avatar);
  useEffect(() => {
    setBackground(viewBackgroundConfigObj[userId] || avatar || defaultAvatarSrc);
  }, [viewBackgroundConfigObj, userId]);

  return (
    <OverlayStream
      showLoading={false}
      showAvatar={false}
      avatar={avatar || defaultAvatarSrc}
      username={username}
      showUsername={TUIGlobal.isPC}
      isMobile={!TUIGlobal.isPC}
      showOverlayer={false}
      blur={false}
      background={background}
      // @ts-ignore
      style={{ visibility: visible ? '' : 'hidden', zIndex: 1 }}
    />
  );
}
