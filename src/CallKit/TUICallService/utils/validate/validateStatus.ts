import { NAME } from "../../const/index";
import { t } from '../../locales/index';

interface IStatusValidateParams {
  engineInstance?: boolean;
}

export function statusValidate (config: IStatusValidateParams) {
	return function (target, propertyName: string, descriptor: PropertyDescriptor) {
    let method = descriptor.value;
    descriptor.value = function (...args: Array<any>) {
      doValidate.call(this, config, args, propertyName);
      return method.apply(this, args);
		};
    return descriptor;
  };
}

function doValidate(config) {
  if (config?.engineInstance && !this._tuiCallEngine) {
    const error = `${NAME.PREFIX} ${t('TUICallKit init is not complete')}`;
    console.error(error);
    throw error;
  }
}

