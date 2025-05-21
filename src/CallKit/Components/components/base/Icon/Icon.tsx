import React, { CSSProperties } from 'react';

interface IconProps {
  url?: string;
  style?: CSSProperties;
  className?: string;
  onClick?: (e: any) => any;
}
export default function Icon(props: IconProps) {
  const {
    url,
    style,
    className,
    onClick = () => null,
  } = props;
  return (
    <img
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
      src={url}
      onClick={onClick}
      alt=''
    />
  );
}
