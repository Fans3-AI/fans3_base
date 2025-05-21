import React from 'react';
import { TUICallKitServer } from '../../../../../TUICallService';
import Button from '../../../base/Button';
import Icon from '../../../base/Icon/Icon';
import switchCameraSrc from '../../../../assets/button/mobile/switch-camera.svg';

export default function SwitchCamera(props) {
  const handleSwitchCamera = () => TUICallKitServer.switchCamera();
  const hangupIcon = <Icon url={switchCameraSrc} />;
  return (
    <Button
      style={{ width: '28px', height: '28px' }}
      iconSize='28px'
      icon={hangupIcon}
      onClick={handleSwitchCamera}
      {...props}
    />
  );
}
