import React, { useContext } from 'react';
import { classPrefix } from '../../../../const/common';
import { classNames } from '../../../../util/classnames';
import { ToggleWindowContext } from '../ToggleWindow';
import { Visibility } from '../../common';
import './ToggleWindowItem.scss';

interface IToggleWindowItem {
  value?: string;
  isMobile?: boolean;
  children?: any;
  className?: string;
  updateBigWindow?: () => any;
  showSmallWindow?: boolean;
}

export default function ToggleWindowItem(props: IToggleWindowItem) {
  const {
    children, value, isMobile, updateBigWindow, showSmallWindow, className,
  } = props;
  const { bigWindow } = useContext(ToggleWindowContext);
  const isSmallWindow = bigWindow !== value;
  const classnames = classNames([
    className,
    `${classPrefix}-togglewindowitem-container`,
    `${classPrefix}-togglewindowitem-${isSmallWindow ? 'small' : 'big'}`,
    { mobile: isMobile },
  ]);

  const render = () => {
    let visibility: Visibility;

    if (!showSmallWindow && isSmallWindow) {
      visibility = 'hidden';
    }

    return (
      <div
        onClick={() => isSmallWindow && updateBigWindow()}
        className={classnames}
        style={{ visibility }}
      >
        {children}
      </div>
    );
  };
  return <>{render()}</>;
}

ToggleWindowItem.displayName = 'ToggleWindowItem';
