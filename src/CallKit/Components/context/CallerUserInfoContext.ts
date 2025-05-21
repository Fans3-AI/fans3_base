import { createContext } from 'react';

interface ICallerUserInfoContext {
  avatar?: string;
  userId?: string;
  displayUserInfo?: string;
}

const CallerUserInfoContext = createContext<ICallerUserInfoContext>({});

export default CallerUserInfoContext;
