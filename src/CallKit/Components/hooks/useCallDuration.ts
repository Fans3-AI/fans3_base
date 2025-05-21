import { useEffect, useState } from 'react';
import { NAME, StoreName, TUIStore } from '../../TUICallService';

export default function useCallDuration() {
  const [
    callDuration,
    setCallDuration,
  ] = useState(TUIStore.getData(StoreName.CALL, NAME.CALL_DURATION));
  const handleCallDurationChange = (value) => {
    setCallDuration(value);
  };

  const watchOptions = {
    [NAME.CALL_DURATION]: handleCallDurationChange,
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
  return callDuration;
}
