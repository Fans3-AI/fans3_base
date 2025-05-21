import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

interface RecordButtonProps {
  onRecordEnd: (recordingTime: string, audioBlob?: Blob) => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({
  onRecordEnd
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(null);
  
  // 录音相关状态
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // 处理开始录音
  const handleMouseDown = async () => {
    try {
      // 请求麦克风权限
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // 创建MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      // 收集音频数据
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // 开始录音
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // 启动计时器
      const timerId = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      setTimer(timerId);
    } catch (error) {
      console.error(error);
    }
  };

  // 处理结束录音
  const handleMouseUp = () => {
    if (isRecording && mediaRecorderRef.current) {
      setIsRecording(false);
      
      // 停止MediaRecorder
      mediaRecorderRef.current.stop();
      
      // 停止所有音轨
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      // 清除计时器
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
      
      // 格式化时间 (0:21)
      const minutes = Math.floor(recordingTime / 60);
      const seconds = recordingTime % 60;
      const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      // 创建录音文件并调用回调
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onRecordEnd(formattedTime, audioBlob);
      };
    }
  };

  // 组件卸载时清除计时器和录音
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
      
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [timer, isRecording]);

  // 波形动画样式
  const waveformKeyframes = `
    @keyframes wave {
      0% { height: 3px; }
      50% { height: 12px; }
      100% { height: 3px; }
    }
  `;

  return (
    <Button
      type="default"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        borderRadius: '50px',
        backgroundColor: '#424242',
        border: 'none',
        color: 'white',
        width: '180px',
        height: '40px',
        justifyContent: 'space-between',
        position: 'relative'
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AudioOutlined style={{ 
            color: isRecording ? '#52c41a' : 'white',
            fontSize: '16px'
          }} />
          <span>Hold on Talk</span>
        </div>
        
        {isRecording && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            height: '16px',
            gap: '2px' 
          }}>
            <style>{waveformKeyframes}</style>
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index}
                style={{
                  width: '2px',
                  height: '8px',
                  backgroundColor: '#52c41a',
                  animation: `wave 0.5s infinite ${index * 0.1}s`,
                  borderRadius: '1px'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Button>
  );
};

export default RecordButton; 