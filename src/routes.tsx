import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  UsageStatistics,
  HomePage,
  VoiceCallPage,
  VoiceChangerPage,
  VoiceListPage,
  TextToSpeechPage,
  Home,
  Login,
  BillingPage,
  PricingPage,
  VoiceNFTPage,
  VoiceCallTestPage,
} from "./pages/index";

// 主应用的路由配置
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />}>
        <Route index element={<HomePage />} />
        <Route path="usageStatistics" element={<UsageStatistics />} />
        <Route path="homePage" element={<HomePage />} />
        <Route path="voiceCall" element={<VoiceCallPage />} />
        <Route path="voiceChanger" element={<VoiceChangerPage />} />
        <Route path="voiceList" element={<VoiceListPage />} />
        <Route path="textToSpeech" element={<TextToSpeechPage />} />
        <Route path="billingPage" element={<BillingPage />} />
        <Route path="PricingPage" element={<PricingPage />} />
        <Route path="voiceNFTPage" element={<VoiceNFTPage />} />
        <Route path="voiceCallTestPage" element={<VoiceCallTestPage />} />
        <Route path="voiceCallTestPage" element={<VoiceCallTestPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
