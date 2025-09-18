import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, Alert } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Login } from "../../../../api/auth";
import { AfterLoginSuccessn } from "../utils";
import { queryClient } from "../../../../main";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "./schema";
import type { LoginDataTypes } from "../types/types";

const defaultValues: LoginDataTypes = {
  email: "",
  password: "",
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toNavigate =
    location?.state?.from?.pathname + location?.state?.from?.search || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataTypes>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues,
  });

  const {
    mutate: handleLogin,
    isError,
    error,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
    onSuccess: (res) => {
      if (!res) return;
      AfterLoginSuccessn({
        token: res.token,
        user: res.user,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate(toNavigate, { replace: true });
    },
  });

  const onSubmit = (values: LoginDataTypes) => {
    handleLogin(values);
    console.log(values);
  };

  return (
    <div>
      <Form
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
        className="max-w-md mx-auto space-y-4"
      >
        {isError && (
          <Alert
            message={(error as Error)?.message || "Login failed"}
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

        <Form.Item>
          <Button
            className="!bg-[#FF4000]"
            type="primary"
            htmlType="submit"
            block
          >
            Log in
          </Button>
        </Form.Item>

        <div className="text-center">
          <span className="text-gray-500 text-sm mr-1">Not a member?</span>
          <Link to="/signup" className="!text-[#FF4000] font-medium">
            Register
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
