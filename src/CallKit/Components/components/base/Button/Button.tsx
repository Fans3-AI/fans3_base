import React, { CSSProperties, ReactNode, forwardRef } from 'react';
import { classNames } from '../../../util/classnames';
import { classPrefix } from '../../../const/common';
import Loading from '../Loading/Loading';
import './Button.scss';

interface IButtonProps {
  children?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  showText?: boolean;
  ghost?: boolean;
  loading?: boolean;
  content?: string;
  shape?: 'default' | 'cicle' | 'round';
  size?: 'large' | 'middle' | 'small';
  iconSize?: string;
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  direction?: 'horizontal' | 'vertical';
  className?: string;
  iconClassName?: string;
  isMobile?: boolean;
  style?: CSSProperties;
  isStopPropagation?: boolean;
  onClick?: (event?: any) => void;
}

const Button = forwardRef((props: IButtonProps, ref: React.ForwardedRef<any>) => {
  const {
    icon,
    iconSize,
    content,
    loading,
    children,
    showText = true,
    ghost = false,
    onClick = (event?: any) => null,
    isStopPropagation = false,
    size = 'middle',
    direction = 'vertical',
    className = '',
    iconClassName = '',
    isMobile = false,
    style,
    ...rest
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isStopPropagation) {
      event.stopPropagation();
    }

    // eslint-disable-next-line no-unused-expressions
    !loading && onClick?.(event);
  };

  const renderIconNode = () => {
    const classnames = classNames([
      `${classPrefix}-icon`,
      iconClassName,
      {
        [`${classPrefix}-size-s`]: size === 'small',
        [`${classPrefix}-size-m`]: size === 'middle',
        [`${classPrefix}-size-l`]: size === 'large',
      },
    ]);
    const iconStyle = iconSize ? { width: iconSize, height: iconSize } : {};
    return (
      <div
        className={classnames}
        onClick={handleClick}
        style={iconStyle}
      >
        {loading ? <Loading showOverlayer={false} /> : icon}
      </div>
    );
  };
  const renderChildren = () => showText && <div className={`${classPrefix}-content`}>{content || children}</div>;

  return (
    <div
      ref={ref}
      style={style}
      className={classNames([
        className,
        `${classPrefix}-btn-container`,
        {
          mobile: isMobile,
          pc: !isMobile,
          [`${classPrefix}-flex-vertical`]: direction === 'vertical',
          [`${classPrefix}-flex-horizontal`]: direction === 'horizontal',
          [`${classPrefix}-size-s`]: size === 'small',
          [`${classPrefix}-size-m`]: size === 'middle',
          [`${classPrefix}-size-l`]: size === 'large',
          [`${classPrefix}-ghost`]: ghost === true,
        },
      ])}
      {...rest}
    >
      {icon && renderIconNode()}
      {renderChildren()}
    </div>
  );
});

export default Button;
