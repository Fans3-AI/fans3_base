import { createContext } from 'react';
import { NAME, StoreName, TUIStore } from '../../TUICallService';

const TranslateContext = createContext({ t: TUIStore.getData(StoreName.CALL, NAME.TRANSLATE) });

export default TranslateContext;
