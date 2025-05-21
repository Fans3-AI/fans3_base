import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Checkbox, Space, Row, Col, Typography, Flex, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ApiClient } from "../../../utils/ApiClient";
import axios from "axios";
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import { showError, showSuccess } from '../../../utils/message';
import * as icons from '../../../assets/icons';
import PrivacyPolicyModal from '../PrivacyPolicyModal/PrivacyPolicyModal';
import './VoiceModal.css';
const { Text, Title } = Typography;

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  const [creatorNickname, setCreatorNickname] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const { attachmentsApi, voicesApi } = ApiClient;
  const [loading, setLoading] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  // Reset all states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCreatorNickname('');
      setAudioFile(null);
      setAgreePolicy(false);
      setProfilePicture(null);
      setAudioDuration(0);
    }
  }, [isOpen]);

  const handleFileChange = (file: File) => {
    setAudioFile(file);
    const audio = new Audio(URL.createObjectURL(file));
    audio.addEventListener('loadedmetadata', () => {
      setAudioDuration(audio.duration);
      URL.revokeObjectURL(audio.src);
    });
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      const isMp3OrWavOrM4a = file.type === 'audio/mpeg' || file.type === 'audio/wav' || file.type === 'audio/x-m4a';
      if (!isMp3OrWavOrM4a) {
        showError('You can only upload MP3/WAV/M4A files!');
        return false;
      }
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        showError('File size cannot exceed 10MB!');
        return false;
      }
      handleFileChange(file);
      return false; // 阻止自动上传
    },
    onChange: (info: UploadChangeParam<UploadFile>) => {
      // 清空文件列表，允许重新选择
      info.fileList = [];
    },
    showUploadList: false,
  };

  // Get profile pre-signed URL
  const getProfilePreUrl=async()=>{  
    const res= await attachmentsApi.createPresignedUrls([
       {
         filename: profilePicture?.name as string,
         relatedObjectType: "Voice",
         relatedObjectSubtype: "profile_pic",
       },
     ])
     await uploadFileToS3(profilePicture as File, res[0].uploadUrl);
     return res[0];
   }

  // Upload file to S3
  const uploadFileToS3 = async (file: File, url: string) => {
    try {
      await axios.put(url, file, {
        headers: { "Content-Type": file.type },
      });
    } catch (error) {
      showError('S3 upload error');
      console.error("S3 upload error", error);
    }
  };

  // Add new Voice
  const addVoice = async () => {
    try {
      setLoading(true);
      const profileResultArray = [366 ,367 ,368 ,369]
      const randomIndex = Math.floor(Math.random() * profileResultArray.length); // 生成随机索引
      let profileResultId = profileResultArray[randomIndex]; // 随机选择一个 ID
      if (profilePicture) {
        try {
          const profileResult = await getProfilePreUrl();
          profileResultId = profileResult.id;
        } catch (error) {
          showError("Failed to upload profile picture");
          console.error("Failed to upload profile picture", error);
        }
      }

      // Ensure audioFile exists
      if (!audioFile) {
        throw new Error("Please select an audio file");
      }

      // Create Voice using voicesApi
      const response = await voicesApi.createVoice(
        creatorNickname,
        profileResultId,
        creatorNickname,
        audioFile,
        "standard",
        undefined,
      );

      console.log('Voice created successfully:', response);
      showSuccess("Create successful");
      onConfirm();
    } catch (error) {
      showError("Submission failed");
      console.error("Failed to create Voice", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="creatorVoiceModal"
      centered
    >
      <Flex justify="center">
        <Title style={{ color: "white" }}>Add creator voice</Title>
      </Flex>

      <Flex vertical align="start" className="profilePictureContainer">
      <Flex justify="center" align="center" className="profilePictureUpload">
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            style={{ display: 'none' }} 
            id="profilePictureInput"
          />
          <label htmlFor="profilePictureInput" style={{ cursor: 'pointer' }}>
            {profilePicture ? (
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="Profile"
                style={{ width: '60px', height: '60px', borderRadius: '50%' }} 
              />
              ) : (
                <img src={icons.plus} style={{ width: '30px', height: '30px' ,borderRadius:"50%",border:"2px solid #fff",padding:"2px", marginTop:"10px"}} alt="" />
            )}
          </label>
        </Flex>
        <Text className="profilePictureText">Add profile picture</Text>
      </Flex>

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Row className="formItem">
          <Col span={24}>
            <Flex vertical>
              <Text className="formLabel">
                Creator nickname<Text type="danger" className="required">*</Text>
              </Text>
              <Input
                placeholder="Type"
                value={creatorNickname}
                onChange={e => setCreatorNickname(e.target.value)}
                className="formInput"
              />
            </Flex>
          </Col>
        </Row>

        <Row className="formItem">
          <Col span={24}>
            <Flex vertical>
              <Text className="formLabel">
                Upload audio<Text type="danger" className="required">*</Text>
              </Text>
              {/* {audioFile && (
                <Text className="audioNote">
                  At least 30 seconds, not exceeding 50MB; MP3/Wav
                </Text>
              )} */}
                  <Text className="audioNote">
                  At least 30 seconds, not exceeding 10MB; MP3/Wav/M4A
                </Text>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} className="uploadButton">
                  Select recording file
                </Button>
              </Upload>
              {audioFile && (
                <Space direction="vertical" size="small" style={{ marginTop: '8px' }}>
                  <Text className="fileName">{audioFile.name}</Text>
                  {/* <Text className="audioNote">
                    Duration: {formatDuration(audioDuration)} | Size: {formatFileSize(audioFile.size)}
                  </Text> */}
                </Space>
              )}
            </Flex>
          </Col>
        </Row>

        <Flex className="policyCheckbox">
          <Checkbox
            checked={agreePolicy}
            onChange={e => setAgreePolicy(e.target.checked)}
          >
            <Text className="policyText">
              Please read and choose whether to agree with the
              <a href="#" className="policyLink" onClick={() => setShowPrivacyPolicy(true)}> privacy policy</a> regarding recording
            </Text>
          </Checkbox>
        </Flex>

        <Button
          className="confirmButton"
          type="primary"
          onClick={addVoice}
          disabled={!agreePolicy || !creatorNickname || !audioFile || loading}
          loading={loading}
        >
          Confirm
        </Button>
      </Space>

      <PrivacyPolicyModal
        isOpen={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
      />
    </Modal>
  );
};

export default VoiceModal;