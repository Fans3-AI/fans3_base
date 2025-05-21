import React, { useState } from "react";
import { Typography, Card, Row, Col, Divider, Flex } from "antd";
import "./BillingPage.css";
import UsageStatisticsTab from "../../components/Bill/UsageStatisticsTab/UsageStatisticsTab";
import PlansTab from "../../components/Bill/PlansTab/PlansTab";
const { Title, Text } = Typography;

const CustomTabs: React.FC<{ tabs: string[], onSelect: (key: number) => void, selectedKey: number }> = ({ tabs, onSelect, selectedKey }) => (
  <div style={{ display: 'flex' , paddingLeft: '20px'}}>
    {tabs.map((tab, index) => (
      <div
        key={index}
        onClick={() => onSelect(index)}
        style={{
          padding: '10px 20px',
          cursor: 'pointer',
          borderBottom: selectedKey === index ? '2px solid #1890ff' : 'none',
          color: selectedKey === index ? '#1890ff' : 'white',
        }}
      >
        {tab}
      </div>
    ))}
  </div>
);

const BillingPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Flex vertical flex={1}>
      <Title level={3} style={{ color: "white" }}>Billing</Title>
      <Divider className="textToSpeechDivider" />
      <Row>
        <Col span={12}>
          <CustomTabs
            tabs={["Plans", "Usage Statistics", "Billing details"]}
            onSelect={setSelectedTab}
            selectedKey={selectedTab}
          />
          <div style={{ padding: '20px', color: 'white' }}>
            {selectedTab === 0 && <PlansTab />}
            {selectedTab === 1 && <UsageStatisticsTab />}
            {selectedTab === 2 && <BillingDetailsTab />}
          </div>
        </Col>
      </Row>
    </Flex>
  );
};

const BillingDetailsTab = () => (
  <Card style={{ background: "#1a1a1a", color: "white" }}>
    <Text style={{ color: "white" }}>Billing details component (simulated)</Text>
  </Card>
);

export default BillingPage;