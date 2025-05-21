import { TUICallKitServer, NAME, TUIStore, StoreName } from '../../index';
import { CallStatus } from '../const/index';
import { avoidRepeatedCall } from '../utils/validate/index';
import { IN_WX_MINI_APP } from '../utils/env';
/**
 * @param {Number} sdkAppID      用户的sdkAppID           必传
 * @param {String} userID        用户的userID             必传
 * @param {String} userSig       用户的userSig            必传
 * @param {String} globalCallPagePath  跳转的路径          必传
 * @param {ChatSDK} tim           tim实例                 非必传
 */
const PREFIX = 'callManager';
export class CallManager {
  private _globalCallPagePath:string = '';
  @avoidRepeatedCall()
  public async init(params) {
    const { sdkAppID, userID, userSig, globalCallPagePath, tim } = params;
    if (!globalCallPagePath) {
      console.error(`${PREFIX} globalCallPagePath Can not be empty!`);
      return;
    };
    this._globalCallPagePath = globalCallPagePath;
    try {
      await TUICallKitServer.init({
        sdkAppID,
        userID,
        userSig,
        tim,
      });
      this._watchTUIStore();
      // uniApp 小程序全局监听下，关闭悬浮窗
      if (!IN_WX_MINI_APP) {
        TUICallKitServer.enableFloatWindow(false);
      };
      console.log(`${PREFIX} init Ready!`);
    } catch (error) {
      console.error(`${PREFIX} init fail!`, error);
      throw error;
    }
  }

  // =========================【监听 TUIStore 中的状态】=========================
  private _watchTUIStore() {
    TUIStore?.watch(StoreName.CALL, {
      [NAME.CALL_STATUS]: this._handleCallStatusChange,
    }, {
      notifyRangeWhenWatch: NAME.MYSELF,
    });
  }

  private _unwatchTUIStore() {
    TUIStore?.unwatch(StoreName.CALL, {
      [NAME.CALL_STATUS]: this._handleCallStatusChange,
    });
  }

  private _handleCallStatusChange = async (value: CallStatus) => {
    switch (value) {
      case CallStatus.CALLING:
      case CallStatus.CONNECTED:
        this._handleCallStatusToCalling();
        break;

      case CallStatus.IDLE:
        this._handleCallStatusToIdle();
        break;
    }
  };

  private _handleCallStatusToCalling() {
    if (this.getRoute() === this._globalCallPagePath) return;
    // @ts-ignore
    wx.navigateTo({
      url: `/${this._globalCallPagePath}`,
      success: () => {},
      fail: () => {
        console.error(`${PREFIX} navigateTo fail!`);
      },
      complete: () => {},
    });
  }

  private _handleCallStatusToIdle() {
    if (this.getRoute() !== this._globalCallPagePath) return;
    // @ts-ignore
    wx.navigateBack({
      success: () => {},
      fail: () => {
        console.error(`${PREFIX} navigateBack fail!`);
      },
      complete: () => {},
    });
  }

  // 获取当前的页面地址
  getRoute() {
    // @ts-ignore
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    return currentPage.route;
  }

  // 卸载 callManger
  public async destroyed() {
    this._globalCallPagePath = '';
    this._unwatchTUIStore();
    await TUICallKitServer.destroyed();
  }
}
