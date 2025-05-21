import React from 'react';
import { classPrefix } from '../../../../const/common';
import loadingSrc from '../../../../assets/base/loading-circle.svg';
import './Circle.scss';

interface ICircleProps {
  size?: number | string;
}

export default function Circle(props: ICircleProps) {
  const { size } = props;
  return (
    <div
      className={`${classPrefix}-circle-container`}
      style={{ width: size, height: size }}
    >
      <img alt='' style={{ width: '100%', height: '100%' }} className={`${classPrefix}-circle-loading`} src={loadingSrc} />
    </div>
  );
}
