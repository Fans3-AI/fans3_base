import React from 'react';
import { TUIGlobal } from '../../../../TUICallService';
import StreamInfoH5 from './StreamInfoH5/StreamInfoH5';
import StreamInfoPC from './StreamInfoPC/StreamInfoPC';

export default function StreamInfo(props: any) {
  return TUIGlobal.isPC
    ? <StreamInfoPC {...props} />
    : <StreamInfoH5 {...props} />;
}
