import React, { useContext, useState, useMemo } from 'react';
import { CallStatus, CallRole, TUIGlobal } from '../../../TUICallService';
import { CallInfoContext, FocusItemContext, UserInfoContext } from '../../context';
import TopBar from '../common/TopBar/TopBar';
import ButtonPanel from '../common/ButtonPanel';
import Waiting from './Waiting/Waiting';
import MediaContainer from './MediaContainer';
import OverlayStream from '../common/OverlayStream/OverlayStream';
import { TFocusItem } from '../../context/FocusItemContext';
import { classNames } from '../../util/classnames';
import DefaultAvatarSrc from '../../assets/common/defaultAvatar.svg';
import groupCallStyle from './GroupCall.module.scss';

export default function GroupCall() {
  const { remoteList, localUserInfo } = useContext(UserInfoContext);
  const { callRole, callStatus, isFloat } = useContext(CallInfoContext);
  const [focusItem, setFocusItem] = useState<TFocusItem>(null);

  const FocusItemContextValue = useMemo(() => ({
    focusItem,
    setFocusItem,
  }), [focusItem, setFocusItem]);

  const renderTopBar = () => {
    if (!isFloat) {
      return <TopBar />;
    }

    return null;
  };
  const renderButtonPanel = () => {
    if (!isFloat) {
      return <ButtonPanel />;
    }

    return null;
  };
  const renderWaiting = () => {
    if (callStatus === CallStatus.CALLING && callRole !== CallRole.CALLER && !isFloat) {
      return <Waiting remoteList={remoteList} callRole={callRole} />;
    }

    return null;
  };

  const renderBackGround = () => {
    if (!isFloat) {
      if ((callRole !== CallRole.CALLER && callStatus === CallStatus.CONNECTED)
        || callRole === CallRole.CALLER) {
        return (
          <OverlayStream
            blur
            showAvatar={false}
            showLoading={false}
            avatar={localUserInfo.avatar || DefaultAvatarSrc}
            isMobile={!TUIGlobal.isPC}
          />
        );
      }
    }

    return null;
  };

  const classnames = classNames([
    groupCallStyle['group-container'],
    { [groupCallStyle.mobile]: !TUIGlobal.isPC },
  ]);

  return (
    <FocusItemContext.Provider value={FocusItemContextValue}>
      <div className={classnames}>
        {renderTopBar()}
        {renderWaiting()}
        {(callRole === CallRole.CALLER || callStatus === CallStatus.CONNECTED)
          && <MediaContainer />}
        {renderButtonPanel()}
        {renderBackGround()}
      </div>
    </FocusItemContext.Provider>
  );
}
