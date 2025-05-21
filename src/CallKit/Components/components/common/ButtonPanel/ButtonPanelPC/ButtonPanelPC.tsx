/* eslint-disable react/no-array-index-key */
import React, {useContext} from 'react';
import { UserInfoContext } from '../../../../context';
import Col from '../../../base/Grid/Col';
import Row from '../../../base/Grid/Row';
import { TButtons } from '../../../../const/common';
import { clearPropsValues } from '../../../../util/index';
import buttonPanelPCStyle from './ButtonPanelPC.module.scss';

interface IButtonPanelPCProps {
  buttons?: TButtons;
}

export default function ButtonPanelPC(props: IButtonPanelPCProps) {
  const { buttons = [] } = props;
  const {localUserInfo: { userId }} = useContext(UserInfoContext);

  const renderButtonPanel = () => buttons.map((itemArr, rowIndex) => {
    const renderButtonPanelCol = () => itemArr.map((item, index) => {
      const { component, name, props: buttonProps } = item;
      if (buttonProps?.show === false) {
        return;
      }
      
      // 客服不显示 camera 按钮
      if (name === 'camera' && userId.startsWith('custom')) {
        return;
      }

      // 用户不显示 muteRemoteAudio 按钮
      if (name === 'remoteAudio' && userId.startsWith('user')) {
        return;
      }

      const newProps = clearPropsValues(props, 'show');
      // @ts-ignore
      const ButtonComp = React.createElement(component, { ...newProps });
      const size = Math.floor(12 / itemArr.length);
      return <Col key={index} style={{ justifyContent: 'center' }} span={size}>{ButtonComp}</Col>;
    });

    return <Row key={rowIndex}>{renderButtonPanelCol()}</Row>;
  });
  return <div className={buttonPanelPCStyle['button-panel-pc-container']}>{renderButtonPanel()}</div>;
}
