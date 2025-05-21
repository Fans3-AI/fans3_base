import React from 'react';
import Button from '../../../base/Button';
import { TUICallKitServer, TUIGlobal, t } from '../../../../../TUICallService';
import Icon from '../../../base/Icon/Icon';
import { classNames } from '../../../../util/classnames';
import SwitchAudioCallSrc from '../../../../assets/button/switch-audio.svg';
import { classPrefix } from '../../../base/common';
import commonStyle from './common.module.scss';

export default function SwitchAudioCall(props) {
  const handleClick = () => TUICallKitServer.switchCallMediaType();
  const iconClassName = classNames([
    commonStyle['btn-icon-container'],
    {
      mobile: !TUIGlobal.isPC,
      pc: TUIGlobal.isPC,
      close: true,
    },
  ]);
  const SwitchAudioCallIcon = <Icon className={commonStyle['btn-icon']} url={SwitchAudioCallSrc} />;
  return (
    <Button
      className={commonStyle[`${classPrefix}-btn`]}
      iconClassName={iconClassName}
      icon={SwitchAudioCallIcon}
      onClick={handleClick}
      {...props}
    >
      {t('video-to-audio')}
    </Button>
  );
}
