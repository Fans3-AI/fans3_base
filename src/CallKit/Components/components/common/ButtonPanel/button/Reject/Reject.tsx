import React from 'react';
import Button from '../../../../base/Button';
import { TUICallKitServer, TUIGlobal } from '../../../../../../TUICallService';
import Icon from '../../../../base/Icon/Icon';
import { useTranslate } from '../../../../../hooks';
import { classNames } from '../../../../../util/classnames';
import HangupSrc from '../../../../../assets/button/hangup.svg';
import { classPrefix } from '../../../../base/common';
import commonStyle from '../common.module.scss';
import rejectStyle from './Reject.module.scss';

interface IRejectProps {
  isMobile?: boolean;
}

export default function Reject(props: IRejectProps) {
  const { t } = useTranslate();
  const handleClick = () => TUICallKitServer.reject();
  const iconClassName = classNames([
    commonStyle['btn-icon-container'],
    rejectStyle['reject-icon-container'],
    {
      mobile: !TUIGlobal.isPC,
      pc: TUIGlobal.isPC,
    },
  ]);
  const hangupIcon = <Icon className={commonStyle['btn-icon']} url={HangupSrc} />;
  return (
    <Button
      className={commonStyle[`${classPrefix}-btn`]}
      icon={hangupIcon}
      iconClassName={iconClassName}
      onClick={handleClick}
      {...props}
    >
      {t('reject')}
    </Button>
  );
}
