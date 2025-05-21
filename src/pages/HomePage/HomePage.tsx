import React, { useEffect, useState } from "react";
import { Card, Typography, Row, Col, List, Avatar, Skeleton, Flex } from "antd";
import './HomePage.css';
import * as icons from "../../assets/icons";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

interface CreatorType {
  id: string;
  name: string;
  avatar: string;
  fans: number;
  messages: number;
  loading?: boolean;
}

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [creators, setCreators] = useState<CreatorType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      const mockData: CreatorType[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
          fans: 1200,
          messages: 450
        },
        {
          id: '2',
          name: 'Emma Wilson',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
          fans: 850,
          messages: 320
        },
        {
          id: '3',
          name: 'Olivia Brown',
          avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
          fans: 2100,
          messages: 780
        }
      ];
      setCreators(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const cards = [
    {
      icon: <img src={icons.lightning} className="cardIcon" alt="Lightning" />,
      text: "Send messages to fans"
    },
    {
      icon: <img src={icons.carouselVideo} className="cardIcon" alt="Pie" />,
      text: "Selling PPV"
    },
    {
      icon: <img src={icons.like} className="cardIcon" alt="Layers" />,
      text: "Enhance fan relationships"
    },
    {
      icon: <img src={icons.plasticSurgery} className="cardIcon" alt="Like" />,
      text: "Real 1V1 message"
    }
  ];

  const handleCardClick = () => {
    navigate('/home/textToSpeech');
  };

  return (
    <Flex vertical className="homePage">
      <Title  style={{color:"white"}}>Welcome back!</Title>
      <Title style={{color:"white"}} level={4}>Try using it in Onlyfans</Title>
      <Row>
        <Col span={16}>
          <Row gutter={[24, 24]}>
            {cards.map((card, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card 
                  hoverable 
                  className="card"
                  bodyStyle={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '24px'
                  }}
                  onClick={handleCardClick}
                >
                  <div className="iconContainer">
                    {card.icon}
                  </div>
                  <Text className="cardText">{card.text}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Title style={{color:"white"}}level={4}>My Onlyfans Creator</Title>
      <Row>
        <Col  xs={24} sm={12} md={6}>
          <Card className="creatorCard">
            <List
              itemLayout="horizontal"
              dataSource={creators}
              renderItem={(item) => (
                <List.Item>
                  <Skeleton avatar title={false} loading={loading} active>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a className="creatorName">{item.name}</a>}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};

export default HomePage;