# Voice NFT Minting App

This is an innovative app built with **React + Solana + Tencent Cloud TRTC + Pinata**, allowing users to conduct **real-time voice-modulated calls** and **mint their own voice recordings as unique NFTs** stored on the Solana blockchain.

---

## 🚀 Tech Stack

* 🔧 [React](https://reactjs.org/)
* 💸 [Solana Web3](https://docs.solana.com/)
* 🔐 [@solana/wallet-adapter](https://github.com/solana-labs/wallet-adapter)
* 🧰 [Metaplex UMI](https://github.com/metaplex-foundation/umi)
* 🗂️ [Pinata (IPFS)](https://www.pinata.cloud/)
* 📞 [Tencent TRTC SDK (CallKit)](https://cloud.tencent.com/product/trtc)
* 🧩 [Ant Design](https://ant.design/)

---

## ✨ Core Features

### 🔊 Real-time Voice Modulation + Calling (Tencent TRTC)

* WebRTC-based audio call using Tencent TRTC
* Users can **speak in real-time with live voice-changing effects**
* Supports multiple voice filters (e.g. male, female, loli, deep male voice, etc.)

### 🎤 Audio Recording + NFT Minting

* Voice-modulated conversations are recorded (user's own voice, not pre-recorded clips)
* Recordings are used to mint NFTs that capture unique voice moments
* Users can upload a custom cover image for the audio
* Audio and image files are uploaded to IPFS via Pinata
* A `metadata.json` file is automatically generated (including name, description, image, animation\_url)
* NFTs are minted on Solana Devnet using Metaplex UMI and sent to the user's Phantom wallet

### 💼 Wallet Integration + NFT Management

* Users can connect their Phantom wallet
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

If the backend OpenAPI schema changes, regenerate the API client by following these steps:

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

Set the following environment variables in a `.env` file at the root of the project:

```env
VITE_JWT="<your-Pinata-token>"
VITE_TUI_APP_ID=<your-tencent-trtc-app-id>
VITE_TUI_USER_SIG=<your-trtc-user-signature>
VITE_TUI_CUSTOM_SIG=<your-trtc-custom-signature>
```

## 🎥 Demo Video
https://www.loom.com/share/a6da0b41208c47d29d93463a046f8d7f