import React, { useContext, useState } from 'react';
import Button from '../../../../base/Button';
import Icon from '../../../../base/Icon/Icon';
import { TUICallKitServer, TUIGlobal } from '../../../../../../TUICallService';
import { useTranslate } from '../../../../../hooks';
import backgroundBlurCloseSrc from '../../../../../assets/button/backgroundBlurClose.svg';
import backgroundBlurOpenSrc from '../../../../../assets/button/backgroundBlurOpen.svg';
import { classNames } from '../../../../../util/classnames';
import { CallInfoContext } from '../../../../../context';
import { classPrefix } from '../../../../base/common';
import backGroundBlurStyle from './BackgroundBlur.module.scss';
import commonStyle from '../common.module.scss';

export default function BackgroundBlur() {
  const { enableVirtualBackground } = useContext(CallInfoContext);
  const [isClickable, setIsClickable] = useState(true);
  const { t } = useTranslate();
  const backgroundBlurIcon = <Icon url={enableVirtualBackground ? backgroundBlurOpenSrc : backgroundBlurCloseSrc} className={commonStyle['btn-icon']} />;
  const iconClassName = classNames([
    commonStyle['btn-icon-container'],
    backGroundBlurStyle['background-blur-icon-container'],
    {
      mobile: !TUIGlobal.isPC,
      pc: TUIGlobal.isPC,
      close: !enableVirtualBackground,
    },
  ]);

  const handleClick = async () => {
    setIsClickable(false);
    await TUICallKitServer.setBlurBackground(!enableVirtualBackground);
    setIsClickable(true);
  };

  return (
    <Button
      loading={!isClickable}
      className={commonStyle[`${classPrefix}-btn`]}
      iconClassName={iconClassName}
      icon={backgroundBlurIcon}
      onClick={handleClick}
    >
      {t('virtual-background')}
    </Button>
  );
}
