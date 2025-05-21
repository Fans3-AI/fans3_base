/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, {
  CSSProperties, useContext, useEffect, useState,
} from 'react';
import Button from '../../../base/Button';
import Col from '../../../base/Grid/Col';
import Row from '../../../base/Grid/Row';
import Icon from '../../../base/Icon/Icon';
import { classNames } from '../../../../util/classnames';
import { clearPropsValues } from '../../../../util/index';
import { CallInfoContext, FocusItemContext } from '../../../../context';
import { TButtons } from '../../../../const/common';
import UpSrc from '../../../../assets/button/mobile/up.svg';
import DownSrc from '../../../../assets/button/mobile/down.svg';
import buttonPanelH5Style from './ButtonPanelH5.module.scss';

interface IButtonPanelH5Props {
  buttons?: TButtons;
  style?: CSSProperties;
}
export default function ButtonPanelH5(props: IButtonPanelH5Props) {
  const { buttons = [] } = props;
  const { isGroupCall } = useContext(CallInfoContext);
  const { focusItem } = useContext(FocusItemContext);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  useEffect(() => {
    setIsPanelOpen(focusItem === null);
  }, [focusItem, setIsPanelOpen]);
  const [showBtnPanelBackground, setShowBtnPanelBackground] = useState(false);
  useEffect(() => {
    if (focusItem !== null && !showBtnPanelBackground) {
      setShowBtnPanelBackground(true);
    }
  }, [focusItem, showBtnPanelBackground]);
  const classnames = classNames([
    buttonPanelH5Style['button-panel-h5-container'],
    {
      [buttonPanelH5Style.open]: isPanelOpen,
      [buttonPanelH5Style.groupcall]: isGroupCall,
      [buttonPanelH5Style['show-panel-background']]: showBtnPanelBackground,
    },
  ]);

  const renderOpenButtonPanel = () => buttons.map((itemArr, rowIndex) => {
    const filterItemArr = rowIndex === 0
      ? itemArr.filter((item) => item?.props?.show !== false)
      : itemArr;
    const renderButtonPanelCol = () => filterItemArr.map((item, index) => {
      const justify = filterItemArr.length > 2
        ? index === 0 ? 'start' : index === filterItemArr.length - 1 ? 'end' : 'center'
        : 'center';
      // eslint-disable-next-line no-shadow
      const { component, props } = item;
      const customStyle: { visibility?: any} = {};
      if (props?.show === false) {
        if (rowIndex === 0) {
          return;
        }
        customStyle.visibility = 'hidden';
      }
      const size = 12 / filterItemArr.length;
      const newProps = clearPropsValues(props, 'show');
      // @ts-ignore
      const ButtonComp = React.createElement(component, { isMobile: true, ...newProps });
      return (
        <Col
          key={`col-${index}`}
          style={{ overflow: 'visible', ...props?.style, ...customStyle }}
          span={size}
          justify={justify}
        >
          {ButtonComp}
        </Col>
      );
    });

    return (
      <Row
        key={`row-${rowIndex}`}
        style={{ marginTop: rowIndex === 1 ? '2.4vh' : 0 }}
      >
        {renderButtonPanelCol()}
      </Row>
    );
  });
  const toggleBtnPanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  const renderTogglePanelBtn = () => {
    const toggleBtnPanelIcon = isPanelOpen
      ? <Icon url={DownSrc} />
      : <Icon url={UpSrc} />;
    return (
      <Button
        className={classNames([
          buttonPanelH5Style['toggle-panel-btn'],
          { [buttonPanelH5Style.close]: !isPanelOpen },
        ])}
        icon={toggleBtnPanelIcon}
        onClick={toggleBtnPanel}
      />
    );
  };
  const renderCloseButtonPanel = () => {
    const rs = buttons.flat();
    const renderButtonPanelCol = () => rs.map((item, index) => {
      const { component, props: buttonProps } = item;
      if (buttonProps?.show === false) {
        return;
      }
      // @ts-ignore
      const ButtonComp = React.createElement(component, { isMobile: true, size: 'small', showText: false });
      const size = 12 / rs.length;
      return (
        <Col
          key={index}
          style={{ overflow: 'visible' }}
          span={size}
        >
          {ButtonComp}
        </Col>
      );
    });

    return <Row>{renderButtonPanelCol()}</Row>;
  };
  const renderButtonPanel = () => {
    if (isGroupCall && !isPanelOpen) {
      return renderCloseButtonPanel();
    }

    return renderOpenButtonPanel();
  };

  return (
    <div className={classnames}>
      {showBtnPanelBackground && renderTogglePanelBtn()}
      <div
        className={classNames([
          {
            [buttonPanelH5Style['groupcall-panel']]: isGroupCall,
            [buttonPanelH5Style['singlecall-panel']]: !isGroupCall,
            [buttonPanelH5Style.close]: !isPanelOpen,
          },
        ])}
      >
        {renderButtonPanel()}
      </div>
    </div>
  );
}
