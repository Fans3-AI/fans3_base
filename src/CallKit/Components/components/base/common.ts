import { ReactNode } from 'react';

export const classPrefix = 'tk';

export type CSSSelector = string;
export type AttachNodeReturnValue = HTMLElement | Element | Document;
export type AttachNode = CSSSelector | ((triggerNode?: HTMLElement) => AttachNodeReturnValue);

export type TNode<T = undefined> = T extends undefined
  ? ReactNode
  : ReactNode | ((props: T) => ReactNode);

export type Visibility = 'visible' | 'hidden';
