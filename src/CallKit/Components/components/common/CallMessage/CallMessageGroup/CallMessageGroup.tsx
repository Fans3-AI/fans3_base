import React, { useEffect, useState } from 'react';
import { TUICallKitServer } from '../../../../../TUICallService';
import { classNames } from '../../../../util/classnames';
import callMessageGroupStyle from './CallMessageGroup.module.scss';
import { ICallMessageProps } from '../CallMessage';

export default function CallMessageGroup(props: ICallMessageProps) {
  const {
    message = {},
    onClick,
  } = props;

  const [content, setContent] = useState();
  const [callType, setCallType] = useState();

  useEffect(() => {
    TUICallKitServer.getCallMessage(message).then((messageObject) => {
      const { callType, messageCardContent = '' } = messageObject || {};
      setCallType(callType);
      setContent(messageCardContent);
    });
  }, [message]);


  const callMessageContainerClassName = classNames([
    callMessageGroupStyle['message-group-container'],
    'group',
  ]);

  return (
    <div
      className={callMessageContainerClassName}
    >
      <span className={callMessageGroupStyle['call-content']}>{content}</span>
    </div>
  );
}
