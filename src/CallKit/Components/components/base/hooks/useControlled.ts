import { useState } from 'react';
import { noop } from '../util';

interface IUseControlledProps<R, K> {
  props: R
  key: K;
  onChange?: (e?: any) => any;
  defaultOptions?: any
}

export default function useControlled<R extends object, K extends keyof R>({
  props, key, onChange, defaultOptions,
}: IUseControlledProps<R, K>) {
  const controlled = Reflect.has(props, key);
  const value = props[key];
  const defaultValue = defaultOptions[key];

  const [internalValue, setInternalValue] = useState(defaultValue);

  if (controlled) {
    return [value, onChange || noop];
  }

  return [
    internalValue,
    (newValue) => {
      setInternalValue(newValue);
      onChange?.(newValue);
    },
  ];
}
