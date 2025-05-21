import React, { useState } from 'react';
import { Avatar, Button, Typography, Row, Col, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import CustomPagination from '../../Common/CustomPagination/CustomPagination';
import './VoiceCloneList.css';
import { VoicePublic } from '../../../api/fe-client-typescript';
import {showSuccess} from "../../../utils/message"
const { Text } = Typography;

interface VoiceCloneListProps {
  items: any[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const PAGE_SIZE = 5;

const VoiceCloneList: React.FC<VoiceCloneListProps> = ({ items = [], onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // 计算当前页的数据
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentItems = items.slice(startIndex, endIndex);

  const handleDelete = (id: number, name: string) => {
    onDelete(id);
    showSuccess(`Successfully deleted ${name}`);
  };

  return (
    <Row className="voiceCloneList">
      <Col span={24} >
        <Row className="listHeader">
          <Col span={5}>
            <Text className="headerText">Onlyfans Creator</Text>
          </Col>
          <Col span={5}>
            <Text className="headerText">Clone quality</Text>
          </Col>
          <Col span={8}>
            <Text className="headerText">Voice status</Text>
          </Col>
          <Col span={4}>
            <Text className="headerText">Actions</Text>
          </Col>
        </Row>
        {currentItems.map(item => (
          <Row key={item.id} className="listItem">
            <Col span={5}>
              <Row align="middle" className="creatorInfo">
                <Col>
                  <Avatar size={40} src={item.profilePic?.downloadUrl} />
                </Col>
                <Col>
                  <Text className="creatorName">{item.name}</Text>
                </Col>
              </Row>
            </Col>
            <Col span={5}>
              <Row align="middle" className="qualityInfo">
                {item.quality === 'High' ? (
                  <Col>
                    <Row align="middle" className="qualityBadge high">
                      <Col>
                        <Row className="dot" />
                      </Col>
                      <Col>
                        <Text>High</Text>
                      </Col>
                    </Row>
                  </Col>
                ) : (
                  <Col>
                    <Text className="standardText">Standard</Text>
                  </Col>
                )}
              </Row>
            </Col>
            <Col span={8}>
              <Row align="middle" className="status">
                <Col>
                  <Row className="statusIcon" />
                </Col>
                <Col>
                  <Text className="statusText">Cloning completed</Text>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <Row className="actions">
                <Col>
                  <Button 
                    className="editButton" 
                    onClick={() => onEdit(item.id)}
                  >
                    Edit profile
                  </Button>
                </Col>
                <Col>
                  <Popconfirm
                    title="Delete Voice Clone"
                    description={`Are you sure you want to delete ${item.name}?`}
                    onConfirm={() => handleDelete(item.id, item.name)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button 
                      className="deleteButton" 
                      icon={<DeleteOutlined />}
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
        <Row justify="end" className="paginationRow"  style={{marginTop:"0px",padding:"0px"}}>
          <Col>
            <CustomPagination
              current={currentPage}
              total={items.length}
              pageSize={PAGE_SIZE}
              onChange={setCurrentPage}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default VoiceCloneList; 