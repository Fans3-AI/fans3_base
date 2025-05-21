import React, { useEffect, useRef, useState } from "react";
import { Typography, Divider, Select, Space, Input, Slider, Form, Row, Col, Button, Flex } from "antd";
import './TextToSpeechPage.css'
import AudioShow from '../../../components/Audio/AudioShow/AudioShow';
import { hookMessageList, dirtyTalkList, toBreakTheIce, massMessageList } from './messageLists';
import {ApiClient} from "../../../utils/ApiClient";
import {  TextToSpeechCreateFormatEnum, TextToSpeechCreateUseMemoryCacheEnum, UserPublic, VoicePublic } from '../../../api/fe-client-typescript';
import AudioPlayerTest from "../../../components/Audio/AudioPlayer";
import {showError} from "../../../utils/message"
import * as icons from "../../../assets/icons";
const { Title, Text } = Typography;
const { TextArea } = Input;

const TextToSpeechPage: React.FC = () => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectedCreatorVoice, setSelectedCreatorVoice] = useState<number | null>(null);
  const [sliderSpeedValue, setSliderSpeedValue] = useState(30);
  const [sliderEmotionValue, setSliderEmotionValue] = useState(30);
  const [sliderVolumeValue, setSliderVolumeValue] = useState(30);
  const [voices, setVoices] = useState<VoicePublic[]>([]);
  const [audioUrl, setAudioUrl] = useState<string>();
  const [isPlaying, setIsPlaying] = useState<boolean>();
  const [isGenerating, setIsGenerating] = useState(false);
  const {textToSpeechApi,usersApi}=ApiClient;
  const audioPlayerRef = useRef<any>(null);
  const [audioName, setAudioName] = useState<string>();
  const [userInfo, setUserInfo] = useState<UserPublic | null>(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });
  const [generatedTimestamp, setGeneratedTimestamp] = useState<number | null>(null);
  // 获取选中的voice信息
  const selectedVoice = voices.find(voice => voice.id === selectedCreatorVoice);

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

  const handleHookMessageClick = () => {
    const randomMessage = hookMessageList[Math.floor(Math.random() * hookMessageList.length)];
    setTextAreaValue(randomMessage);
  };

  const handleWelcomeMessageClick = () => {
    const randomMessage = toBreakTheIce[Math.floor(Math.random() * toBreakTheIce.length)];
    setTextAreaValue(randomMessage);
  };

  const handleDirtyTalkClick = () => {
    const randomMessage = dirtyTalkList[Math.floor(Math.random() * dirtyTalkList.length)];
    setTextAreaValue(randomMessage);
  };

  const handleRandomTopicClick = () => {
    const randomMessage = massMessageList[Math.floor(Math.random() * massMessageList.length)];
    setTextAreaValue(randomMessage);
  };

  const handleAIGenerateClick = async () => {
    if (!selectedCreatorVoice) {
      showError('Please select a valid Creator Voice.');
      return;
    }

    if (!textAreaValue) {
      showError('Please enter a voice message.');
      return;
    }

    setIsGenerating(true);

    try {
      const res = await textToSpeechApi.createTextToSpeech({
        voiceId: selectedCreatorVoice,
        text: textAreaValue,
        chunkLength: 200,
        format: "wav" as TextToSpeechCreateFormatEnum,
        seed: 1,
        useMemoryCache: "off" as TextToSpeechCreateUseMemoryCacheEnum,
        normalize: true,
        maxNewTokens: 1024,
        topP: 0.7,
        repetitionPenalty: 1.2,
        temperature: 0.7,
      });

      if (res.url) {
        setAudioUrl(res.url);
        setAudioName(res.filename?.split('.')[0] || '');
        setGeneratedTimestamp(Date.now());
      } else {
        showError('No audio URL returned from the server.');
      }
    } catch (error) {
      console.error("Error:", error);
      showError('An error occurred while generating the audio.');
    } finally {
      setIsGenerating(false);
    }
  };

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
      className="textToSpeechPage"
    > 
      <Flex vertical flex={1}>
        <Title level={3} style={{color:"white"}} className="textToSpeechTitle">Text to Speech</Title>
        <Divider className="textToSpeechDivider" />
        <Space direction="vertical">
          <Text className="textToSpeechLabel">Select Creator Voice</Text>
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
          <Text className="textToSpeechLabel">Create a voice message</Text>
          <Row gutter={16}>
          <Col span={16} >
              <div className="textAreaContainer">
                <TextArea 
                  rows={4}
                  placeholder="Type here ..."
                  className="textToSpeechTextArea"
                  value={textAreaValue}
                  onChange={(e) => setTextAreaValue(e.target.value)}
                  maxLength={240}
                  showCount
                />
                <div className="wordCount">
                  {textAreaValue.length}/240
                </div>
              </div>
            </Col>
            <Col span={8} >
              <Flex vertical gap="8px" style={{ height: '100%' }}>
                <Flex align="center" gap="8px">
                <img src={icons["tips"]} className='iconImgTips' alt="tips icon" />
                <Text className="textToSpeechLabel">Try some new inspirations</Text>
                </Flex>
                <Space>
                  <Button type="text" className="textToSpeechButton" onClick={handleHookMessageClick}>Hook message</Button>
                  <Button type="text" className="textToSpeechButton" onClick={handleWelcomeMessageClick}>To break the ice</Button>
                </Space>
                <Space>
                  <Button type="text" className="textToSpeechButton" onClick={handleDirtyTalkClick}>Dirty talk</Button>
                  <Button type="text" className="textToSpeechButton" onClick={handleRandomTopicClick}>Mass message</Button>
                </Space>
              </Flex>
            </Col>
          </Row>

          <Text className="textToSpeechLabel">Sound settings</Text>
        </Space>
        <Row>
          <Col span={4} >    
            <Form.Item>      
              <Flex align="center" gap="8px">
                <Text className="textToSpeechLabel">Speed</Text>
                <Slider defaultValue={30} disabled={false} className="textToSpeechSlider" aria-label="Speed" onChange={(value) => setSliderSpeedValue(value)} />       
              </Flex>
            </Form.Item>
          </Col>
          <Col span={4} offset={4}>
            <Form.Item>
              <Flex align="center" gap="8px">
                <Text className="textToSpeechLabel">Emotion</Text>
                <Slider defaultValue={30} disabled={false} className="textToSpeechSlider" aria-label="Emotion" onChange={(value) => setSliderEmotionValue(value)} />
              </Flex>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <Form.Item>
              <Flex align="center" gap="8px">
                <Text className="textToSpeechLabel">Volume</Text>
                <Slider defaultValue={30} disabled={false} className="textToSpeechSlider" aria-label="Volume" onChange={(value) => setSliderVolumeValue(value)} />
              </Flex>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}></Col>
          <Col span={12}>
          <Flex align="center" style={{paddingTop:20}} gap="middle">
            <Button 
              type="primary" 
              onClick={handleAIGenerateClick}
              loading={isGenerating}
              className="generateButton"
            >
              {!isGenerating && <img src={icons["leida"]} className='iconImg' alt="generate icon" />}
              {isGenerating ? 'Generating...' : 'AI generate'}
            </Button>
            <Text style={{color:"white"}}>point balance:34326443</Text>
            </Flex>
          </Col>
        </Row>
      </Flex>
      <Flex vertical flex={1} className="audioShow">
        <Row>
          <Col span={9} className="audioShow">
            <Flex vertical>
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
};

export default TextToSpeechPage;
