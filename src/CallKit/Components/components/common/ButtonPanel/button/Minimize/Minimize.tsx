import React from 'react';
import Button from '../../../../base/Button';
import Icon from '../../../../base/Icon/Icon';
import { TUIGlobal, TUICallKitServer } from '../../../../../../TUICallService';
import MinimizeDeskSrc from '../../../../../assets/button/desktop/minimize.svg';
import MinimizeMobileSrc from '../../../../../assets/button/mobile/minimize.svg';
import minimizeStyle from './Minimize.module.scss';

export default function Minimize() {
  const isMobile = !TUIGlobal.isPC;

  const handleClick = () => {
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    } catch (err) {
      console.debug(err);
    }

    TUICallKitServer.toggleMinimize();
  };
  const MinimizeIcon = (
    <Icon url={isMobile ? MinimizeMobileSrc : MinimizeDeskSrc} />
  );

  return (
    <Button
      className={isMobile ? minimizeStyle['minimize-mobile-container'] : minimizeStyle['minimize-desk-container']}
      icon={MinimizeIcon}
      onClick={handleClick}
      isMobile={isMobile}
    />
  );
}
