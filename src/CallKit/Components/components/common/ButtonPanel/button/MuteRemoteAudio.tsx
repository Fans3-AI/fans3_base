import React, { useMemo, useState, useContext } from "react";
import Button from "../../../base/Button";
import Icon from '../../../base/Icon/Icon';
import { classNames } from '../../../../util/classnames';
import { classPrefix } from '../../../base/common';
import Popup from "../../../base/Popup/Popup";
import commonStyle from './common.module.scss';
import { UserInfoContext } from "../../../../context";
import RemoteAudioSrc from '../../../../assets/button/remoteAudio.svg';
import { TUICallKitServer, TUIGlobal, TUIStore, StoreName, NAME } from '../../../../../TUICallService';
import deviceSelectorStyle from '../../DeviceSelector/DeviceSelector.module.scss';

export default function MuteRemoteAudio() {
  const CameraIcon = <Icon url={RemoteAudioSrc} className={commonStyle['btn-icon']} />;
  const [isMuteVirtualAudio, setVirtualAudio] = useState(false);
  const [isMuteUserAudio, setUserAudio] = useState(false);

  const iconClassName = classNames([
    commonStyle['btn-icon-container'],
    {
      mobile: !TUIGlobal.isPC,
      pc: TUIGlobal.isPC,
    },
  ]);

  const { localUserInfo: { userId, virtualId }} = useContext(UserInfoContext);

  const isShow = userId?.startsWith('custom');

  const isShowVirtual = useMemo(() => {
    return !!virtualId;
  }, [virtualId])

  const renderContent = () => {
    const handleMuteVir = () => {
      const { virtualId } = TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN);
      TUICallKitServer.muteRemoteAudio(virtualId, !isMuteVirtualAudio);
      setVirtualAudio(!isMuteVirtualAudio);
    }

    const handleMuteUser = () => {
      const { userId } = TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST)[0];
      TUICallKitServer.muteRemoteAudio(userId, !isMuteUserAudio);
      setUserAudio(!isMuteUserAudio);
    }

    return (
      <>
        <div className={deviceSelectorStyle['device-selector-container']}>
          <div className={deviceSelectorStyle['scroll-container']}>
            <div className={deviceSelectorStyle['scroll-content']}>
              { 
                isShowVirtual && (<div
                  className={classNames([
                    deviceSelectorStyle['device-item'],
                  ])}
                  onClick={handleMuteVir}
                >
                  { `${isMuteVirtualAudio ? 'open' : 'close'} virtual volume`}
                </div>)
              }

              <div
                className={classNames([
                  deviceSelectorStyle['device-item'],
                ])}
                onClick={handleMuteUser}
              >
                { `${isMuteUserAudio ? 'open' : 'close'} user volume`}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {
        isShow && (
          <Popup
            content={renderContent()}
            teleported={false}
          >
            <div style={{ display: 'flex' }}>
              <Button
                className={commonStyle[`${classPrefix}-btn`]}
                iconClassName={iconClassName}
                icon={CameraIcon}
              >
                Remote Audio
              </Button>
            </div>
          </Popup>
        )
      }
    </>
  )
}