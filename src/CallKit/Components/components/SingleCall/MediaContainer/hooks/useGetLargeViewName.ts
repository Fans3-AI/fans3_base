import React, { useContext, useState, useEffect } from 'react';
import { CallInfoContext, CustomUIConfigContext, UserInfoContext } from '../../../../context';
import { CallStatus, LayoutMode, ViewName } from '../../../../../TUICallService/const';

export default function useGetLargeViewName() {
  const { layoutMode } = useContext(CustomUIConfigContext);
  const { remoteList } = useContext(UserInfoContext);
  const { callStatus } = useContext(CallInfoContext);
  const [largeViewName, setLargeViewName] = useState(ViewName.LOCAL);

  useEffect(() => {
    if (callStatus === CallStatus.CALLING) {
      return;
    }

    const c2cLayoutModes = [LayoutMode.RemoteInLargeView, LayoutMode.LocalInLargeView];
    if (c2cLayoutModes.includes(layoutMode)) {
      // @ts-ignore
      setLargeViewName(layoutMode);
      return;
    }

    if (remoteList?.[0]?.isEnter) {
      setLargeViewName(ViewName.REMOTE);
    }
  }, [remoteList, layoutMode, callStatus]);

  return [largeViewName, setLargeViewName] as const;
}
