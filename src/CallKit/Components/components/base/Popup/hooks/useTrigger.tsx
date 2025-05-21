import React, { isValidElement, useRef } from 'react';

export default function useTrigger({
  trigger, visible, disabled, onVisibleChange,
}) {
  const visibleTimer = useRef<any>(null);

  function getPopupProps(): any {
    if (disabled) return {};

    return {
      onMouseEnter: () => {
        if (trigger === 'hover') {
          clearTimeout(visibleTimer.current);
          onVisibleChange(true);
        }
      },
      onMouseLeave: () => {
        if (trigger === 'hover') {
          clearTimeout(visibleTimer.current);
          onVisibleChange(false);
        }
      },
    };
  }
  function getTriggerProps(triggerNode) {
    if (disabled) return {};

    const triggerProps: any = {
      onClick: (e) => {
        if (trigger === 'click') {
          onVisibleChange(!visible);
        }

        triggerNode.props?.onClick?.(e);
      },
      onTouchStart: () => {
        if (trigger === 'hover') {
          onVisibleChange(true);
        }
      },
      onMouseEnter: () => {
        if (trigger === 'hover') {
          onVisibleChange(true);
        }
      },
      onMouseLeave: () => {
        if (trigger === 'hover') {
          onVisibleChange(false);
        }
      },
    };

    return triggerProps;
  }

  function getTriggerNode(children) {
    const triggerNode = isValidElement(children) ? children : <span className='t-trigger'>{children}</span>;
    const triggerProps = getTriggerProps(triggerNode);

    return React.cloneElement(triggerNode, triggerProps);
  }
  return {
    getTriggerNode,
    getPopupProps,
  };
}
