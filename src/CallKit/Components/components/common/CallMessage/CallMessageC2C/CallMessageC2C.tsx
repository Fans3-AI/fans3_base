import React, { useEffect, useState, useMemo } from 'react';
import { CallMediaType, NAME, StoreName, TUICallKitServer, TUIStore } from '../../../../../TUICallService';
import { classNames } from '../../../../util/classnames';
import { ICallMessageProps } from '../CallMessage';
import Icon from '../../../base/Icon/Icon';
import videoCallSVG from '../../../../assets/callMessage/videoCall.svg';
import audioCallSVG from '../../../../assets/callMessage/audioCall.svg';
import callMessageC2CStyle from './CallMessageC2C.module.scss';

export default function CallMessageC2C(props: ICallMessageProps) {
  const {
    message = {},
    onClick,
  } = props;

  const [contentKey, setContentKey] = useState();
  const [callMediaType, setCallMediaType] = useState();
  const [inviteeList, setInviteeList] = useState([]);
  const [t, setT] = useState<(params: any) => any>();

  function handleTranslateChange(value) {
    setT(() => value);
  }

  const watchOptions = {
    [NAME.TRANSLATE]: handleTranslateChange,
  };

  useEffect(() => {
    TUIStore.watch(
      StoreName.CALL,
      watchOptions,
      {
        notifyRangeWhenWatch: NAME.MYSELF,
      },
    );

    TUIStore.watch(StoreName.CALL, watchOptions);

    return () => {
      TUIStore.unwatch(StoreName.CALL, watchOptions);
    };
  }, []);

  useEffect(() => {
    TUICallKitServer.getCallMessage(message).then((messageObject) => {
      const { callMediaType, messageCardContent = '', inviteeList = [] } = messageObject || {};
      setCallMediaType(callMediaType);
      setContentKey(messageCardContent);
      setInviteeList(inviteeList);
    });
  }, [message]);

  const content = typeof t === 'function' ? t(contentKey) : contentKey;

  const callIcon = callMediaType === CallMediaType.AUDIO
    ? audioCallSVG
    : videoCallSVG;

  const callMessageContainerClassName = classNames([
    callMessageC2CStyle['message-c2c-container'],
    'c2c',
  ]);

  const handleClick = () => {
    typeof onClick === 'function' && onClick({ callMediaType, inviteeList });
  };

  const iconClassNames = classNames([
    callMessageC2CStyle.icon,
  ]);

  return (
    <div
      className={callMessageContainerClassName}
      onClick={handleClick}
    >
      <div className={iconClassNames}>
        <Icon url={callIcon} />
      </div>
      <span className={callMessageC2CStyle['call-content']}>{content}</span>
    </div>
  );
}
