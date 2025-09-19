import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, Alert } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterDataType } from "../types/types";
import { RegisterFormSchema } from "./schema";
import { Register } from "../../../../api/auth";
import { queryClient } from "../../../../main";

const defaultValues: RegisterDataType = {
  email: "",
  username: "",
  password: "",
  password_confirmation: "",
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDataType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues,
  });

  const {
    mutate: handleRegister,
    isError,
    error,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: Register,
    onSuccess: (res) => {
      if (!res) return;
      console.log(res, "succesregister");

      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login"); // navigate to login after success
    },
  });

  const onSubmit = (values: RegisterDataType) => {
    handleRegister(values);
    console.log(values);
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      layout="vertical"
      className="max-w-md mx-auto space-y-4"
    >
      {isError && (
        <Alert
          message={(error as Error)?.message || "Registration failed"}
          type="error"
          showIcon
        />
      )}

      <Form.Item
        label="Email"
        validateStatus={errors.email ? "error" : ""}
        help={errors.email?.message}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input placeholder="Enter your email" {...field} />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Username"
        validateStatus={errors.username ? "error" : ""}
        help={errors.username?.message}
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input placeholder="Enter your username" {...field} />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        validateStatus={errors.password ? "error" : ""}
        help={errors.password?.message}
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password placeholder="Enter your password" {...field} />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        validateStatus={errors.password_confirmation ? "error" : ""}
        help={errors.password_confirmation?.message}
      >
        <Controller
          name="password_confirmation"
          control={control}
          render={({ field }) => (
            <Input.Password placeholder="Confirm your password" {...field} />
          )}
        />
      </Form.Item>

      <Form.Item>
        <Button className="!bg-primary" type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form.Item>

      <div className="text-center">
        <span className="mr-1 text-sm text-gray-500">Already member?</span>
        <Link to="/login" className="!text-[#FF4000] font-medium">
          Login
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;
