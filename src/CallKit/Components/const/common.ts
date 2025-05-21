import { FunctionComponent } from 'react';

export const classPrefix = 'tk';

export type TButton = {
  component: FunctionComponent,
  name: string,
  props: {
    show: boolean,
    [key: string]: any,
  },
};

export type TButtons = TButton[][];

export type TObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
