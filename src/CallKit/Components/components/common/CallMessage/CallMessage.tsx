import { CallMediaType } from "../../../../TUICallService";
import CallMessageC2C from "./CallMessageC2C/CallMessageC2C";
import CallMessageGroup from "./CallMessageGroup/CallMessageGroup";

export interface ICallMessageProps {
  message: any;
  // TODO: switch to enum
  callType: 'C2C' | 'group';
  onClick?: (params: { callMediaType: CallMediaType, inviteeList: string[] }) => any;
}

export default function CallMessage(props: ICallMessageProps) {
  const { callType = 'C2C' } = props;

  return callType === 'C2C'
    ? <CallMessageC2C {...props} />
    : <CallMessageGroup {...props} />
}
