import React from 'react';
import { classPrefix } from '../../../../const/common';
import './Dot.scss';

interface IDotProps {
  size?: number | string;
}

export default function Dot(props: IDotProps) {
  const { size } = props;
  return (
    <div
      className={`${classPrefix}-dot-container`}
      style={{ width: size, height: size }}
    >
      <div className='dot' />
      <div className='dot' />
      <div className='dot' />
    </div>
  );
}
