/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useEffect, useState } from 'react';
import { TUIGlobal, CallRole } from '../../../../TUICallService';
import { IUserInfo } from '../../../../TUICallService/interface';
import Avatar from '../../base/Avatar';
import Icon from '../../base/Icon/Icon';
import OverlayStream from '../../common/OverlayStream/OverlayStream';
import CallerUserInfoContext from '../../../context/CallerUserInfoContext';
import { useTranslate } from '../../../hooks';
import defaultAvatarSrc from '../../../assets/common/defaultAvatar.svg';
import useViewBackgroundConfig from '../../../hooks/useViewBackgroundConfig';
import waitingStyle from './Waiting.module.scss';
import { classNames } from '../../../util/classnames';

interface IWaitingProps {
  remoteList: IUserInfo[];
  callRole: CallRole;
}
type TObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

export default function Waiting(props: IWaitingProps) {
  const viewBackgroundConfigObj = useViewBackgroundConfig();
  const { remoteList } = props;
  const { t } = useTranslate();
  const callerUserInfo = useContext(CallerUserInfoContext);
  const { avatar, userId, displayUserInfo } = callerUserInfo || {};
  const [showOverlayer, setShowOverlayer] = useState(!viewBackgroundConfigObj[userId]);
  const [fit, setFit] = useState<TObjectFit>(viewBackgroundConfigObj[userId] ? 'fill' : 'cover');
  const [background, setBackground] = useState(viewBackgroundConfigObj[userId] || avatar);

  useEffect(() => {
    setShowOverlayer(!viewBackgroundConfigObj[userId]);
    setFit(viewBackgroundConfigObj[userId] ? 'fill' : 'cover');
    setBackground(viewBackgroundConfigObj[userId] || avatar || defaultAvatarSrc);
  }, [viewBackgroundConfigObj, userId]);

  function WaitingH5() {
    const avatarIcon = <Icon style={{ width: '100%', height: '100%' }} url={defaultAvatarSrc} />;
    return (
      <OverlayStream
        className={classNames([
          waitingStyle['groupcall-waiting-container'],
          waitingStyle['waiting-mobile'],
        ])}
        showLoading={false}
        showAvatar
        blur
        tip={t('Invited group call')}
        showUsername
        username={displayUserInfo}
        avatar={avatar || defaultAvatarSrc}
        theme={TUIGlobal.isPC ? 'circle' : 'dot'}
        isMobile={!TUIGlobal.isPC}
        background={background}
        showOverlayer={showOverlayer}
        fit={fit}
      >
        <div className={waitingStyle['groupcall-info']}>
          <div className={waitingStyle.tip}>
            {remoteList.length}
            {t('people in the call')}
            :
          </div>
          <div className={waitingStyle['avatar-group']}>
            {remoteList?.map((item) => <Avatar key={item.userId} className={waitingStyle['avatar-item']} image={item.avatar} />)}
          </div>
        </div>
      </OverlayStream>
    );
  }
  function WaitingPC() {
    return (
      <OverlayStream
        className={waitingStyle['groupcall-waiting-container']}
        showLoading={false}
        avatar={avatar || defaultAvatarSrc}
        username={displayUserInfo}
        showAvatar={!TUIGlobal.isPC}
        isMobile={!TUIGlobal.isPC}
        tip={t('Invited group call')}
        background={background}
        showOverlayer={showOverlayer}
        fit={fit}
      />
    );
  }

  return TUIGlobal.isPC ? <WaitingPC /> : <WaitingH5 />;
}
