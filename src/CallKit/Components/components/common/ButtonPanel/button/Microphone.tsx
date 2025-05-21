import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import Button from '../../../base/Button';
import Icon from '../../../base/Icon/Icon';
import { TUICallKitServer, TUIGlobal } from '../../../../../TUICallService';
import { UserInfoContext } from '../../../../context';
import { classNames } from '../../../../util/classnames';
import Popup from '../../../base/Popup/Popup';
import DeviceSelector from '../../DeviceSelector/DeviceSelector';
import { useTranslate, useDeviceList } from '../../../../hooks';
import { DeviceType } from '../../../../../TUICallService/const';
import MicrophoneOpenSrc from '../../../../assets/button/microphone-open.svg';
import MicrophoneCloseSrc from '../../../../assets/button/microphone-close.svg';
import { classPrefix } from '../../../base/common';
import commonStyle from './common.module.scss';

interface IMicrophoneProps {
  isMobile?: boolean;
}

export default function Microphone(props: IMicrophoneProps) {
  const { localUserInfo } = useContext(UserInfoContext);
  const isOpen = useMemo(() => localUserInfo?.isAudioAvailable, [localUserInfo]);
  const [{ deviceList }] = useDeviceList(DeviceType.MICROPHONE);
  const [isClickable, setIsClickable] = useState(true);
  const { t } = useTranslate();

  const handleClick = useCallback(
    async () => {
      setIsClickable(false);

      if (isOpen) {
        await TUICallKitServer.closeMicrophone();
      } else {
        await TUICallKitServer.openMicrophone();
      }

      setIsClickable(true);
    },
    [isOpen, setIsClickable],
  );
  const iconClassName = classNames([
    commonStyle['btn-icon-container'],
    {
      mobile: !TUIGlobal.isPC,
      pc: TUIGlobal.isPC,
      close: !isOpen,
      disabled: !isClickable,
    },
  ]);
  const btnText = isOpen ? t('microphone enabled') : t('microphone disabled');
  const MicrophoneIcon = <Icon className={commonStyle['btn-icon']} url={isOpen ? MicrophoneOpenSrc : MicrophoneCloseSrc}/>;

  return (
    <Popup
      content={<DeviceSelector deviceType={DeviceType.MICROPHONE} />}
      disabled={!TUIGlobal.isPC || !(deviceList?.length > 0)}
      teleported={false}
    >
      <div style={{ display: 'flex' }}>
        <Button
          className={commonStyle[`${classPrefix}-btn`]}
          iconClassName={iconClassName}
          icon={MicrophoneIcon}
          loading={!isClickable}
          onClick={handleClick}
          {...props}
        >
          {btnText}
        </Button>
      </div>
    </Popup>
  );
}
