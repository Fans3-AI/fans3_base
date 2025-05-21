import React, { useCallback, useContext, useMemo, useState } from "react";
import Button from "../../../base/Button";
import Icon from "../../../base/Icon/Icon";
import { classNames } from "../../../../util/classnames";
import Popup from "../../../base/Popup/Popup";
import DeviceSelector from "../../DeviceSelector/DeviceSelector";
import { DeviceType } from "../../../../../TUICallService/const";
import { UserInfoContext } from "../../../../context";
import {
  TUICallKitServer,
  TUIGlobal,
  TUIStore,
  StoreName,
  NAME,
} from "../../../../../TUICallService";
import { useTranslate } from "../../../../hooks";
import CameraOpenSrc from "../../../../assets/button/camera-open.svg";
import CameraCloseSrc from "../../../../assets/button/camera-close.svg";
import { classPrefix } from "../../../base/common";
import useDeviceList from "../../../../hooks/useDeviceList";
import commonStyle from "./common.module.scss";

interface ICameraProps {
  isMobile?: boolean;
}

export default function Camera(props: ICameraProps) {
  const { localUserInfo } = useContext(UserInfoContext);
  const isCameraOpen = useMemo(
    () => localUserInfo?.isVideoAvailable,
    [localUserInfo?.isVideoAvailable]
  );
  const [isClickable, setIsClickable] = useState(true);
  const { t } = useTranslate();
  const [{ deviceList }] = useDeviceList(DeviceType.CAMERA);
  const handleClick = useCallback(async () => {
    setIsClickable(false);

    if (isCameraOpen) {
      await TUICallKitServer.closeCamera();
    } else {
      await TUICallKitServer.openCamera("localVideo");
    }

    setIsClickable(true);
  }, [isCameraOpen]);
  const iconClassName = classNames([
    commonStyle["btn-icon-container"],
    {
      mobile: !TUIGlobal.isPC,
      pc: TUIGlobal.isPC,
      close: !isCameraOpen,
      disabled: !isClickable,
    },
  ]);
  const CameraIcon = (
    <Icon
      url={isCameraOpen ? CameraOpenSrc : CameraCloseSrc}
      className={commonStyle["btn-icon"]}
    />
  );
  const btnText = isCameraOpen ? t("camera enabled") : t("camera disabled");
  //@ts-ignore
  const isShow = useMemo(() => {
    const { userId } = TUIStore.getData(
      StoreName.CALL,
      NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN
    );
    return !userId?.startsWith("custom");
  });

  return (
    <>
      {isShow && (
        <Popup
          content={<DeviceSelector deviceType={DeviceType.CAMERA} />}
          disabled={!TUIGlobal.isPC || !(deviceList?.length > 0)}
          teleported={false}
        >
          <div style={{ display: "flex" }}>
            <Button
              className={commonStyle[`${classPrefix}-btn`]}
              iconClassName={iconClassName}
              icon={CameraIcon}
              loading={!isClickable}
              onClick={handleClick}
              {...props}
            >
              {btnText}
            </Button>
          </div>
        </Popup>
      )}
    </>
  );
}
