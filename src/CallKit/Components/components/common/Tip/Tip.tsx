import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import { Message } from '../../base/Message/Message';
import { classNames } from '../../../util/classnames';
import { useTranslate } from '../../../hooks';
import { NAME, StoreName, TUIStore } from '../../../../TUICallService';

interface ITipProps {
  className?: string;
  style?: CSSProperties;
}

export default function Tip(props: ITipProps) {
  const { className, style } = props;
  const [tip, setTip] = useState(null);
  const [show, setShow] = useState(true);
  const [showDuration, setShowDuration] = useState(0);
  const { t } = useTranslate();
  const classnames = classNames([
    className,
  ]);

  function handleCallTipsChange(value) {
    if (typeof value === 'object') {
      const { text = '', duration = 0 } = value;
      setTip(text);
      setShowDuration(duration);
    } else {
      setTip(value);
    }
  }

  const messageContent = useMemo(() => {
    if (typeof t === 'function' && tip !== null) {
      return t(tip);
    }
  }, [t, tip]);

  useEffect(() => {
    TUIStore.watch(
      StoreName.CALL,
      {
        [NAME.CALL_TIPS]: handleCallTipsChange,
      },
      {
        notifyRangeWhenWatch: NAME.MYSELF,
      },
    );

    return () => {
      TUIStore.unwatch(
        StoreName.CALL,
        {
          [NAME.CALL_TIPS]: handleCallTipsChange,
        },
      );
    };
  }, []);

  return (
    <div className={classnames} style={style}>
      {show && (
      <Message style={{ whiteSpace: 'nowrap' }} duration={showDuration} onClose={() => setShow(false)} plaintext>
        {messageContent}
      </Message>
      )}
    </div>
  );
}
