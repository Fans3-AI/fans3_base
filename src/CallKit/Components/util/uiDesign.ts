import { stringToPath } from './index';

// eslint-disable-next-line import/prefer-default-export
export function modify(config, path, value) {
  if (typeof config !== 'object') {
    return;
  }

  const paths = stringToPath(path);
  let oldVal = config;

  for (let index = 0; index < paths.length; index++) {
    // eslint-disable-next-line eqeqeq
    if (oldVal == null) {
      return;
    }
    const key = paths[index];
    if (index !== paths.length - 1) {
      oldVal = oldVal?.[key];
    } else {
      Object.assign(oldVal, { [key]: value });
    }
  }
}

export function add(config, path, value) {
  if (typeof config !== 'object') {
    return;
  }

  const paths = stringToPath(path);
  let oldVal = config;
  for (let index = 0; index < paths.length; index++) {
    // eslint-disable-next-line eqeqeq
    if (oldVal == null) {
      return;
    }
    const key = paths[index];
    if (index !== paths.length - 1) {
      oldVal = oldVal?.[key];
    } else if (Array.isArray(oldVal)) {
      oldVal.splice(key, 0, value);
    }
  }
}
