import React, { useEffect, useState } from 'react';
import { Layout, Menu, Flex, Typography, Button, Space } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import * as icons from '../../../assets/icons'; 
import { ApiClient } from "../../../utils/ApiClient";
import { adminMenuItems, userMenuItems } from '../../../utils/menuItems'; 
import './Home.css';
import { UserPublic } from '../../../api/fe-client-typescript';

const {Text,Title}=Typography;
const {  Content, Sider } = Layout;

const Home: React.FC = () => {
  const [userRole, setUserRole] = useState<string>(''); 
  const [userInfo, setUserInfo] = useState<UserPublic | null>();
  const navigate = useNavigate(); 
  const location = useLocation();  
  const {usersApi}=ApiClient
  useEffect(()=>{
      usersApi.readUserMe().then((res:UserPublic)=>{  
      localStorage.setItem("userInfo",JSON.stringify(res));
      setUserRole(res?.roleName as string); 
      setUserInfo(res);
     })
  },[])
  const handleMenuClick = (key: string) => {
    const selectedItem = getMenuItems().find(item => item.key === key);
    if (selectedItem) {
      navigate(selectedItem.path); 
    }
  };
  const getSelectedKey = () => {
    const currentPath = location.pathname;
    const selectedItem = getMenuItems().find(item => item.path === currentPath);
    return selectedItem ? selectedItem.key : '1';  
  };

  const handleLogout = () => {
    localStorage.clear()
     navigate('/');
  };
  const getMenuItems = () => {
    return userRole === 'Admin' ? adminMenuItems : userMenuItems;
  };
  const handleToTelegram = () => {
    navigate('/home/PricingPage');
  };

  return (
    <Layout>
      <Layout>
        <Sider collapsedWidth="0" style={{ paddingTop: "25px", backgroundColor: "#1e1e1e" }}>
          <Flex vertical={true} justify="space-between" style={{ height: '100%' }}>
            <Flex vertical align="flex-start" style={{ paddingLeft: "24px" }}>
              <Title level={3} className="sider-title-left">fans3</Title>
              <Text className="sider-email-left">{userInfo?.email}</Text>
            </Flex>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[getSelectedKey()]}  
              onClick={({ key }) => handleMenuClick(key)}
              style={{ flex: 1, backgroundColor: "#1e1e1e" }} // 更改背景色为深灰色
            >
              {/* 非分组菜单项 */}
              {getMenuItems().filter(item => item.group === null).map(item => (
                <Menu.Item key={item.key} icon={<img src={icons[item.icon as keyof typeof icons]} alt={item.label} className='iconImg'/>}>
                  {item.label}
                </Menu.Item>
              ))}
              
              {/* Voice Tools 分组 */}
              {getMenuItems().some(item => item.group === 'Voice Tools') && (
                <Menu.ItemGroup 
                  key="voice-tools-group" 
                  title={<span style={{ color: '#aaa', fontSize: '12px' }}>Voice Tools</span>}
                >
                  {getMenuItems()
                    .filter(item => item.group === 'Voice Tools')
                    .map(item => (
                      <Menu.Item key={item.key} icon={<img src={icons[item.icon as keyof typeof icons]} alt={item.label} className='iconImg'/>}>
                        {item.label}
                      </Menu.Item>
                    ))
                  }
                </Menu.ItemGroup>
              )}
              
              {/* Console 分组 */}
              {getMenuItems().some(item => item.group === 'Console') && (
                <Menu.ItemGroup 
                  key="console-group" 
                  title={<span style={{ color: '#aaa', fontSize: '12px' }}>Console</span>}
                >
                  {getMenuItems()
                    .filter(item => item.group === 'Console')
                    .map(item => (
                      <Menu.Item key={item.key} icon={<img src={icons[item.icon as keyof typeof icons]} alt={item.label} className='iconImg'/>}>
                        {item.label}
                      </Menu.Item>
                    ))
                  }
                </Menu.ItemGroup>
              )}
            </Menu>
            <Space direction="vertical" style={{ padding: '16px', marginTop: 'auto', width: '100%', height: "100px", color: "white" }}>
              <Flex vertical>
              <Button 
                  onClick={handleToTelegram} 
                  style={{ 
                    border: 'none', 
                    backgroundColor: 'black', 
                    padding: 0, 
                    marginLeft: "2px", 
                    marginBottom: "5px",
                    color: "white", 
                    width: "140px" 
                  }} 
                  onMouseDown={(e) => e.preventDefault()} 
                >
                 
                  Upgrade
                </Button>
                <Button 
                  onClick={handleLogout} 
                  style={{ 
                    border: 'none', 
                    backgroundColor: 'black', 
                    padding: 0, 
                    marginLeft: "2px", 
                    color: "white", 
                    width: "140px" 
                  }} 
                  onMouseDown={(e) => e.preventDefault()} 
                >
                  <img src={icons.logout} alt="Exit" style={{ width: '20px', height: '20px', filter: 'invert(100%)' }} />
                  Exit
                </Button>
              </Flex>
            </Space>
          </Flex>
        </Sider>

        <Content style={{borderLeft:"1px white solid"}}>
          <Flex
            style={{
              paddingLeft: 20,
              height: "100vh",
              overflowY: 'auto',
              backgroundColor: "black"
            }}
            vertical
          >
            <Outlet />
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
