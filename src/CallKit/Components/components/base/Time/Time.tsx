import React from 'react';
import { classPrefix } from '../../../const/common';
import './Time.scss';

interface ITimeProps {
  callDuration?: string;
  style?: object;
}

export default function Time(props: ITimeProps) {
  const { callDuration, style } = props;
  return <div className={`${classPrefix}-time`} style={style}>{callDuration}</div>;
}
