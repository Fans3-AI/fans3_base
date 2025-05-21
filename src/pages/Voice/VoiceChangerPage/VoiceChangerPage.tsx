import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Divider, Flex, Row, Select, Space, Tag, Typography } from "antd";
import {
    CheckCircleOutlined,
  } from '@ant-design/icons';
import AudioShow from '../../../components/Audio/AudioShow/AudioShow';
import RecordButton from '../../../components/Audio/RecordButton';
import { getRecordingStatus, saveRecordingStatus } from '../../../services/recordingService';
import { VoicePublic } from "../../../api/fe-client-typescript/models/VoicePublic";
import { PageVoicePublic } from "../../../api/fe-client-typescript/models/PageVoicePublic";
import {ApiClient} from "../../../utils/ApiClient";
import AudioPlayerTest from "../../../components/Audio/AudioPlayer";
import { showError } from "../../../utils/message";
import * as icons from "../../../assets/icons";
import { UserPublic } from "../../../api/fe-client-typescript";
const {Title,Text}=Typography;

const styles={
  fontColor:{
      color:"white"
  },
  select: {
      width: 200,
      fontSize: "16px",
      color: "black",
    },
}
const VoiceChangerPage:React.FC=()=>{
 const {speechToSpeechApi,usersApi}=ApiClient;
 const [voices, setVoices] = useState<VoicePublic[]>([]);
 const [selectedCreatorVoice, setSelectedCreatorVoice] = useState<number | null>(null);
 const [audioUrl, setAudioUrl] = useState<string>();
 const audioPlayerRef = useRef<any>(null);
 const [isGenerating, setIsGenerating] = useState(false);
 const [isPlaying, setIsPlaying] = useState(false);
 const [userInfo, setUserInfo] = useState<UserPublic | null>(() => {
  const storedUserInfo = localStorage.getItem('userInfo');
  return storedUserInfo ? JSON.parse(storedUserInfo) : null;
});
const [audioName, setAudioName] = useState<string>();
 const [generatedTimestamp, setGeneratedTimestamp] = useState<number | null>(null);
 // 获取选中的voice信息
 const selectedVoice = voices.find(voice => voice.id === selectedCreatorVoice);
  // 录音状态
  const [recordingStatus, setRecordingStatus] = useState({
    hasRecorded: false,
    recordedTime: "",
    audioUrl: ""
  });
  useEffect(()=>{
    usersApi.readUserMe().then((res:UserPublic)=>{  
      localStorage.setItem("userInfo",JSON.stringify(res));
      setUserInfo(res);
  });
    getCreatorList();
  },[])

  const getCreatorList=async()=>{
    await usersApi.readUserVoices(userInfo?.id as number).then((res:any)=>{
      console.log("readVoices",res);
      setVoices(res as VoicePublic[]);
  });
  }
  // 组件加载时，从本地存储获取录音状态
  useEffect(() => {
    const status = getRecordingStatus();
    if (status) {
      setRecordingStatus({
        hasRecorded: status.hasRecorded,
        recordedTime: status.recordedTime,
        audioUrl: status.audioUrl || ""
      });
    }
  }, []);

  // 结束录音的处理函数
  const handleRecordEnd = (recordingTime: string, audioBlob?: Blob) => {
    if (recordingTime !== '0:00' && audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      setRecordingStatus({
        hasRecorded: true,
        recordedTime: recordingTime,
        audioUrl: audioUrl
      });
      saveRecordingStatus(recordingTime, audioBlob);
    }
  };

  const voiceChange = async() => {
    if (!selectedCreatorVoice || !recordingStatus.audioUrl) {
      return;
    }
    setIsGenerating(true);
    try {
      const response = await fetch(recordingStatus.audioUrl);
      const blob = await response.blob();
      const audioFile = blobToFile(blob, 'recording.mp3', 'audio/mpeg');
       await  speechToSpeechApi.createSpeechToSpeech(selectedCreatorVoice, audioFile,30,1.0,0.7 ).then((res:any)=>{
        if (res.url) {
          setAudioUrl(res.url);
          setAudioName(res.filename?.split('.')[0] || ''); 
          setGeneratedTimestamp(Date.now());
        } else {
          showError('No audio URL returned from the server.');
        }
      })
     
    } catch (error) {
      console.error("Error:", error);
      showError('An error occurred while generating the audio.');
    }finally {
      setIsGenerating(false);
    }
  };

  function blobToFile(theBlob: Blob, fileName: string, type: string): File {
    return new File([theBlob], fileName, { type });
  }
  const handleDownload = async () => {
    if (audioUrl && selectedVoice) {
      try {
        const response = await fetch(audioUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${audioName}.wav`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
        showError('Failed to download audio file');
      }
    }
  };
  const handleDelete = () => {
    setAudioUrl(undefined);
  };
  return (
    <Flex 
      vertical 
      style={{ 
        minHeight: '100vh',
        paddingRight: '24px',
        position: 'relative',
      }}
    >
      <Title level={3} style={styles.fontColor}>
        Voice Changer
      </Title>
      <Divider style={{ borderColor: '#3a3a3a' }} />
      <Space direction="vertical" size="middle">
        <Space direction="vertical" size="small">
          <Text style={styles.fontColor}>
            Select Creator Voice
          </Text>
          <Select
            id="blackSelect"
            defaultValue={selectedCreatorVoice}
            className="textToSpeechSelect"
            optionLabelProp="label"
            options={voices.map(voice => ({
              value: voice.id,
              label: voice.name
            }))}
            onChange={(value) => setSelectedCreatorVoice(value)}
          />
        </Space>
        
        <Space direction="vertical" size="small">
          <Text style={styles.fontColor}>
            Sound input
          </Text>
          <RecordButton 
            onRecordEnd={handleRecordEnd}
          />
        </Space>
        
        <Space direction="vertical" size="small">
          <Text style={styles.fontColor}>
            Input status
          </Text>
          {recordingStatus.hasRecorded && (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Received {recordingStatus.recordedTime} recording
            </Tag>
          )}
        </Space>
      </Space>
      
      <Flex align="center" style={{paddingTop:20}} gap="middle">
        <Button 
              type="primary" 
              onClick={voiceChange}
              loading={isGenerating}
              className="generateButton"
            >
              {!isGenerating && <img src={icons["leida"]} className='iconImg' alt="generate icon" />}
              {isGenerating ? 'Generating...' : 'AI generate'}
          </Button>
        <Text style={styles.fontColor}>point balance:34326443</Text>
      </Flex>      
      <Flex vertical flex={1}>
        <Row>
          <Col span={9}>
            <Flex vertical className="audioShow">
              <Divider className="textToSpeechDivider"/>
              <Text className="textToSpeechLabel">Output</Text>
              {audioUrl && selectedVoice && ( <AudioShow 
                fileName={`${audioName}`}
                onPlay={() => {
                  audioPlayerRef.current.play();
                  setIsPlaying(true);
                }}
                onClose={() => {
                  audioPlayerRef.current.pause();
                  setIsPlaying(false);
                }}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />)}
            </Flex>
          </Col>
        </Row>
      </Flex>
      
      <Flex className="audioPlayerContainer">
        {audioUrl && selectedVoice && ( <AudioPlayerTest 
          fileName={`${audioName}`}
          creatorName={selectedVoice.name}
          //@ts-ignore
          avatarUrl={selectedVoice.profilePic?.downloadUrl || ''}
          ref={audioPlayerRef}
          audioUrl={audioUrl}
          onPlay={() => {
            setIsPlaying(true);
          }}
          onClose={() => {
            setIsPlaying(false);
          }}
          onDownload={handleDownload}
        />)}
      </Flex>
    </Flex>
  );
}

export default VoiceChangerPage;