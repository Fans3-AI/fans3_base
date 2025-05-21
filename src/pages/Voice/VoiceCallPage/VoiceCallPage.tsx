import React from "react";
import {  Flex, Button } from "antd";
import { SendOutlined } from '@ant-design/icons';
import './VoiceCallPage.css';
import  * as icons from "../../../assets/icons"


const VoiceCallPage: React.FC = () => {

  return (
    <Flex 
      vertical 
      className="voiceCallContainer"
      style={{
        backgroundImage: `url(${icons.voiceCall})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
        position: 'relative'
      }}
    >
      <Button 
        type="primary" 
        size="large" 
        icon={<SendOutlined />}
        className="contactButton"
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        Please contact the Customer Manager
      </Button>
    </Flex>
  );
};

export default VoiceCallPage;