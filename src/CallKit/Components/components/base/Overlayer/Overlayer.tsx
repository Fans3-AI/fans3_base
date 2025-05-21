import React, { CSSProperties, useEffect, useState } from 'react';
import { classPrefix, TObjectFit } from '../../../const/common';
import { classNames } from '../../../util/classnames';
import './Overlayer.scss';

interface IOverlayerProps {
  style?: CSSProperties;
  className?: string;
  showOverlayer?: boolean;
  background?: string;
  fit?: TObjectFit;
  defaultSrc?: string;
  onError?: (event?: object) => void;
}

export default function Overlayer(props: IOverlayerProps) {
  const {
    style,
    className,
    background,
    showOverlayer = true,
    fit = 'cover',
    defaultSrc,
    onError,
  } = props;
  const classnames = classNames([
    className,
    `${classPrefix}-overlayer-container`,
  ]);
  const [imgSrc, setImgSrc] = useState(background || defaultSrc);
  const [objectFit, setObjectFit] = useState({ objectFit: fit });
  const imgStyle = { width: '100%', height: '100%' };

  useEffect(() => {
    setObjectFit({ objectFit: fit });
  }, [fit]);

  function handleError(event) {
    onError?.(event);
    setImgSrc(defaultSrc);
  }

  return (
    <div className={classnames}>
      {showOverlayer && <div style={style} className='overlay' />}
      {imgSrc && <img alt='bg' style={{ ...imgStyle, ...objectFit }} src={imgSrc} onError={handleError} />}
    </div>
  );
}
