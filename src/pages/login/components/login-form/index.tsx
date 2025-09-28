import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, Alert } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Login } from "../../../../api/auth";
import { useAfterLogin } from "../utils";
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

  const afterLogin = useAfterLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginDataTypes>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues,
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const {
    mutate: handleLogin,
    isError,
    error,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
    onSuccess: (res) => {
      if (!res) return;
      afterLogin({ token: res.token, user: res.user });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate(toNavigate, { replace: true });
    },
  });

  const onSubmit = (values: LoginDataTypes) => {
    handleLogin(values);
  };

  return (
    <div className="w-[550px]">
      <Form
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
        className="space-y-4"
      >
        {isError && (
          <Alert
            message={(error as Error)?.message || "Login failed"}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        {/* EMAIL */}
        <Form.Item
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <div className="relative">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Email"
                  {...field}
                  className="custom-placeholder rounded-lg h-10 !text-sm !font-normal placeholder:!text-[#3E424A] placeholder:!opacity-100 pl-6"
                />
              )}
            />

            {!emailValue && (
              <span className="absolute left-[52px] top-1/2 -translate-y-1/2 text-red-500">
                *
              </span>
            )}
          </div>
        </Form.Item>

        {/* PASSWORD */}
        <Form.Item
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <div className="relative">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  placeholder="Password"
                  {...field}
                  className="custom-placeholder rounded-lg h-10 !text-sm !font-normal placeholder:!text-[#3E424A] placeholder:!opacity-100 pl-6"
                />
              )}
            />
            {!passwordValue && (
              <span className="absolute left-[82px] top-1/2 -translate-y-1/2 text-red-500">
                *
              </span>
            )}
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="!bg-[#FF4000] hover:!bg-[#FF4000]/90 !border-[#FF4000] !rounded-[10px] !h-11 text-base font-medium !text-white"
          >
            Log in
          </Button>
        </Form.Item>

        <div className="text-center !mt-6">
          <span className="text-sm text-[#3E424A]">Not a member? </span>
          <Link
            to="/register"
            className="!text-[#FF4000] !font-medium hover:!text-[#FF4000]/80"
          >
            Register
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
