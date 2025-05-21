import React, { useCallback, useContext } from 'react';
import Button from '../../../base/Button';
import { TUICallKitServer, TUIGlobal } from '../../../../../TUICallService/index';
import { CallInfoContext } from '../../../../context';
import Icon from '../../../base/Icon/Icon';
import { classNames } from '../../../../util/classnames';
import Popup from '../../../base/Popup/Popup';
import DeviceSelector from '../../DeviceSelector/DeviceSelector';
import { useTranslate, useDeviceList } from '../../../../hooks';
import { DeviceType } from '../../../../../TUICallService/const';
import SpeakerOpenSrc from '../../../../assets/button/speaker-open.svg';
import SpeakerCloseSrc from '../../../../assets/button/speaker-close.svg';
import { classPrefix } from '../../../base/common';
import commonStyle from './common.module.scss';

interface ISpeakerProps {
  isMobile?: boolean;
}

export default function Speaker(props: ISpeakerProps) {
  const [{ deviceList, currentDeviceId }] = useDeviceList(DeviceType.SPEAKER);
  const { isMuteSpeaker } = useContext(CallInfoContext);
  const { t } = useTranslate();
  const getLabelByDeviceId = (deviceId: any) => {
    if (TUIGlobal.isPC) {
      const result = deviceList.find((item) => item.deviceId === deviceId);
      return result ? result.label : t('speaker enabled');
    } else {
      return isMuteSpeaker ? t('speaker disabled') : t('speaker enabled');
    };
  };

  const handleClick = useCallback(
    () => {
      if (isMuteSpeaker) {
        TUICallKitServer.unMuteSpeaker();
      } else {
        TUICallKitServer.muteSpeaker();
      }
    },
    [isMuteSpeaker],
  );

  const SpeakerIcon = <Icon url={isMuteSpeaker ? SpeakerCloseSrc : SpeakerOpenSrc} className={commonStyle['btn-icon']} />;

  const iconClassName = classNames([
    commonStyle['btn-icon-container'],
    {
      mobile: !TUIGlobal.isPC,
      pc: TUIGlobal.isPC,
      close: isMuteSpeaker,
    },
  ]);

  return (
    <Popup
      trigger={TUIGlobal.isPC ? 'hover' : 'click'}
      disabled={!(deviceList.length > 0 && TUIGlobal.isPC)}
      content={<DeviceSelector deviceType={DeviceType.SPEAKER} />}
      teleported={false}
    >
      <div style={{ display: 'flex' }}>
        <Button
          className={commonStyle[`${classPrefix}-btn`]}
          iconClassName={iconClassName}
          icon={SpeakerIcon}
          onClick={handleClick}
          {...props}
        >
          {getLabelByDeviceId(currentDeviceId)}
        </Button>
      </div>
    </Popup>
  );
}
