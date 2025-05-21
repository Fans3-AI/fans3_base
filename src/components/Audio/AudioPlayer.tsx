import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button, Space } from 'antd';
import { 
  PlayCircleOutlined, 
  PauseCircleOutlined, 
  DownloadOutlined, 
} from '@ant-design/icons';
import AudioInfo from './AudioInfo';
import { useIsPlaying } from '../../Context/play';
interface AudioPlayerProps {
  fileName: string;
  creatorName?: string;
  avatarUrl?: string;
  audioUrl?: string  | undefined;
  onPlay?: () => void;
  onClose?: () => void;
  onDownload?: () => void;
}

const AudioPlayerTest = forwardRef<HTMLAudioElement, AudioPlayerProps>(({
  fileName,
  creatorName,
  avatarUrl,
  audioUrl,
  onPlay,
  onClose,
  onDownload,
}, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { isPlaying, setIsPlaying } = useIsPlaying();

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    }
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleEnded);  
      }
    };
  }, [audioUrl]); // 依赖audioUrl，当其变化时重新初始化监听器
//@ts-ignore
  useImperativeHandle(ref, () => ({
    play: () => audioRef.current?.play(),
    pause: () => audioRef.current?.pause(),
    reset: () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
        setIsPlaying(false);
      }
    },
  }));

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration || 0);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        onClose && onClose();
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        onPlay && onPlay();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleEnded = () => {
    console.log('播放结束');
    setCurrentTime(0);
    setIsPlaying(false);
  };

  return (
    <div style={{
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      width: "80%"
    }}>
      <AudioInfo 
        fileName={fileName}
        creatorName={creatorName}
        avatarUrl={avatarUrl}
      />
      
      <audio ref={audioRef} src={audioUrl} />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: '#fff', fontSize: '12px' }}>{formatTime(currentTime)}</span>
        <input 
          style={{ width: "100%" }} 
          type="range" 
          min="0" 
          max={duration} 
          value={currentTime} 
          onChange={handleSeek} 
        />
        <span style={{ color: '#fff', fontSize: '12px' }}> {formatTime(duration)}</span>
      </div>
      <Space>
        <Button
          type="text"
          icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          onClick={togglePlayPause}
          style={{ color: '#fff' }}
        />
        <Button 
          type="text" 
          icon={<DownloadOutlined />} 
          onClick={onDownload}
          style={{ color: '#fff' }}
        />
      </Space>
    </div>
  );
});

export default AudioPlayerTest;
