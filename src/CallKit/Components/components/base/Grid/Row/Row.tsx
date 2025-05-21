import React, { CSSProperties, createContext, useMemo } from 'react';
import { classNames } from '../../../../util/classnames';
import { classPrefix } from '../../../../const/common';
import './Row.scss';

interface IRowProps {
  className?: string;
  children?: any;
  gutter?: number | Array<number>;
  justify?: 'left' | 'center' | 'right';
  style?: CSSProperties;
}

export const RowContext = createContext<{ gutter?: number | number[] }>({ gutter: undefined });

export default function Row(props: IRowProps) {
  const {
    className = '',
    children = [],
    gutter,
    style,
    justify = 'center',
  } = props;

  const RowContextValue = useMemo(() => ({ gutter }), [gutter]);

  const classnames = classNames([
    `${classPrefix}-row-container`,
    `${classPrefix}-row-justify-${justify}`,
    className,
  ]);

  const renderCols = () => {
    const childrenLen = children?.length || 0;

    if (childrenLen < 2) {
      return children;
    }
    return React.Children.map(children, (child) => {
      if (child?.type?.displayName === 'Col') {
        return child;
      }
    });
  };

  return (
    <div className={classnames} style={style}>
      <RowContext.Provider value={RowContextValue}>{renderCols()}</RowContext.Provider>
    </div>
  );
}
