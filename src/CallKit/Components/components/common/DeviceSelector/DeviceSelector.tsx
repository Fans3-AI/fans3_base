import React, { useContext } from 'react';
import { DeviceType } from '../../../../TUICallService/const';
import { useTranslate, useDeviceList } from '../../../hooks';
import { TUICallKitServer } from '../../../../TUICallService';
import { classNames } from '../../../util/classnames';
import { UserInfoContext, CallInfoContext } from '../../../context';
import deviceSelectorStyle from './DeviceSelector.module.scss';

interface IDeviceSelectorProps {
  deviceType?: DeviceType;
  isShowControlBtn?: boolean;
}

export default function DeviceSelector(props: IDeviceSelectorProps) {
  const { deviceType, isShowControlBtn = true } = props;
  const { localUserInfo } = useContext(UserInfoContext);
  const { isMuteSpeaker } = useContext(CallInfoContext);
  const [{ deviceList, currentDeviceId }, { setCurrentDeviceId }] = useDeviceList(deviceType);
  const { t } = useTranslate(); 
  const controlBtnClassName = classNames([
    deviceSelectorStyle['device-item'],
    deviceSelectorStyle['control-item'],
  ]);
  const handleClickDeviceItem = async (deviceId: string) => {
    try {
      await TUICallKitServer.switchDevice({
        deviceType,
        deviceId,
      });
      setCurrentDeviceId(deviceId);
    } catch (err) {
      console.debug(err);
    }
  };
  const switchStatus = async () => {
    if (deviceType === DeviceType.CAMERA) {
      if (localUserInfo?.isVideoAvailable) {
        await TUICallKitServer.closeCamera();
      } else {
        await TUICallKitServer.openCamera('localVideo');
      }
    }

    if (deviceType === DeviceType.MICROPHONE) {
      if (localUserInfo?.isAudioAvailable) {
        await TUICallKitServer.closeMicrophone();
      } else {
        await TUICallKitServer.openMicrophone();
      }
    }

    if (deviceType === DeviceType.SPEAKER) {
      if (isMuteSpeaker) {
        await TUICallKitServer.unMuteSpeaker();
      } else {
        await TUICallKitServer.muteSpeaker();
      }
    }
  };
  const DeviceText = () => {
    if (deviceType === DeviceType.CAMERA) {
      return localUserInfo?.isVideoAvailable ? t('close camera') : t('open camera');
    }

    if (deviceType === DeviceType.MICROPHONE) {
      return localUserInfo?.isAudioAvailable ? t('close microphone') : t('open microphone');
    }

    if (deviceType === DeviceType.SPEAKER) {
      return isMuteSpeaker ? t('open speaker') : t('close speaker');
    }
  };
  function renderDeviceList() {
    if (deviceList?.length > 0) {
      return deviceList?.map((device) => {
        const { deviceId, label } = device;
        return (
          <div
            className={classNames([
              deviceSelectorStyle['device-item'],
              { [deviceSelectorStyle.select]: currentDeviceId === deviceId },
            ])}
            key={deviceId}
            onClick={() => handleClickDeviceItem(deviceId)}
          >
            {label}
          </div>
        );
      });
    }
    return <div className={deviceSelectorStyle['device-item']}>{t('failed to obtain speakers')}</div>;
  }

  return (
    <div className={deviceSelectorStyle['device-selector-container']}>
      <div className={deviceSelectorStyle['scroll-container']}>
        <div className={deviceSelectorStyle['scroll-content']}>
          {renderDeviceList()}
        </div>
      </div>
      {isShowControlBtn
        && <div onClick={switchStatus} className={controlBtnClassName}>{DeviceText()}</div>}
    </div>
  );
}
