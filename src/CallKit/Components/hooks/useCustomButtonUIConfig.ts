import React, { useContext } from 'react';
import { ButtonPanelConfig } from '../components/common/ButtonPanel/config';
import { findValues } from '../util';
import { CustomUIConfigContext } from '../context';

export default function useCustomButtonUIConfig() {
  const { button: buttonConfig } = useContext(CustomUIConfigContext);
  const results = [];

  function condition(value) {
    return Object.keys(buttonConfig).includes(value);
  }
  function formatResults({ key, value }) {
    const valueArr = value.split('.');
    let path = valueArr.slice(0, valueArr.length - 1);
    path.push('props');
    path.push('show');
    path = path.join('.');
    return {
      path,
      value: buttonConfig[key]?.show,
    };
  }

  findValues(ButtonPanelConfig, condition, '', results, formatResults);
  return results;
}
