import React, { useContext } from 'react';
import Time from '../../../base/Time/Time';
import Col from '../../../base/Grid/Col';
import Row from '../../../base/Grid/Row';
import Minimize from '../../ButtonPanel/button/Minimize/Minimize';
import FullScreen from '../../ButtonPanel/button/FullScreen';
import { CallStatus } from '../../../../../TUICallService';
import { CallInfoContext } from '../../../../context';
import topBarPCStyle from './TopBarPC.module.scss';

interface ITopBarPCProps {
  callDuration?: string;
}

export default function TopBarPC(props: ITopBarPCProps) {
  const { callDuration } = props;
  const {
    isGroupCall,
    callStatus,
    allowedMinimized,
    allowedFullScreen,
  } = useContext(CallInfoContext);
  const showTime = callStatus === CallStatus.CONNECTED && !isGroupCall;
  return (
    <Row className={topBarPCStyle['single-top-bar']}>
      <Col span={4} />
      <Col span={4}>
        {showTime && <Time callDuration={callDuration} />}
      </Col>
      <Col span={4} justify='end'>
        {allowedMinimized && <Minimize />}
        {allowedFullScreen && <FullScreen domID='tuicallkit-id' />}
      </Col>
    </Row>
  );
}
