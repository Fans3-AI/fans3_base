# Voice NFT Minting App

This is an innovative application built with **React + Base (Ethereum L2) + Tencent Cloud TRTC + Pinata**. It allows users to make **real-time voice-modulated calls** and mint their own voice recordings as unique NFTs stored on the Base (Ethereum Layer 2) blockchain.

---

## 🚀 Tech Stack

* 🔧 [React](https://reactjs.org/)
* 💸 [ethers.js (Base/Ethereum)](https://docs.ethers.org/)
* 🔐 [MetaMask Wallet Integration](https://metamask.io/)
* 🗂️ [Pinata (IPFS)](https://www.pinata.cloud/)
* 📞 [Tencent TRTC SDK (CallKit)](https://cloud.tencent.com/product/trtc)
* 🧩 [Ant Design](https://ant.design/)

---

## ✨ Core Features

### 🔊 Real-time Voice Modulation & Calling (Tencent TRTC)

* WebRTC-based audio calls powered by Tencent TRTC
* Users can **modulate their voice in real time** during calls
* Supports multiple voice effects (e.g. male, female, loli, deep male, etc.)

### 🎤 Voice Recording & NFT Minting

* Recordings of voice-modulated calls (user's own voice)
* Recordings can be minted as NFTs to capture unique voice moments
* Users can upload a custom cover image
* Audio and image files are uploaded to IPFS via Pinata
* `metadata.json` is automatically generated (including name, description, image, animation_url)
* NFTs are minted on the Base (Ethereum L2) blockchain and sent to the user's MetaMask wallet

### 💼 Wallet Integration & NFT Management

* Users can connect their MetaMask wallet
* View and manage all Voice NFTs minted via the app

---

## 📂 Project Structure

```bash
src/
├── CallKit/                            # Tencent TRTC SDK wrapper and voice modulation logic
├── components/
│   ├── Audio/RecordButton.tsx          # Audio recording button component
│   ├── Common/UploadImage.tsx         # Image upload component
│   └── Voice/NFTCard/NFTCard.tsx      # NFT card component
├── services/
│   └── recordingService.ts            # Local audio recording and storage logic
├── utils/
│   ├── ApiClient.ts                   # HTTP request utility
│   └── message.ts                     # Global message handler
└── pages/
    └── VoiceNFTPage.tsx               # Main page integrating call, record, upload, and minting
```

---

## 🔧 Getting Started

### Step 1: Install dependencies

```bash
npm install
```

### Step 2: Start the development server

```bash
npm run dev
```

---

## 🔄 Updating the API (OpenAPI Generator)

If the backend OpenAPI schema changes, you can regenerate the API client as follows:

### Step 1: Navigate to the API folder

```bash
cd src/api
```

### Step 2: Run the following command

```bash
openapi-generator-cli generate \
  -g typescript \
  -i https://backend.mindfans.ai/voice-agent/test/api/openapi.json \
  --additional-properties=useSingleRequestParameter=true,usePromises=true \
  -o fe-client-typescript
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following content:

```env
VITE_JWT="<your-Pinata-token>"
VITE_TUI_APP_ID=<your-tencent-trtc-app-id>
VITE_TUI_USER_SIG=<your-trtc-user-signature>
VITE_TUI_CUSTOM_SIG=<your-trtc-custom-signature>
```

---
## 🎥 Demo Video
https://www.loom.com/share/23bd54f5e51644f6abd3882473cf2ec6
