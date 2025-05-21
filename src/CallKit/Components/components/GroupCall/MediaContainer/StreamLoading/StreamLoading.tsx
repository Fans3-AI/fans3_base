import { useEffect, useState } from 'react';
import useViewBackgroundConfig from '../../../../hooks/useViewBackgroundConfig';
import { TObjectFit } from '../../../../const/common';
import Loading from '../../../base/Loading';
import defaultAvatarSrc from '../../../../assets/common/defaultAvatar.svg';

interface IRenderStreamLoadingProps {
  avatar?: string;
  username?: string;
  userId?: string;
}

export default function StreamLoading(props: IRenderStreamLoadingProps) {
  const { avatar, userId } = props || {};
  const viewBackgroundConfigObj = useViewBackgroundConfig();
  const [showOverlay, setShowOverlay] = useState(!viewBackgroundConfigObj[userId]);
  const [fit, setFit] = useState<{objectFit: TObjectFit}>({ objectFit: 'cover' });
  const [
    background,
    setBackground,
  ] = useState(viewBackgroundConfigObj[userId] || avatar || defaultAvatarSrc);
  const style = { width: '100%', height: '100%' };

  useEffect(() => {
    if (viewBackgroundConfigObj[userId]) {
      setFit({ objectFit: 'fill' });
      setShowOverlay(false);
      setBackground(viewBackgroundConfigObj[userId] || avatar || defaultAvatarSrc);
    }
  }, [viewBackgroundConfigObj, userId]);

  const handleImgError = () => {
    setFit({ objectFit: 'cover' });
    setShowOverlay(false);
    setBackground(defaultAvatarSrc);
  };

  return (
    <Loading showOverlayer={showOverlay}  theme='dot' style={{ zIndex: 1, position: 'absolute', top: 0 }}>
      <img
        alt='Failed to load the background image in loading'
        style={{ ...style, ...fit }}
        src={background}
        onError={handleImgError}
        />
    </Loading>
  );
}
