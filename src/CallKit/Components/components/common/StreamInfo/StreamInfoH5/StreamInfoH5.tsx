import React, { useContext } from 'react';
import Icon from '../../../base/Icon/Icon';
import { classNames } from '../../../../util/classnames';
import Row from '../../../base/Grid/Row';
import Col from '../../../base/Grid/Col';
import Text from '../../../base/Text/Text';
import { CallInfoContext } from '../../../../context';
import VolumnSrc from '../../../../assets/streamInfo/mobile/volumn.svg';
import MicrophoneCloseGroupSrc from '../../../../assets/streamInfo/mobile/microphone-close-group.svg';
import Button from '../../../base/Button';
import { TUICallKitServer } from '../../../../../TUICallService';
import SwitchCameraSrc from '../../../../assets/button/mobile/switch-camera.svg';
import MicrophoneCloseSingleSrc from '../../../../assets/streamInfo/mobile/microphone-close-single.svg';
import networkStatusSrc from '../../../../assets/streamInfo/networkStatus.svg';
import streamInfoH5Style from './StreamInfoH5.module.scss';

interface IStreamInfoH5Props {
  isSpkear?: boolean;
  isMute?: boolean;
  displayName?: string;
  showUserName?: boolean;
  showSwitchCamera?: boolean;
  showNetWorkStatus?: boolean;
}

export default function StreamInfoH5(props: IStreamInfoH5Props) {
  const {
    isSpkear,
    isMute,
    displayName,
    showUserName = false,
    showSwitchCamera = false,
    showNetWorkStatus = false,
  } = props;
  const { isGroupCall } = useContext(CallInfoContext);
  const classnames = classNames(
    [
      streamInfoH5Style['stream-info-container-h5'],
      {
        [streamInfoH5Style.group]: isGroupCall,
        [streamInfoH5Style.single]: !isGroupCall,
      },
    ],
  );

  const ButtonStyle = {
    width: '30px',
    height: '30px',
    background: '#22262e80',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const handleSwitchCamera = async () => {
    await TUICallKitServer.switchCamera();
  };

  const renderGroupCallStreamInfo = () => (
    <Row>
      <Col span={6} align='center' justify='start'>
        {showUserName && <Text maxWidth='100px' truncated>{displayName}</Text>}
        {isSpkear && <Icon style={{ width: 'fit-content' }} url={VolumnSrc} />}
        {isMute && <Icon style={{ width: 'fit-content' }} url={MicrophoneCloseGroupSrc} />}
      </Col>
      <Col span={6} align='center' justify='end'>
        {showNetWorkStatus && <Icon style={{ width: '24px', height: '24px', marginRight: '12px' }} url={networkStatusSrc} />}
        {showSwitchCamera && (
        <Button
          showText={false}
          icon={<Icon url={SwitchCameraSrc} />}
          style={ButtonStyle}
          iconSize='15px'
          isStopPropagation
          onClick={handleSwitchCamera}
        />
        )}
      </Col>
    </Row>
  );
  const renderSingleCallStreamInfo = () => (
    <Row>
      <Col span={12} justify='start'>
        {isMute && <Icon style={{ width: 'fit-content' }} url={MicrophoneCloseSingleSrc} />}
      </Col>
    </Row>
  );

  return (
    <div className={classnames}>
      {isGroupCall ? renderGroupCallStreamInfo() : renderSingleCallStreamInfo()}
    </div>
  );
}
