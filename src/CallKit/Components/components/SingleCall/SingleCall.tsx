import React, { useContext, useEffect } from 'react';
import { CallStatus, TUIGlobal } from '../../../TUICallService';
import TopBar from '../common/TopBar/TopBar';
import ButtonPanel from '../common/ButtonPanel';
import Waiting from './Waiting/Waiting';
import { CallInfoContext, UserInfoContext } from '../../context';
import MediaContainer from './MediaContainer';
import { classNames } from '../../util/classnames';
import Tip from '../common/Tip/Tip';
import singleCallStyle from './SingleCall.module.scss';

const SingleCall = React.memo(() => {
  const { remoteList } = useContext(UserInfoContext);
  const { callRole, callStatus, isFloat } = useContext(CallInfoContext);

  const classnames = classNames([
    singleCallStyle['single-container'],
    { [singleCallStyle.mobile]: !TUIGlobal.isPC },
  ]);

  const renderTopBar = () => {
    if (!isFloat) {
      return <TopBar />;
    }
  };
  const renderWaiting = () => {
    if (callStatus === CallStatus.CALLING && !isFloat) {
      return (
        <Waiting
          avatar={remoteList?.[0]?.avatar}
          username={remoteList?.[0]?.displayUserInfo}
          callRole={callRole}
          userId={remoteList?.[0]?.userId}
        />
      );
    }
  };
  const renderButtonPanel = () => {
    if (!isFloat) {
      return <ButtonPanel />;
    }
  };

  return (
    <div className={classnames}>
      {renderTopBar()}
      {renderWaiting()}
      <MediaContainer />
      <Tip className={singleCallStyle['singlecall-tip']} />
      {renderButtonPanel()}
    </div>
  );
});

export default SingleCall;
