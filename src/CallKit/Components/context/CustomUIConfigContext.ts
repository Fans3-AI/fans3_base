import { createContext } from 'react';
import { ICustomUIConfig } from '../../TUICallService/const';

const CustomUIConfigContext = createContext<ICustomUIConfig>({});

export default CustomUIConfigContext;
