import React, {
  forwardRef, useEffect, useMemo, useImperativeHandle, CSSProperties,
} from 'react';
import { createPortal } from 'react-dom';
import { AttachNode, AttachNodeReturnValue, classPrefix } from '../common';
import { canUseDocument } from '../util';

export interface PortalProps {
  /**
   * Specifies the HTML node to mount, with false being mounted on the body.
   */
  attach?: React.ReactElement | AttachNode | boolean;
  /**
   * Trigger element.
   */
  triggerNode?: HTMLElement;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: any) => any;
  style?: CSSProperties;
}

export function getAttach(attach: PortalProps['attach'], triggerNode?: HTMLElement): AttachNodeReturnValue {
  if (!canUseDocument) return null;

  let el: AttachNodeReturnValue;
  if (typeof attach === 'string') {
    el = document.querySelector(attach);
  }
  if (typeof attach === 'function') {
    el = attach(triggerNode);
  }
  if (typeof attach === 'object' && attach instanceof window.HTMLElement) {
    el = attach;
  }

  // fix el in iframe
  if (el && el.nodeType === 1) return el;

  return document.body;
}

const Portal = forwardRef((props: PortalProps, ref) => {
  const {
    attach, children, triggerNode, className, style = {},
  } = props;

  const container = useMemo(() => {
    if (!canUseDocument) return null;
    const el = document.createElement('div');
    el.className = `${classPrefix}-portal-wrapper ${className}`;
    Object.keys(style).forEach((key) => {
      el.style[key] = style[key];
    });
    return el;
  }, [classPrefix, className]);

  useEffect(() => {
    const parentElement = getAttach(attach, triggerNode);
    parentElement?.appendChild?.(container);

    return () => {
      parentElement?.removeChild?.(container);
    };
  }, [container, attach, triggerNode]);

  useImperativeHandle(ref, () => container);

  return createPortal(children, container);
});

Portal.displayName = 'Portal';

export default Portal;
