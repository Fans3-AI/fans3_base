import React from 'react';
import MicrophoneVolumn from '../../MicrophoneVolumn/MicrophoneVolumn';
import Icon from '../../../base/Icon/Icon';
import { useTranslate } from '../../../../hooks';
import networkStatusSrc from '../../../../assets/streamInfo/networkStatus.svg';
import streamInfoPCStyle from './StreamInfoPC.module.scss';

interface IStreamInfoPCProps {
  isMute?: boolean;
  displayName?: string;
  volume?: number;
  isMe?: boolean;
  showNetWorkStatus?: boolean;
}

export default function StreamInfoPC(props: IStreamInfoPCProps) {
  const {
    isMute, displayName, volume, isMe, showNetWorkStatus = false,
  } = props;

  const { t } = useTranslate();

  return (
    <div className={streamInfoPCStyle['stream-info-container-pc']}>
      <div className={streamInfoPCStyle['stream-info-content']}>
        <MicrophoneVolumn volume={volume} close={isMute} />
        <div className={streamInfoPCStyle.nick}>{displayName}</div>
        {isMe && <div>{(t('you'))}</div>}
      </div>
      <div className='stream-info-netWork'>
        {showNetWorkStatus && <Icon style={{ width: '20px', height: '20px' }} url={networkStatusSrc} />}
      </div>
    </div>
  );
}
