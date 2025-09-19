import React from "react";
import { Card, Typography } from "antd";
import LoginForm from "./components/login-form";
import RedSeamImg from "../../assets/redseamImg.png";

const { Title } = Typography;

const Login: React.FC = () => {
  return (
    <div className="flex justify-between h-full sm:h-screen ">
      <img src={RedSeamImg} alt="" />
      <div className="flex items-center justify-center mr-24">
        <Card
          className="w-[370px] !border-none"
          //   bordered
          // bodyStyle={{ padding: "24px" }}
          //   hoverable
        >
          <div className="mb-4 text-left">
            <Title level={4}>Log in</Title>
          </div>

          <LoginForm />
        </Card>
      </div>
    </div>
  );
};

export default Login;
