import { useEffect, useState } from 'react';
import { NAME, StoreName, TUIStore } from '../../TUICallService';
import { DeviceType } from '../../TUICallService/const';

const useDeviceList = (deviceType: DeviceType) => {
  const [deviceList, setDeviceList] = useState<any[]>([]);
  const [currentDeviceId, setCurrentDeviceId] = useState<string>();
  const handleDeviceListChange = (value: any) => {
    switch (deviceType) {
      case DeviceType.CAMERA:
        setDeviceList(value?.cameraList || []);
        setCurrentDeviceId(value?.currentCamera?.deviceId || '');
        break;

      case DeviceType.MICROPHONE:
        setCurrentDeviceId(value?.currentMicrophone?.deviceId || '');
        setDeviceList(value?.microphoneList || []);
        break;

      case DeviceType.SPEAKER:
        setCurrentDeviceId(value?.currentSpeaker?.deviceId || '');
        setDeviceList(value?.speakerList || []);
        break;

      default:
        break;
    }
  };

  const watchOptions = {
    [NAME.DEVICE_LIST]: handleDeviceListChange,
  };

  useEffect(() => {
    TUIStore.watch(
      StoreName.CALL,
      watchOptions,
      {
        notifyRangeWhenWatch: NAME.MYSELF,
      },
    );

    return () => {
      TUIStore.unwatch(
        StoreName.CALL,
        watchOptions,
      );
    };
  }, []);
  return [{ deviceList, currentDeviceId }, { setCurrentDeviceId }] as const;
};

export default useDeviceList;
