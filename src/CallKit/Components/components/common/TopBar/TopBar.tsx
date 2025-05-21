import React from 'react';
import TopBarH5 from './h5/TopBarH5';
import TopBarPC from './pc/TopBarPC';
import { TUIGlobal } from '../../../../TUICallService';
import useCallDuration from '../../../hooks/useCallDuration';

export default function TopBar() {
  const isMobile = !TUIGlobal.isPC;
  const callDuration = useCallDuration();

  return (
    <>
      {isMobile && <TopBarH5 callDuration={callDuration} />}
      {!isMobile && <TopBarPC callDuration={callDuration} />}
    </>
  );
}
