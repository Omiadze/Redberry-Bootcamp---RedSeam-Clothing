import React from "react";
import { Card, Typography } from "antd";
import LoginForm from "./components/login-form";
import RedSeamImg from "../../assets/redseamImg.png";

const { Title } = Typography;

const Login: React.FC = () => {
  return (
    <div className="flex gap-28 h-full ">
      <img src={RedSeamImg} alt="" />
      <div className="flex items-center justify-center mr-24">
        <Card className=" !border-none">
          <div className="mb-4 text-left">
            <Title className="!text-[42px] !font-semibold !text-dark-blue">
              Log in
            </Title>
          </div>

          <LoginForm />
        </Card>
      </div>
    </div>
  );
};

export default Login;
