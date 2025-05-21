import { createContext } from 'react';
import { IUserInfo } from '../../TUICallService/interface';

const UserInfoContext = createContext<{ localUserInfo: IUserInfo, remoteList: IUserInfo[] }>({
  localUserInfo: { userId: '' },
  remoteList: [],
});

export default UserInfoContext;
