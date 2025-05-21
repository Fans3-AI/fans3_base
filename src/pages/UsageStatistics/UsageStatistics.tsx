import React from 'react';
import { Typography } from 'antd';


const { Title } = Typography;
const UsageStatistics: React.FC = () => {
 
  return (
    <Title level={3} style={{color:"white"}}>
      Usage Statistics
    </Title>
  );
};

export default UsageStatistics;