import { useRef, useEffect } from 'react';

const DEFAULT_OPTIONS = {
  debounceTime: 0,
  config: {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  } as MutationObserverInit,
};

export default function useMutationObservable(
  targetEl: HTMLElement | null,
  cb: MutationCallback,
  options = DEFAULT_OPTIONS,
) {
  const observeRef = useRef(null);
  useEffect(() => {
    if (!cb || typeof cb !== 'function') return;
    const { debounceTime } = options;
    observeRef.current = new MutationObserver(cb);
  }, [cb, options]);

  useEffect(() => {
    if (!targetEl || !targetEl?.nodeType) return;
    const { config } = options;
    try {
      observeRef.current.observe(targetEl, config);
    } catch (e) {
      console.error(e);
    }

    return () => {
      observeRef.current.disconnect();
    };
  }, [targetEl, options]);
}
