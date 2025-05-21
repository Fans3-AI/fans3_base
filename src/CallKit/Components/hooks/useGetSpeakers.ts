import { useEffect, useState } from 'react';
import { isEqual } from 'lodash-es';
import { NAME, StoreName, TUIStore } from '../../TUICallService';

const MIN_VOLUMN_THRESHOLD = 10;

export default function useGetSpeakers() {
  const [
    localUserInfoIncludeVolumn,
    setLocalUserInfoIncludeVolumn,
  ] = useState(TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO));
  const [
    remoteListIncludeVolumn,
    setRemoteListIncludeVolumn,
  ] = useState(TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST));
  const [speakerList, updateSpeakerList] = useState([]);
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
  }, []);

  useEffect(() => {
    const rs = [];
    [localUserInfoIncludeVolumn, ...remoteListIncludeVolumn].forEach(item => {
      if (item.isAudioAvailable && item.volume >= MIN_VOLUMN_THRESHOLD) {
        rs.push(item.domId);
      }
    });
    if (rs.length === 0 && speakerList.length === 0) {
      return;
    }
    updateSpeakerList(rs);
  }, [localUserInfoIncludeVolumn, remoteListIncludeVolumn]);

  return speakerList;
}
