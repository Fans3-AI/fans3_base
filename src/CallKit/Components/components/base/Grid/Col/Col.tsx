import React, { CSSProperties, ReactNode, useContext } from 'react';
import { classNames } from '../../../../util/classnames';
import { RowContext } from '../Row';
import { classPrefix } from '../../../../const/common';
import './Col.scss';

interface IColProps {
  children?: ReactNode;
  span?: number;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end';
  style?: CSSProperties;
}
export default function Col(props: IColProps) {
  const {
    span = 12,
    children,
    style = {},
    justify = 'center',
    align = 'start',
  } = props;
  const { gutter } = useContext(RowContext);

  const classnames = classNames([
    `${classPrefix}-col-container`,
    `${classPrefix}-col-${span}`,
    `${classPrefix}-col-justify-content-${justify}`,
    `${classPrefix}-col-align-items-${align}`,
  ]);

  const calcColStyle = () => {
    if (typeof gutter === 'number') {
      return {
        paddingLeft: `${gutter / 2}px`,
        paddingRight: `${gutter / 2}px`,
      };
    }
  };

  const colStyle = calcColStyle();

  return (
    <div
      className={classnames}
      style={{ ...colStyle, ...style }}
    >
      {children}
    </div>
  );
}

Col.displayName = 'Col';
