import React, {
  ReactNode, useCallback, useEffect, useRef, useState, forwardRef,
} from 'react';
import { usePopper } from 'react-popper';
import Portal from '../Portal/Portal';
import { classPrefix } from '../common';
import { classNames } from '../../../util/classnames';
import useMutationObserver from '../hooks/useMutationObserver';
import useOnClickOutSide from '../hooks/useOnClickOutSide';
import useControlled from '../hooks/useControlled';
import useTrigger from './hooks/useTrigger';
import './Popup.scss';

interface IPopupProps {
  content?: ReactNode;
  onVisibleChange?: (r: any) => any;
  children: any;
  visible?: boolean;
  trigger?: 'hover' | 'click';
  disabled?: boolean;
  teleported?: boolean;
}

const Popup = forwardRef((props: IPopupProps, ref: any) => {
  const {
    children, content, trigger = 'hover', disabled = false, teleported = true,
  } = props;
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const contentRef = useRef(null); // The content section.
  //@ts-ignore
  const updateTimeRef = useRef<any>();
  const popupRef = useRef(null);
  const { styles } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    placement: 'top',
  });

  const [visible, onVisibleChange] = useControlled({
    props,
    key: 'visible',
    onChange: props.onVisibleChange,
    defaultOptions: { visible: false },
  });
  useOnClickOutSide([popupRef], () => visible && onVisibleChange(false));
  const {
    getTriggerNode, getPopupProps,
  } = useTrigger({
    trigger, disabled, visible, onVisibleChange,
  });
  // Listens for changes in the trigger node to dynamically update the position of the popup.
  const cb = useCallback(() => {
    clearTimeout(updateTimeRef.current);
    updateTimeRef.current = setTimeout(() => popperElement?.update?.(), 0);
  }, [popperElement, styles]);
  useMutationObserver(referenceElement, cb);
  useEffect(() => () => clearTimeout(updateTimeRef.current), []);

  const triggerNode = React.cloneElement(getTriggerNode(children), { ref: setReferenceElement });

  const overlayContent = (
    <div style={{ ...styles.popper, paddingBottom: '10px' }} ref={setPopperElement} {...getPopupProps()}>
      <div
        ref={contentRef}
        className={classNames(
          `${classPrefix}-popup__content`,
        )}
      >
        {content}
      </div>
      <div ref={arrowElement} style={styles.arrow} className={`${classPrefix}-popup__arrow`} />
    </div>
  );

  const overlay = teleported ? (
    <Portal>
      {overlayContent}
    </Portal>
  ) : (
    overlayContent
  );

  return (
    <div ref={popupRef}>
      {triggerNode}
      {visible && overlay}
    </div>
  );
});

export default Popup;
