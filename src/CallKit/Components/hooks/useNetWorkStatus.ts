import { useEffect, useState } from 'react';
import { NAME, StoreName, TUIStore } from '../../TUICallService';

export default function useNetWorkStatus() {
  const [
    netWorkQualityList,
    setNetWorkQualityList,
  ] = useState(TUIStore.getData(StoreName.CALL, NAME.NETWORK_STATUS));
  const handleNetWorkStatusChange = (value) => {
    setNetWorkQualityList(value);
  };

  const watchOptions = {
    [NAME.NETWORK_STATUS]: handleNetWorkStatusChange,
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
  return netWorkQualityList;
}
