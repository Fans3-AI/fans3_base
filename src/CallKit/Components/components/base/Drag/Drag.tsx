import React, { CSSProperties, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { TUIGlobal } from '../../../../TUICallService';

type TPosition = Pick<CSSProperties, 'left' | 'top' | 'right' | 'bottom'>;
interface IDraggableProps {
  nodeRef?: MutableRefObject<HTMLElement>;
  disable?: boolean;
  initialPosition?: TPosition;
  style?: CSSProperties;
  onMoveStart?: () => void;
  onMoveEnd?: () => void;
  onPositionChange?: (params: TPosition) => void;
  children?: any;
}

const EventsFor = {
  touch: {
    start: 'onTouchStart',
    move: 'touchmove',
    stop: 'touchend',
  },
  mouse: {
    start: 'onMouseDown',
    move: 'mousemove',
    stop: 'mouseup',
  },
};
const pointerEvents = EventsFor[TUIGlobal.isH5 ? 'touch' : 'mouse'];

function getClientXY(e) {
  if (TUIGlobal.isH5) {
    e = e.touches[0];
  }

  return { clientX: e.clientX, clientY: e.clientY };
}

export default function Draggable(props: IDraggableProps) {
  const {
    nodeRef,
    children,
    onMoveStart,
    onMoveEnd,
    onPositionChange,
    initialPosition = { left: '0px', top: '0px' },
  } = props;
  const isMoving = useRef(false);
  const boundSize = useRef<any>({});
  const positionRef = useRef({ left: 0, top: 0 });
  const [position, setPosition] = useState(initialPosition);
  const [currentPosition, setCurrentPosition] = useState<TPosition>();
  useEffect(() => {
    return () => {
      if (nodeRef.current) {
        nodeRef.current.ownerDocument.removeEventListener(pointerEvents.move, onMove);
        nodeRef.current.ownerDocument.removeEventListener(pointerEvents.stop, onStop);
      }
    }
  }, [nodeRef.current]);

  const getBoundSize = (e) => {
    const { clientX, clientY } = getClientXY(e);
    const oW = clientX - nodeRef.current?.getBoundingClientRect().left;
    const oH = clientY - nodeRef.current?.getBoundingClientRect().top;
    const htmlWidth = document.documentElement.clientWidth;
    const htmlHeight = document.documentElement.clientHeight;
    const bWidth = nodeRef.current.offsetWidth;
    const bHeight = nodeRef.current.offsetHeight;

    return { oW, oH, htmlWidth, htmlHeight, bWidth, bHeight };
  };
  const getPosition = (e) => {
    const { clientX, clientY } = getClientXY(e);
    const left = clientX - boundSize.current.oW;
    const top = clientY - boundSize.current.oH;

    return { left, top };
  };
  const onStart = (e) => {
    isMoving.current = true;
    boundSize.current = getBoundSize(e);
    positionRef.current = getPosition(e);
    setPosition({ left: '0px', top: '0px' });

    nodeRef.current.ownerDocument.addEventListener(pointerEvents.move, onMove);
    nodeRef.current.ownerDocument.addEventListener(pointerEvents.stop, onStop);
  };
  const onDragMove = (e) => {
    onMoveStart?.();
    let { left, top } = getPosition(e);

    if (left < 0) {
      left = 0;
    } else if (left > boundSize.current.htmlWidth - boundSize.current.bWidth) {
      left = boundSize.current.htmlWidth - boundSize.current.bWidth;
    }

    if (top < 0) {
      top = 0;
    } else if (top > boundSize.current.htmlHeight - boundSize.current.bHeight) {
      top = boundSize.current.htmlHeight - boundSize.current.bHeight;
    }

    positionRef.current = { left, top };
    onPositionChange?.({ left, top });
    setCurrentPosition({ left, top });
  };
  const onMove = (e) => {
    isMoving.current && onDragMove(e)
  };
  const onStop = (e) => {
    isMoving.current = false;
    let left = positionRef.current.left;
    // @ts-ignore
    if (left < (boundSize.current.htmlWidth - boundSize.current.bWidth) / 2) {
      left = 0;
    } else {
      left = boundSize.current.htmlWidth - boundSize.current.bWidth;
    }

    positionRef.current = TUIGlobal.isH5 ? { left, top: positionRef.current.top } : { left: positionRef.current.left, top: positionRef.current.top };

    setTimeout(() => {
      onMoveEnd?.();
    }, 0);

    nodeRef.current.ownerDocument.removeEventListener(pointerEvents.move, onMove);
    nodeRef.current.ownerDocument.removeEventListener(pointerEvents.stop, onStop);
  };

  const transform = useMemo(() =>
    `translate(${positionRef.current.left}px, ${positionRef.current.top}px)`,
    [positionRef.current],
  );

  return (
    <>
     {
      React.cloneElement(children, {
        style: {
          ...(children?.props?.style || {}),
          position: 'absolute',
          zIndex: 999,
          touchAction: 'none',
          ...position,
          transform,
          userSelect: 'none',
          WebkitUserSelect: 'none',
        },
        [pointerEvents.start]: onStart,
      })
     }
    </>
  );
}
