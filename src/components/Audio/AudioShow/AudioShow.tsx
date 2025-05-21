import React from 'react';
import { Space, Typography, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useIsPlaying } from '../../../Context/play'; 
import { 
  PlayCircleOutlined, 
  PauseCircleOutlined, 
  DownloadOutlined, 
} from '@ant-design/icons';
const { Text } = Typography;

interface AudioShowProps {
  fileName: string;
  onPlay?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
}


const AudioShow: React.FC<AudioShowProps> = ({
  fileName,
  onDownload,
  onDelete,
  onPlay,
  onClose,
}) => {
  const { isPlaying, setIsPlaying } = useIsPlaying();
  const togglePlayPause = () => {
      if (isPlaying) {
        setIsPlaying(false);
        onClose && onClose();
      } else {
        setIsPlaying(true);
        onPlay && onPlay();
      }
  };
  
  return (
    <div style={{
      backgroundColor: '#303030',
      padding: '8px 16px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
       <Text style={{ color: 'white' }}>{fileName}</Text>
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
          style={{ color: 'white' }}
        />
        <Button 
          type="text" 
          icon={<DeleteOutlined />} 
          onClick={onDelete}
          style={{ color: '#ff4d4f' }}
        />
      </Space>
    </div>
  );
};

export default AudioShow; 