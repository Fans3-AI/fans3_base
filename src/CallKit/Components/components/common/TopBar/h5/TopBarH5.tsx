import React, { useContext } from 'react';
import Time from '../../../base/Time/Time';
import Col from '../../../base/Grid/Col';
import Row from '../../../base/Grid/Row';
import Minimize from '../../ButtonPanel/button/Minimize';
import { CallRole, CallStatus } from '../../../../../TUICallService';
import Tip from '../../Tip/Tip';
import { CallInfoContext } from '../../../../context';
import topBarH5Style from './TopBarH5.module.scss';

interface ITopBarH5Props {
  callDuration?: string;
}

export default function TopBarH5(props: ITopBarH5Props) {
  const { callDuration } = props;
  const {
    isGroupCall, callStatus, callRole, allowedMinimized,
  } = useContext(CallInfoContext);
  const showTip = (isGroupCall
    && (callStatus === CallStatus.CONNECTED || callRole === CallRole.CALLER));
  return (
    <div className={topBarH5Style['top-bar-container']}>
      <Row className={topBarH5Style['top-bar']}>
        <Col justify='start' span={4}>
          {allowedMinimized && <Minimize />}
        </Col>
        <Col align='center' span={4}>
          {callStatus === CallStatus.CONNECTED
            ? (
              <Time callDuration={callDuration} />
            ) : (
              showTip && <Tip />
            )}
        </Col>
        <Col span={4} />
      </Row>
    </div>
  );
}
