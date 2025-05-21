// 录音服务，用于保存和获取录音状态
const RECORDING_STATUS_KEY = 'voice_changer_recording_status';
// const RECORDING_AUDIO_KEY = 'voice_changer_recording_audio';

export interface RecordingStatus {
  hasRecorded: boolean;
  recordedTime: string;
  timestamp: number;
  audioUrl?: string;
}

// 保存录音状态到本地存储
export const saveRecordingStatus = (recordedTime: string, audioBlob?: Blob): void => {
  const status: RecordingStatus = {
    hasRecorded: true,
    recordedTime,
    timestamp: Date.now()
  };
  
  // 如果有音频数据，则创建URL并保存
  if (audioBlob) {
    try {
      // 将之前创建的objectURL释放
      const prevStatus = getRecordingStatus();
      if (prevStatus?.audioUrl) {
        URL.revokeObjectURL(prevStatus.audioUrl);
      }
      
      // 创建新的objectURL
      const audioUrl = URL.createObjectURL(audioBlob);
      status.audioUrl = audioUrl;
    } catch (error) {
      console.error('创建音频URL失败:', error);
    }
  }
  
  try {
    localStorage.setItem(RECORDING_STATUS_KEY, JSON.stringify(status));
  } catch (error) {
    console.error('保存录音状态失败:', error);
  }
};

// 获取录音状态
export const getRecordingStatus = (): RecordingStatus | null => {
  try {
    const savedStatus = localStorage.getItem(RECORDING_STATUS_KEY);
    if (savedStatus) {
      return JSON.parse(savedStatus) as RecordingStatus;
    }
  } catch (error) {
    console.error('获取录音状态失败:', error);
  }
  
  return null;
};

// 检查是否已录音
export const hasRecorded = (): boolean => {
  const status = getRecordingStatus();
  return status !== null && status.hasRecorded;
};

// 重置录音状态
export const resetRecordingStatus = (): void => {
  // 释放音频URL
  const status = getRecordingStatus();
  if (status?.audioUrl) {
    try {
      URL.revokeObjectURL(status.audioUrl);
    } catch (error) {
      console.error('释放音频URL失败:', error);
    }
  }
  
  try {
    localStorage.removeItem(RECORDING_STATUS_KEY);
  } catch (error) {
    console.error('重置录音状态失败:', error);
  }
}; 