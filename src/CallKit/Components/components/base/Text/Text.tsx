import React from 'react';
import { classNames } from '../../../util/classnames';
import { classPrefix } from '../common';
import './Text.scss';

interface IText {
  maxWidth?: string;
  truncated?: boolean;
  lineClamp?: number;
  className?: string;
  children?: any;
}

export default function Text(props: IText) {
  const {
    maxWidth, truncated, lineClamp, children, className,
  } = props;

  const classnames = classNames([
    className,
    `${classPrefix}-text`,
  ]);

  const style = {
    maxWidth,
    textOverflow: truncated ? 'ellipsis' : 'auto',
    WebkitLineClamp: lineClamp,
  };
  return <span style={style} className={classnames}>{children}</span>;
}
