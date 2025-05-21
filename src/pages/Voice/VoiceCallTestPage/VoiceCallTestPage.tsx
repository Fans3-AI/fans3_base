import React, { useEffect } from "react";
import { Flex } from "antd";
import { TUICallKit, TUICallKitServer } from "../../../CallKit/index";
import { UIKitProvider } from "@tencentcloud/uikit-base-component-react";
const VoiceCallTestPage: React.FC = () => {
  useEffect(() => {
    TUICallKitServer.init({
      SDKAppID: Number(import.meta.env.VITE_TUI_APP_ID),
      userID: "usertest",
      userSig: import.meta.env.VITE_TUI_USER_SIG,
    });
  });

  return (
    <Flex
      vertical
      style={{
        minHeight: "100vh",
        paddingRight: "24px",
        position: "relative",
      }}
    >
      <div className="sample-chat-h5">
        <UIKitProvider>
          <TUICallKit className={"call-uikit-mobile"} />
        </UIKitProvider>
      </div>
    </Flex>
  );
};

export default VoiceCallTestPage;
