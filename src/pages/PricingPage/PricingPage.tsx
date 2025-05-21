import React, { useState } from "react";
import { Typography, Divider, Segmented, Row, Col, Card, Button } from "antd";

const { Title, Text } = Typography;

const PricingPage: React.FC = () => {
  const [billingType, setBillingType] = useState("Monthly");

  const monthlyPlans = [
    {
      title: "Starter",
      price: "$49",
      frequency: "/month",
      features_title: "Includes",
      description: "Fit in agencies manage one or two creators or solo creators.",
      features: [
        "160 voice clones",
        "400,000 credits/month (0.1 usd/min)",
        "~500 min real-time audio calls",
        "basic ambient SFX included",
        "24/7 AI Customer Support"
      ],
      button: "Get Plan"
    },
    {
      title: "Pro",
      price: "$499",
      frequency: "/month",
      features_title: "Everything in Starter, plus",
      description: "Fit in agencies managing multiple creators from 5-20.",
      features: [
        "860 voice clones",
        "58,000,000 credits/month (0.07 usd/min)",
        "~7200 mins real-time audio calls",
        "premium NSFW tones & ambient SFX",
        "1 on 1 Client Support & 24/7 AI customer support"
      ],
      button: "Get Plan"
    },
    {
      title: "Enterprise",
      price: "Customs",
      features_title: "Everything in Pro, plus",
      frequency: "",
      description: "All agencies manage above 20 creators.",
      features: [
        "Custom premium voice clones",
        "real-time calls with premium quality",
        "Custom NSFW tones & SFX",
        "Custom credits are included"
      ],
      button: "Get support"
    }
  ];

  // 计算年付价格（打七折）
  const yearlyPlans =[
    {
      title: "Starter",
      price: "$36",
      frequency: "/month",
      features_title: "Includes",
      description: "Fit in agencies manage one or two creators or solo creators.",
      features: [
        "160 voice clones",
        "400,000 credits/month (0.1 usd/min)",
        "~500 min real-time audio calls",
        "basic ambient SFX included",
        "24/7 AI Customer Support"
      ],
      button: "Get Plan"
    },
    {
      title: "Pro",
      price: "$374",
      frequency: "/month",
      features_title: "Everything in Starter, plus",
      description: "Fit in agencies managing multiple creators from 5-20.",
      features: [
        "860 voice clones",
        "58,000,000 credits/month (0.07 usd/min)",
        "~7200 mins real-time audio calls",
        "premium NSFW tones & ambient SFX",
        "1 on 1 Client Support & 24/7 AI customer support"
      ],
      button: "Get Plan"
    },
    {
      title: "Enterprise",
      price: "Customs",
      features_title: "Everything in Pro, plus",
      frequency: "",
      description: "All agencies manage above 20 creators.",
      features: [
        "Custom premium voice clones",
        "real-time calls with premium quality",
        "Custom NSFW tones & SFX",
        "Custom credits are included"
      ],
      button: "Get support"
    }
  ];

  // 根据选择的付费类型返回对应的价格方案
  const currentPlans = billingType === "Monthly" ? monthlyPlans : yearlyPlans;

  return (
    <div style={{ padding: "24px" }}>
      <Title style={{ color: "white" }}>Pricing</Title>
      <Divider className="textToSpeechDivider" />
      <Segmented
        options={["Monthly", "Yearly"]}
        value={billingType}
        onChange={(val) => setBillingType(val.toString())}
        style={{ marginBottom: 24 }}
      />
      <Row gutter={[24, 24]} justify="center" style={{ display: 'flex', alignItems: 'stretch' }}>
        {currentPlans.map((plan) => (
          <Col xs={24} sm={12} md={8} key={plan.title} style={{ display: 'flex' }}>
            <Card
              style={{ background: "#1e1e1e", color: "white", flex: 1, display: 'flex', flexDirection: 'column' }}
              headStyle={{ color: "white" }}
              bodyStyle={{ color: "white", flex: 1, display: 'flex', flexDirection: 'column' }}
              bordered={false}
            >
              <Title level={2} style={{ color: "white",margin:0 ,marginBottom:10}}> {plan.title}</Title>
              <Title level={1} style={{ color: "white" ,margin:0}}>
                {plan.price}
                <span style={{ fontSize: 16 }}>{plan.frequency}</span>
              </Title>
              {/* {billingType === "Yearly" && plan.price !== "Customs" && (
                <Text type="success" style={{ fontSize: 14 }}>
                  Save 30% with yearly billing
                </Text>
              )} */}
              <Title level={5} style={{ color: "white" }}>{plan.description}</Title>
              <Title level={5} style={{ color: "white" }}>{plan.features_title}</Title>
              <ul style={{ color: "white", paddingLeft: 20, flex: 1 }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{ paddingBottom: 3 }}>{feature}</li>
                ))}
              </ul>
              <Button type="primary" block style={{ marginTop: 16 }}>
                {plan.button}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PricingPage;