import React, { useContext, useEffect, useState } from 'react';
import { CallRole, TUIGlobal } from '../../../../TUICallService';
import OverlayStream from '../../common/OverlayStream/OverlayStream';
import { UserInfoContext } from '../../../context';
import defaultAvatarSrc from '../../../assets/common/defaultAvatar.svg';
import useViewBackgroundConfig from '../../../hooks/useViewBackgroundConfig';
import waitingStyle from './Waiting.module.scss';

interface IWaitingProps {
  avatar?: string;
  username?: string;
  callRole?: CallRole;
  userId?: string;
}
type TObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

export default function Waiting(props: IWaitingProps) {
  const { avatar, username, userId } = props;
  const { localUserInfo } = useContext(UserInfoContext);
  const viewBackgroundConfigObj = useViewBackgroundConfig();
  const [background, setBackground] = useState(viewBackgroundConfigObj[userId] || avatar);
  const [showOverlayer, setShowOverlayer] = useState(!viewBackgroundConfigObj[userId]);
  const [fit, setFit] = useState<TObjectFit>(viewBackgroundConfigObj[userId] ? 'fill' : 'cover');

  useEffect(() => {
    setBackground(viewBackgroundConfigObj[userId] || avatar || defaultAvatarSrc);
    setShowOverlayer(!localUserInfo.isVideoAvailable && !viewBackgroundConfigObj[userId]);
    setFit(viewBackgroundConfigObj[userId] ? 'fill' : 'cover');
  }, [viewBackgroundConfigObj, userId]);

  return (
    <OverlayStream
      className={waitingStyle['singlecall-waiting-container']}
      showLoading={false}
      avatar={avatar || defaultAvatarSrc}
      username={username}
      showAvatar={!TUIGlobal.isPC}
      background={background}
      showBackground={!localUserInfo.isVideoAvailable}
      isMobile={!TUIGlobal.isPC}
      showOverlayer={showOverlayer}
      fit={fit}
    />
  );
}
