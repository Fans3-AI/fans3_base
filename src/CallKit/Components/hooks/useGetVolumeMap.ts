import { useEffect, useState } from 'react';
import { isEqual } from 'lodash-es';
import { NAME, StoreName, TUIStore } from '../../TUICallService';

export default function useGetVolumeMap() {
  const [
    localUserInfoIncludeVolumn,
    setLocalUserInfoIncludeVolumn,
  ] = useState(TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO));
  const [
    remoteListIncludeVolumn,
    setRemoteListIncludeVolumn,
  ] = useState(TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST));
  const [volumnMap, updateVolumnMap] = useState<{ [key: string]: number }>({});
  const handleLocalUserInfoIncludeVolumnChange = (value) => {
    if (localUserInfoIncludeVolumn.volume !== value.volume) {
      setLocalUserInfoIncludeVolumn(value);
    }
  };
  const handleRemoteUserInfoIncludeVolumnListChange = (value) => {
    if (value.length !== remoteListIncludeVolumn.length) {
      setRemoteListIncludeVolumn(value);
      return;
    }

    if (!isEqual(value, remoteListIncludeVolumn)) {
      setRemoteListIncludeVolumn(value);
    }
  };

  const watchOptions = {
    [NAME.LOCAL_USER_INFO]: handleLocalUserInfoIncludeVolumnChange,
    [NAME.REMOTE_USER_INFO_LIST]: handleRemoteUserInfoIncludeVolumnListChange,
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
  }, [watchOptions]);

  useEffect(() => {
    const rs: { [key: string]: number } = {};
    [localUserInfoIncludeVolumn, ...remoteListIncludeVolumn].forEach(item => {
      if (item.isAudioAvailable) {
        rs[item.domId] = item.volume;
      }
    });
    if (Object.keys(rs).length === 0) {
      return;
    }
    updateVolumnMap(rs);
  }, [localUserInfoIncludeVolumn, remoteListIncludeVolumn]);

  return volumnMap;
}
