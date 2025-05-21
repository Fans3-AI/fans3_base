import React, {
  CSSProperties, ReactNode, useEffect, useRef,
} from 'react';
import { classNames } from '../../../util/classnames';
import { classPrefix } from '../../../const/common';
import Icon from '../Icon/Icon';
import CloseSrc from '../../../assets/base/close.svg';
import MessageInfoIcon from './MessageIcon/Info';
import MessageErrorIcon from './MessageIcon/Error';
import MessageSuccessIcon from './MessageIcon/Success';
import MessageWarningIcon from './MessageIcon/Warning';
import './Message.scss';

const IconSrcMap = {
  info: <MessageInfoIcon />,
  waring: <MessageWarningIcon />,
  success: <MessageSuccessIcon />,
  error: <MessageErrorIcon />,
};

export interface IMessageProps {
  icon?: ReactNode;
  showIcon?: boolean;
  duration?: number;
  theme?: 'info' | 'waring' | 'success' | 'error';
  closeBtn?: ReactNode | boolean;
  showCloseBtn?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  plaintext?: boolean;
  onClose?: () => any;
}

export function Message(props: IMessageProps) {
  const {
    icon,
    showIcon = true,
    duration = 3000,
    theme = 'info',
    style,
    closeBtn,
    showCloseBtn,
    className,
    children,
    plaintext = false,
    onClose = () => null,
  } = props;
  //@ts-ignore
  const timer = useRef<any>();
  const classnames = classNames([
    className,
    `${classPrefix}-message-container`,
    { [`${classPrefix}-message-plaintext`]: plaintext },
  ]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    if (duration > 0) {
      timer.current = setTimeout(() => {
        onClose?.();
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer.current);
    };
  }, [duration, onClose]);

  const renderIcon = () => (icon || (
    <>
      { IconSrcMap[theme] }
    </>
  ));

  const renderCloseIcon = () => (closeBtn || (
    <Icon
      onClick={onClose}
      className={classNames([
        `${classPrefix}-message-icon`,
        'close-icon',
      ])}
      url={CloseSrc}
    />
  ));

  return (
    <div className={classnames} style={style}>
      {(showIcon && !plaintext) && renderIcon()} 
      {children}
      {(showCloseBtn && !plaintext) && renderCloseIcon()}
    </div>
  );
}
