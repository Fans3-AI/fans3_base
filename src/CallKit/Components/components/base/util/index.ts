import React from 'react';

// Used to determine whether dom can be used
export const canUseDocument = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export function getRefDom(domRef: React.RefObject<any>) {
  if (domRef?.current && typeof domRef.current === 'object' && 'currentElement' in domRef.current) {
    return domRef.current.currentElement;
  }
  return domRef?.current;
}

export function toggleScreen(domID: string) {
  const elem = document.getElementById(domID) as HTMLElement;
  if (!document.fullscreenElement && elem) {
    elem.requestFullscreen().catch((err) => {
      console.error(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
      );
    });
  } else {
    document.exitFullscreen();
  }
}

export function noop() {}
