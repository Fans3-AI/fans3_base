import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { CallInfoContext } from '../../../../context';
import { CallMediaType, TUIGlobal } from '../../../../../TUICallService';
import useViewBackgroundConfig from '../../../../hooks/useViewBackgroundConfig';
import OverlayStream from '../../../common/OverlayStream/OverlayStream';
import { TObjectFit } from '../../../../const/common';
import defaultAvatarSrc from '../../../../assets/common/defaultAvatar.svg';
import { classNames } from '../../../../util/classnames';

interface IRenderAudioStreamProps {
  avatar?: string;
  username?: string;
  visible?: boolean;
  isSmall?: boolean;
  isVideoAvailable?: boolean;
  userId?: string;
  classnames?: string;
}

export default function AudioStream(props: IRenderAudioStreamProps) {
  const {
    avatar,
    username,
    isSmall,
    isVideoAvailable,
    userId,
    classnames,
    ...rest
  } = props;
  const [audioStreamVisible, setAudioStreamVisible] = useState('hidden');
  const viewBackgroundConfigObj = useViewBackgroundConfig();
  const { callType, isFloat } = useContext(CallInfoContext);
  const isAudioCall = useMemo(() => callType === CallMediaType.AUDIO, [callType]);
  const [showOverlayer, setShowOverlayer] = useState(!viewBackgroundConfigObj[userId]);
  const [fit, setFit] = useState<TObjectFit>(viewBackgroundConfigObj[userId] ? 'fill' : 'cover');
  const [background, setBackground] = useState(viewBackgroundConfigObj[userId] || avatar);
  const [imgError, setImgError] = useState(false);
  const audioStreamClassNames = classNames([
    classnames,
  ]);

  useEffect(() => {
    if (((isAudioCall && !isSmall) || (!isAudioCall && !isVideoAvailable))) {
      setAudioStreamVisible('');
    } else {
      setAudioStreamVisible('hidden');
    }
    if (!imgError) {
      if (isAudioCall) {
        setShowOverlayer(!viewBackgroundConfigObj[userId]);
      } else {
        setShowOverlayer(!isVideoAvailable && !viewBackgroundConfigObj[userId]);
      }

      setFit(viewBackgroundConfigObj[userId] ? 'fill' : 'cover');
      setBackground(viewBackgroundConfigObj[userId] || avatar || defaultAvatarSrc);
    }
  }, [isFloat, isSmall, isAudioCall, isVideoAvailable, viewBackgroundConfigObj]);

  const handleImgError = () => {
    setImgError(true);
    setFit('cover');
  };

  return (
    <OverlayStream
      className={audioStreamClassNames}
      showLoading={false}
      avatar={avatar || defaultAvatarSrc}
      showAvatar={!TUIGlobal.isPC}
      username={username}
      showVolumn={TUIGlobal.isPC && callType === CallMediaType.AUDIO}
      isMobile={!TUIGlobal.isPC}
      isSmall={isSmall}
      background={background}
      showOverlayer={showOverlayer}
      fit={fit}
      // @ts-ignore
      style={{ visibility: audioStreamVisible, zIndex: 1 }}
      {...rest}
      onError={handleImgError}
    />
  );
}
