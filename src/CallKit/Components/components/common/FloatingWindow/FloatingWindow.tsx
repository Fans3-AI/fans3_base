import React, { ReactNode, useContext, useRef, useState } from 'react';
import { CallInfoContext } from '../../../context';
import FloatingWindowGroupCall from './FloatingWindowGroupCall/FloatingWindowGroupCall';
import FloatingWindowSingleCall from './FloatingWindowSingleCall/FloatingWindowSingleCall';
import Drag from '../../base/Drag/Drag';

interface IFloatingWindowProps {
  showVideo?: boolean;
  hasVideo?: boolean;
  children?: ReactNode;
  isAudioAvailable?: boolean;
  show?: boolean;
}

export default function FloatingWindow(props: IFloatingWindowProps) {
  const { isGroupCall } = useContext(CallInfoContext);
  //@ts-ignore
  const nodeRef = useRef<any>();
  const [clickable, setClickable] = useState(true);
  const visibility: any = props.show ? '' : 'hidden';

  return (
    <Drag
      nodeRef={nodeRef}
      initialPosition={{ right: '0px', top: '100px' }}
      onMoveStart={() => setClickable(false)}
      onMoveEnd={() => setClickable(true)}
    >
      <div ref={nodeRef} style={{ visibility }}>
        {
          isGroupCall
            ? <FloatingWindowGroupCall clickable={clickable} {...props} />
            : <FloatingWindowSingleCall clickable={clickable} {...props} />
        }
      </div>
    </Drag>
  );
}
