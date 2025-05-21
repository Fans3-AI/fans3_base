/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  useMemo, useState, createContext, useEffect,
} from 'react';
import { classNames } from '../../../util/classnames';
import { classPrefix } from '../../../const/common';
import './ToggleWindow.scss';

function getNonSpecifiedElement<T>(array: T[], specified: T) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== specified) {
      return array[i];
    }
  }
}

export const ToggleWindowContext = createContext({ bigWindow: null });
interface IToggleWindowProps {
  bigWindow: string;
  className?: string;
  isMobile?: boolean;
  showSmallWindow?: boolean;
  children?: any;
  onToggle?: (r?: any) => any;
}
export function ToggleWindow(props: IToggleWindowProps) {
  const {
    bigWindow: initBigWindow,
    className,
    isMobile,
    showSmallWindow = true,
    onToggle,
    children = null,
  } = props;
  const [bigWindow, setBigWindow] = useState(initBigWindow);

  useEffect(() => {
    setBigWindow(initBigWindow);
  }, [initBigWindow]);

  const classnames = classNames([
    `${classPrefix}-togglewindow-container`,
    className,
  ]);

  const filterChildren = useMemo(() => {
    const toggleWindowChildren: any[] = [];
    const values: string[] = [];

    if (children) {
      React.Children.map(children, (child) => {
        if (child?.type?.displayName === 'ToggleWindowItem' && toggleWindowChildren.length < 2) {
          // @ts-ignore
          toggleWindowChildren.push(React.cloneElement(child, { isMobile, showSmallWindow }));
          values.push(child?.props?.value);
        }

        if (toggleWindowChildren.length >= 2) {
          return null;
        }
      });
    }

    const updateBigWindow = () => {
      setBigWindow((state) => {
        const result = getNonSpecifiedElement<string>(values, state);
        onToggle?.(result);
        return result;
      });
    };
    return toggleWindowChildren.map(
      (child) => React.cloneElement(child, { updateBigWindow }),
    );
  }, [children]);

  return (
    <div className={classnames}>
      <ToggleWindowContext.Provider value={{ bigWindow }}>
        {filterChildren}
      </ToggleWindowContext.Provider>
    </div>
  );
}
