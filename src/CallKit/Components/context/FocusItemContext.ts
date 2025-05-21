import React, { createContext } from 'react';

export type TFocusItem = string | number | null;
interface IFocusItemContext {
  focusItem: TFocusItem;
  setFocusItem: React.Dispatch<TFocusItem>;
}
const FocusItemContext = createContext<IFocusItemContext>({
  focusItem: null,
  setFocusItem: () => {},
});

export default FocusItemContext;
