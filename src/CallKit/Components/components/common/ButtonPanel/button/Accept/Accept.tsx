import React from 'react';
import Button from '../../../../base/Button';
import { TUICallKitServer, TUIGlobal } from '../../../../../../TUICallService';
import Icon from '../../../../base/Icon/Icon';
import useTranslate from '../../../../../hooks/useTranslate';
import { classNames } from '../../../../../util/classnames';
import AcceptSrc from '../../../../../assets/button/accept.svg';
import { classPrefix } from '../../../../base/common';
import commonStyle from '../common.module.scss';
import acceptStyle from './Accept.module.scss';

interface IAcceptProps {
  isMobile?: boolean;
}

export default function Accept(props: IAcceptProps) {
  const { t } = useTranslate();
  const handleClick = () => TUICallKitServer.accept();
  const iconClassName = classNames([
    commonStyle['btn-icon-container'],
    acceptStyle['accept-icon-container'],
    {
      mobile: !TUIGlobal.isPC,
      pc: TUIGlobal.isPC,
    },
  ]);
  const AcceptIcon = <Icon className={commonStyle['btn-icon']} url={AcceptSrc} />;
  return (
    <Button
      className={commonStyle[`${classPrefix}-btn`]}
      icon={AcceptIcon}
      iconClassName={iconClassName}
      onClick={handleClick}
      {...props}
    >
      {t('accept')}
    </Button>
  );
}
