import {
  TUIGlobal,
  TUIStore,
  StoreName,
  TUICallKitServer,
  NAME,
  StatusChange as STATUS,
  CallRole,
  CallMediaType,
  VideoResolution,
  VideoDisplayMode,
  t,
  uiDesign,
  FeatureButton,
  LayoutMode,
} from './TUICallService/index';
import CallMessage from './Components/components/common/CallMessage/CallMessage.tsx';
// @ts-ignore
import TUICallKit from './Components/TUICallKit/TUICallKit.tsx';
const plugin = (TUICore) => {
  TUICore.component('TUICallKit', { server: TUICallKitServer });
  TUICallKitServer.bindTUICore(TUICore);
  return TUICallKit;
};
const install = (app) => {
  app.component('TUICallKit', TUICallKit);
  console.log('TUICallKit&mini installed', app);
};
// @ts-ignore
TUICallKit.plugin = plugin;
// @ts-ignore
TUICallKit.install = install;
// Web TUICallKit ≤v2.2.1 抛出的字段
const TUICallType = {
  AUDIO_CALL: 1,
  VIDEO_CALL: 2,
};
const Version = '3.3.9'; // basic-demo 原来上报使用

// 输出产物
export {
  TUIGlobal,
  TUIStore,
  StoreName,
  TUICallKitServer,
  // uni-app 打包小程序无法引入 vue 组件, 只能在使用侧单独引入 vue 文件
  TUICallKit,
  plugin,
  install,
  TUICallType,
  NAME,
  STATUS,
  CallRole,
  CallMediaType,
  VideoResolution,
  VideoDisplayMode,
  Version,
  t,
  uiDesign,
  FeatureButton,
  LayoutMode,
  CallMessage,
};
