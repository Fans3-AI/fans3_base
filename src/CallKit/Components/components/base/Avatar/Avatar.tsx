import React, { ReactNode } from 'react';
import { classNames } from '../../../util/classnames';
import { classPrefix } from '../../../const/common';
import DefaultAvatarSrc from '../../../assets/common/defaultAvatar.svg';
import './Avatar.scss';

interface IAvatarProps {
  shape?: 'round' | 'circle';
  image?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: object;
}

export default function Avatar(props: IAvatarProps) {
  const {
    shape = 'round',
    image,
    icon,
    children,
    className,
    style,
  } = props;

  const setDefaultImg = (e) => {
    e.target.src = DefaultAvatarSrc;
  };

  const renderContent = () => {
    if (typeof image === 'string') {
      return <img src={image} onError={setDefaultImg} />;
    }
    if (icon) {
      return icon;
    }

    return children;
  };

  const classnames = classNames([
    className,
    `${classPrefix}-avatar-container`,
    `${classPrefix}-avatar-shape-${shape}`,
  ]);

  return (
    <div className={classnames} style={style}>
      {renderContent()}
    </div>
  );
}
