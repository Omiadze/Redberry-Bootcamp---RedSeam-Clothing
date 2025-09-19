import React from "react";
import { Card, Typography } from "antd";
import RegisterForm from "./components/register-form";
import RedSeamImg from "../../assets/redseamImg.png";

const { Title } = Typography;

const Register: React.FC = () => {
  return (
    <div className="flex justify-between h-full sm:h-screen">
      <img src={RedSeamImg} alt="" />
      <div className="flex items-center justify-center mr-24">
        <Card className="w-[370px] !border-none">
          <div className="mb-4 text-left">
            <Title level={4}>Register</Title>
          </div>
          <RegisterForm />
        </Card>
      </div>
    </div>
  );
};

export default Register;
