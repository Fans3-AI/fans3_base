import React, { useContext } from 'react';
import { TUICallKitServer, TUIGlobal } from '../../../../../../TUICallService';
import Button from '../../../../base/Button';
import Icon from '../../../../base/Icon/Icon';
import { classNames } from '../../../../../util/classnames';
import { useTranslate } from '../../../../../hooks';
import HangupSrc from '../../../../../assets/button/hangup.svg';
import { IsClickableContext } from '../../../../../context';
import { classPrefix } from '../../../../base/common';
import hangupStyle from './Hangup.module.scss';
import commonStyle from '../common.module.scss';

interface IHangupProps {
  isMobile?: boolean;
}

export default function Hangup(props: IHangupProps) {
  const isClickable = useContext(IsClickableContext);
  const { t } = useTranslate();
  const handleClick = () => TUICallKitServer.hangup();
  const iconClassName = classNames([
    commonStyle['btn-icon-container'],
    hangupStyle['hangup-icon-container'],
    {
      mobile: !TUIGlobal.isPC,
      pc: TUIGlobal.isPC,
    },
  ]);
  const hangupIcon = <Icon className={commonStyle['btn-icon']} url={HangupSrc} />;
  return (
    <Button
      loading={!isClickable}
      className={commonStyle[`${classPrefix}-btn`]}
      iconClassName={iconClassName}
      icon={hangupIcon}
      onClick={handleClick}
      {...props}
    >
      {t('hangup')}
    </Button>
  );
}
