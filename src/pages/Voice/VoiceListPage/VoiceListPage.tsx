import React, { useEffect, useState } from "react";
import { Col, Divider, Row, Typography, Flex } from "antd";
import VoiceCloneList from '../../../components/Voice/VoiceCloneList/VoiceCloneList';
import VoiceModal from '../../../components/Modal/VoiceModal/VoiceModal';
import QualitySelectionModal from '../../../components/Modal/QualitySelectionModal/QualitySelectionModal';
import './VoiceListPage.css';
import { ApiClient } from "../../../utils/ApiClient";
import {  UserPublic, VoicePublic } from "../../../api/fe-client-typescript";
import * as icons from '../../../assets/icons';
import { showError } from "../../../utils/message";
const { Title, Text } = Typography;
const VoiceListPage: React.FC = () => {
    const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);
    const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState<'High' | 'Standard' | null>(null);
    const [voices,setVoices]=useState<VoicePublic[]>([]);
    const [userInfo, setUserInfo] = useState<UserPublic | null>(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        return storedUserInfo ? JSON.parse(storedUserInfo) : null;
      });
    const {usersApi,voicesApi}=ApiClient;
    useEffect(()=>{
        usersApi.readUserMe().then((res:UserPublic)=>{  
            localStorage.setItem("userInfo",JSON.stringify(res));
            setUserInfo(res);
        });
        readVoices();
    },[]);
    //
    const readVoices=async()=>{
        await usersApi.readUserVoices(userInfo?.id as number).then((res:any)=>{
            console.log("readVoices",res);
            setVoices(res as VoicePublic[]);
        });
    }
    const handleCreateVoice = () => {
        setIsQualityModalOpen(true);
    };

    const handleCloseQualityModal = () => {
        setIsQualityModalOpen(false);
    };

    const handleQualitySelect = (quality: 'High' | 'Standard') => {
        if(quality==="Standard"){
            setSelectedQuality(quality);
            setIsQualityModalOpen(false);
            setIsCreatorModalOpen(true);
        }else{
            showError("You're not a VIP yet, please top up ~");
        }
    };

    const handleCloseCreatorModal = () => {
        setIsCreatorModalOpen(false);
    };

    const handleConfirmCreator = () => {
        setIsCreatorModalOpen(false);
        readVoices();
    };

    const handleEdit = (id: number) => {
        console.log('Edit voice:', id);
    };

    const handleDelete = (id: number) => {
        voicesApi.deleteVoice(id).then((res:any)=>{
            console.log("deleteVoice",res);
            readVoices();
        });
    };

    return (
        <Flex vertical >
            <Title level={3} style={{color:"white"}}>Voice List</Title>
            <Divider style={{ borderColor: '#3a3a3a' }}/>
            <Row>
                <Col span={18}>
                    <Flex align="center" className="createButton" onClick={handleCreateVoice}>
                        <Flex align="center" justify="center" className="plusIcon"><img src={icons.plus} style={{width:"35px",height:"35px"}} alt="" /></Flex>
                        <Text className="buttonText">Create a voice clone</Text>
                    </Flex>
                </Col>
            </Row>
            <Row>
                <Col span={18}>
                    <VoiceCloneList 
                        items={voices}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </Col>
            </Row>

            {/* 质量选择模态框 */}
            <QualitySelectionModal
                isOpen={isQualityModalOpen}
                onClose={handleCloseQualityModal}
                onQualitySelect={handleQualitySelect}
            />
            {/* 添加创作者语音模态框 */}
            <VoiceModal
                isOpen={isCreatorModalOpen}
                onClose={handleCloseCreatorModal}
                onConfirm={handleConfirmCreator}
            />
        </Flex>
    );
}

export default VoiceListPage;