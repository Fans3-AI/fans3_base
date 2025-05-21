import React from 'react';
import { Modal, Card, Typography, Flex } from 'antd';
import * as icons from '../../../assets/icons';
import './QualitySelectionModal.css';
const { Text,Title } = Typography;

interface QualitySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQualitySelect: (quality: 'Standard' | 'High') => void;
}

const QualitySelectionModal: React.FC<QualitySelectionModalProps> = ({
  isOpen,
  onClose,
  onQualitySelect
}) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="qualitySelectionModal"
      centered
    >
    <Flex vertical  align="center">
    <Title level={2} style={{color:"white"}}>Select cloned voice quality</Title>
      <Flex justify="space-between" gap="middle" className="qualityOptions">
        <Card 
          className="qualityCard standardCard" 
          onClick={() => onQualitySelect('Standard')}
          bordered={false}
        >
          <Flex vertical align="center">
            <Flex justify="center" align="center" className="qualityIcon standardIcon"><img src={icons.lightning}  style={{width:"80px",height:"80px"}} alt="" /></Flex>
            <Text strong className="qualityTitle">Standard</Text>
            <Text className="qualityDescription">only 30s of audio needed</Text>
          </Flex>
        </Card>    
        <Card 
          className="qualityCard highQualityCard"
          onClick={() => onQualitySelect('High')}
          bordered={false}
        >
          <Flex vertical align="center">
            <Flex justify="center" align="center" className="qualityIcon highIcon"><img src={icons.diamonds}  style={{width:"80px",height:"80px"}} alt="" /></Flex>
            <Text strong className="qualityTitle">High</Text>
            <Text className="qualityDescription">At least 3 minutes, high quality and stability</Text>
            <Text className="upgradeLink">Upgrade Plan to Access</Text>
          </Flex>
        </Card>
      </Flex>
      </Flex>
    </Modal>
  );
};

export default QualitySelectionModal;