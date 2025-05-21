import React, { CSSProperties } from 'react';
import { classNames } from '../../../../util/classnames';
import { classPrefix } from '../../../../const/common';
import './GridPlusItem.scss';

interface IGridPlusItemProps {
  index: number;
  className?: string;
  style?: CSSProperties;
  updateFocusItem?: (index?: number) => any;
  children?: any;
}

function GridPlusItem(props: IGridPlusItemProps) {
  const {
    index, children, className, style, updateFocusItem,
  } = props;

  const classnames = classNames([
    `${classPrefix}-gridplus-item-container`,
    className,
  ]);

  return (
    <div
      className={classnames}
      onClick={() => updateFocusItem?.(index)}
      style={{ gridArea: `gridplus-item-${index}`, ...style }}
    >
      {children}
    </div>
  );
}

GridPlusItem.displayname = 'GridPlusItem';

export default GridPlusItem;
