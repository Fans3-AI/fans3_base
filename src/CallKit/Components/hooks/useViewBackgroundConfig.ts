import { useContext } from 'react';
import { CustomUIConfigContext } from '../context';

export default function useViewBackgroundConfig() {
  const { viewBackground } = useContext(CustomUIConfigContext);

  return viewBackground;
}
