import React, { CSSProperties, ReactNode } from 'react';
import { classPrefix } from '../../../const/common';
import { classNames } from '../../../util/classnames';
import CircleLoading from './Circle/Cilrcle';
import DotLoading from './Dot/Dot';
import Overlayer from '../Overlayer/Overlayer';
import './Loading.scss';

type TObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
interface ILoadingProps {
  theme?: 'circle' | 'dot';
  size?: number | string;
  showOverlayer?: boolean;
  showLoading?: boolean;
  style?: CSSProperties;
  children?: ReactNode | ReactNode[];
  fit?: TObjectFit;
}

export default function Loading(props: ILoadingProps) {
  const {
    theme = 'circle',
    size,
    showOverlayer = true,
    children,
    style = {},
    showLoading = true,
    fit,
  } = props;

  const renderContent = () => (theme === 'dot' ? <DotLoading size={size} /> : <CircleLoading size={size} />);

  const classnames = classNames([
    `${classPrefix}-loading-container`,
    {
      [`${classPrefix}-loading-overlayer`]: showOverlayer,
    },
  ]);

  return (
    <div className={classnames} style={style}>
      {showOverlayer && <Overlayer fit={fit} />}
      {showLoading && renderContent()}
      {children}
    </div>
  );
}
