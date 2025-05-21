import { Button } from "antd";
import { Typography } from "antd";
const { Text } = Typography;
import { Card } from "antd";

import { Space } from "antd";

const PlansTab = () => (
    <Space direction="vertical" size="large" align="center">
    <Card style={{ background: "#131313", color: "white" ,border:"none"}}>
    <Space direction="vertical" size="large">
    <Text strong style={{ fontSize: 16, background: "#292929", color: "white",padding:"10px",paddingLeft:"20px",borderRadius:"20px" }}>Pro version <Text type="secondary" style={{color:"white"}}>(monthly payment)</Text></Text> 
    <Text style={{ marginTop: 8,color:"white"}}>Expiration date: 18/03/2025</Text>
    <Space style={{ marginTop: 16 }}>
      <Button type="primary">Upgrade Your Plan</Button>
      <Button type="link" danger>cancel plan</Button>
    </Space>
    </Space>
  </Card>
</Space>
);

export default PlansTab;        