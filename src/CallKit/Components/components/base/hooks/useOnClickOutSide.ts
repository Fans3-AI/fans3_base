import { useEffect } from 'react';
import { useListenEvent } from './useListenerEvent';

export default function useOnClickOutSide(targetEls: any[], handler: () => any) {
  let stop = () => {};

  useEffect(() => {
    const listener = (event: Event) => {
      const targets = targetEls.map((targetEl) => targetEl?.current);
      const paths = event.composedPath();
      const rs = [];
      for (let i = 0; i < targets.length; i++) {
        rs[i] = paths.includes(targets[i]);
      }
      if (rs.every((item) => !item)) {
        handler();
      }
    };
    stop = useListenEvent('click', listener, { passive: true });
    return () => {
      stop?.();
    };
  }, [targetEls, handler]);
}
