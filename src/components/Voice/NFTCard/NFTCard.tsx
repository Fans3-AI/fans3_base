import { Card, Typography } from "antd";
const { Text } = Typography;

interface NFTCardProps {
  NftImageUrl: string | undefined | null;
  speechId: number | undefined;
  voiceName: string;
  onCardClick: (speechId: number | undefined) => void; // 新增一个回调函数
}

const NFTCard: React.FC<NFTCardProps> = ({
  NftImageUrl,
  speechId,
  voiceName,
  onCardClick, // 从父组件接收回调函数
}) => {
  return (
    <Card
      style={{
        width: 80,
        height: 100,
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      bodyStyle={{ padding: 0 }}
      onClick={() => onCardClick(speechId)} // 点击时触发回调
    >
      <img
        src={NftImageUrl as string}
        alt="NFT"
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
          display: "block",
          borderRadius: "6px",
        }}
      />
      <Text style={{ display: "block", width: "100%", textAlign: "center" }}>
        {voiceName}
      </Text>
    </Card>
  );
};

export default NFTCard;
