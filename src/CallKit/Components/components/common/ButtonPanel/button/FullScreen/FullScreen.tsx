import React from 'react';
import Button from '../../../../base/Button';
import Icon from '../../../../base/Icon/Icon';
import { toggleScreen } from '../../../../base/util/index';
import FullScreenSrc from '../../../../../assets/button/desktop/fullScreen.svg';
import fullScreenStyle from './FullScreen.module.scss';

interface IFullScreenProps {
  domID?: string;
}

export default function FullScreen(props: IFullScreenProps) {
  const { domID } = props;
  const FullScreenIcon = <Icon url={FullScreenSrc} />;
  return (
    <Button
      className={fullScreenStyle['full-screen-container']}
      icon={FullScreenIcon}
      onClick={() => {
        if (typeof domID === 'string') {
          toggleScreen(domID);
        }
      }}
    />
  );
}
