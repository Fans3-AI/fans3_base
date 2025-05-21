import React from 'react';
import { Avatar, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface AudioInfoProps {
  fileName: string;
  creatorName?: string;
  avatarUrl?: string;
}

const AudioInfo: React.FC<AudioInfoProps> = ({ 
  fileName, 
  creatorName = 'Kelly Voice',  // 默认名称
  avatarUrl 
}) => {
  return (
    <Space align="center" size={12}>
      <Avatar 
        size={32} 
        icon={!avatarUrl && <UserOutlined />}
        src={avatarUrl}
        style={{ backgroundColor: !avatarUrl ? '#1890ff' : undefined }}
      />
      <Space direction="vertical" size={0}>
        <Text style={{ color: '#fff', fontSize: '14px', margin: 0 }}>
          {fileName}
        </Text>
        <Text style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '12px', margin: 0 }}>
          {creatorName}
        </Text>
      </Space>
    </Space>
  );
};

export default AudioInfo; 