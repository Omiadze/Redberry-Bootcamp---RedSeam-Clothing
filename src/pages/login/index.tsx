import React from "react";
import { Card, Typography } from "antd";
import LoginForm from "./components/login-form";

const { Title } = Typography;

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full py-24 sm:h-screen sm:p-0">
      <Card
        className="w-[370px]"
        bordered
        bodyStyle={{ padding: "24px" }}
        hoverable
      >
        <div className="text-left mb-4">
          <Title level={4}>Log in</Title>
        </div>

        <LoginForm />
      </Card>
    </div>
  );
};

export default Login;
