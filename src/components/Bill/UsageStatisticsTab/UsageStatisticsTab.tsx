import { Col, Row, Table } from "antd";
import CustomPagination from "../../Common/CustomPagination/CustomPagination";
import { useState } from "react";
const PAGE_SIZE = 5;
const UsageStatisticsTab = () => {
    const [currentPage, setCurrentPage] = useState(1);
    // 计算当前页的数据
    // const startIndex = (currentPage - 1) * PAGE_SIZE;
    // const endIndex = startIndex + PAGE_SIZE;
    const data = [
      { key: '1', date: "03/18/2025 17:33", operation: "text to speech", change: -12 },
      { key: '2', date: "03/18/2025 17:33", operation: "Point update", change: 400000 },
      { key: '3', date: "03/18/2025 17:33", operation: "text to speech", change: -12 },
      { key: '4', date: "03/18/2025 17:33", operation: "text to speech", change: -12 },
      { key: '5', date: "03/18/2025 17:33", operation: "text to speech", change: -12 },
    ];
  
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        key: 'operation',
      },
      {
        title: 'Point changes',
        dataIndex: 'change',
        key: 'change',
        render: (change: number) => (
          <span style={{ color: change > 0 ? "lightblue" : "red" }}>
            {change > 0 ? `+${change}` : change}
          </span>
        ),
      },
    ];
  
    return (
        <>
        <Table
          columns={columns}
          dataSource={data}     
          pagination={false}
          style={{ color: "white" }}
        />
        <Row justify="end" className="paginationRow"  style={{marginTop:"0px",padding:"0px"}}>
          <Col>
            <CustomPagination
              current={currentPage}
              total={data.length}
              pageSize={PAGE_SIZE}
              onChange={setCurrentPage}
            />
          </Col>
        </Row>
        </>
    );
  };    

export default UsageStatisticsTab;