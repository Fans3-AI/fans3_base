import React from 'react';
import { Button, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './CustomPagination.css';

const { Text } = Typography;

interface CustomPaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  current,
  total,
  pageSize,
  onChange,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  const handlePrevPage = () => {
    if (current > 1) {
      onChange(current - 1);
    }
  };

  const handleNextPage = () => {
    if (current < totalPages) {
      onChange(current + 1);
    }
  };

  return (
    <div className="customPagination">
      <Button
        className="pageButton"
        icon={<LeftOutlined />}
        onClick={handlePrevPage}
        disabled={current === 1}
      />
      <div className="pageInfo">
        <Text className="pageText">Page</Text>
        <Text className="pageNumber">{current}</Text>
        <Text className="pageText">of</Text>
        <Text className="pageNumber">{totalPages}</Text>
      </div>
      <Button
        className="pageButton"
        icon={<RightOutlined />}
        onClick={handleNextPage}
        disabled={current === totalPages}
      />
    </div>
  );
};

export default CustomPagination; 