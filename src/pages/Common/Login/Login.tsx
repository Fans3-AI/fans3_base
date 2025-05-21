import { useNavigate } from "react-router-dom";
import { Input, Form, Button, Card, Typography, Space } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { ApiClient } from "../../../utils/ApiClient";
import { AuthApi, createConfiguration, UserPublic } from "../../../api/fe-client-typescript";
import './Login.css'; // 导入自定义样式
import React from "react";
import {showError,showSuccess} from "../../../utils/message"

const { Title } = Typography;
const configuration = createConfiguration();
const authApi = new AuthApi(configuration);
const {usersApi}=ApiClient

const LoginPage:React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // 处理登录
  const handleLogin = async (values: { username: string; password: string }) => {
    const { username, password } = values;

    try {
      await authApi.login(username, password).then((res)=>{
        showSuccess("Login success");
        localStorage.setItem("isLoggedIn", "true");
        const token = res.accessToken;
        localStorage.setItem("token", token);
        usersApi.readUserMe().then((res:UserPublic)=>{
          localStorage.setItem("userInfo",JSON.stringify(res));
        });
        navigate("/home");
      });
    } catch {
      showError("Username or password error");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        // backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <Title level={2}>fans3</Title>
          </div>

          <Form
            form={form}
            name="login"
            layout="vertical"
            onFinish={handleLogin}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter your username" }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Enter your username"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Enter your password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{ marginTop: 16 }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default LoginPage;