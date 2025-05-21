import { createContext } from 'react';
import { CallStatus, CallMediaType, CallRole } from '../../TUICallService';

interface ICallInfoContext {
  callStatus?: CallStatus;
  callRole?: CallRole;
  callType?: CallMediaType;
  isEarPhone?: boolean;
  isClickable?: boolean;
  isGroupCall?: boolean;
  isFloat?: boolean;
  allowedMinimized?: boolean;
  allowedFullScreen?: boolean;
  enableVirtualBackground?: boolean;
  isShowEnableVirtualBackground?: boolean;
  isMuteSpeaker?: boolean;
}

const CallInfoContext = createContext<ICallInfoContext>({});

export default CallInfoContext;
