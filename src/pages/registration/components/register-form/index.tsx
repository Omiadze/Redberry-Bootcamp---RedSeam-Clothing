import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, Alert, Upload } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterFormDataType } from "../types/types";
import { RegisterFormSchema } from "./schema";
import { Register } from "../../../../api/auth";
import { queryClient } from "../../../../main";
import CameraSvg from "../../../../assets/camera.svg";

const defaultValues: RegisterFormDataType = {
  email: "",
  username: "",
  password: "",
  password_confirmation: "",
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [backendErrors, setBackendErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormDataType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues,
  });

  const usernameValue = watch("username");
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("password_confirmation");

  const {
    mutate: handleRegister,
    isError,
    error,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: Register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login");
    },
    onError: (err: any) => {
      try {
        const data = err.response?.data;
        setBackendErrors(data?.errors || null);
      } catch {
        setBackendErrors(null);
      }
    },
  });

  const handleAvatarChange = (info: any) => {
    const file = info.file.originFileObj || info.file;

    if (file && file.type.startsWith("image/")) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const onSubmit = (values: RegisterFormDataType) => {
    setBackendErrors(null);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);
    if (avatarFile) formData.append("avatar", avatarFile);

    handleRegister(formData as any);
  };

  const uploadProps = {
    beforeUpload: () => false,
    onChange: handleAvatarChange,
    showUploadList: false,
    accept: "image/*",
    multiple: false,
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden border-[1px] border-[#E1DFE1] flex items-center justify-center">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <img src={CameraSvg} alt="" />
          )}
        </div>

        <div className="flex gap-3">
          {avatarPreview ? (
            <div className="flex gap-3">
              <Upload {...uploadProps}>
                <Button
                  type="link"
                  className="!p-0 !h-auto text-gray-600 hover:text-gray-800"
                >
                  Upload new
                </Button>
              </Upload>
              <Button
                type="link"
                className="!p-0 !h-auto text-gray-600 hover:text-gray-800"
                onClick={handleRemoveAvatar}
              >
                Remove
              </Button>
            </div>
          ) : (
            <Upload {...uploadProps}>
              <Button
                type="link"
                className="!p-0 !h-auto text-gray-600 hover:text-gray-800"
              >
                Upload image
              </Button>
            </Upload>
          )}
        </div>
      </div>

      <Form
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
        className="space-y-4"
      >
        {isError && !backendErrors && (
          <Alert
            message={(error as Error)?.message || "Registration failed"}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        {/* USERNAME */}
        <Form.Item
          validateStatus={
            errors.username || backendErrors?.username ? "error" : ""
          }
          help={errors.username?.message || backendErrors?.username?.[0]}
        >
          <div className="relative">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Username"
                  {...field}
                  className="rounded-lg h-10 !text-sm !font-normal pl-6 placeholder:!text-[#3E424A] placeholder:!opacity-100"
                />
              )}
            />
            {!usernameValue && (
              <span className="absolute left-[88px] top-1/2 -translate-y-1/2 text-red-500">
                *
              </span>
            )}
          </div>
        </Form.Item>

        {/* EMAIL */}
        <Form.Item
          validateStatus={errors.email || backendErrors?.email ? "error" : ""}
          help={errors.email?.message || backendErrors?.email?.[0]}
        >
          <div className="relative">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Email"
                  {...field}
                  className="rounded-lg h-10 !text-sm !font-normal pl-6 placeholder:!text-[#3E424A] placeholder:!opacity-100"
                />
              )}
            />
            {!emailValue && (
              <span className="absolute left-[54px] top-1/2 -translate-y-1/2 text-red-500">
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
                  className="custom-placeholder rounded-lg h-10 !text-sm !font-normal pl-6 placeholder:!text-[#3E424A] placeholder:!opacity-100"
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

        {/* CONFIRM PASSWORD */}
        <Form.Item
          validateStatus={errors.password_confirmation ? "error" : ""}
          help={errors.password_confirmation?.message}
        >
          <div className="relative">
            <Controller
              name="password_confirmation"
              control={control}
              render={({ field }) => (
                <Input.Password
                  placeholder="Confirm password"
                  {...field}
                  className="custom-placeholder rounded-lg h-10 !text-sm !font-normal pl-6 placeholder:!text-[#3E424A] placeholder:!opacity-100"
                />
              )}
            />
            {!confirmPasswordValue && (
              <span className="absolute left-[145px] top-1/2 -translate-y-1/2 text-red-500">
                *
              </span>
            )}
          </div>
        </Form.Item>

        {/* AVATAR ERROR */}
        {backendErrors?.avatar && (
          <Alert
            message={backendErrors.avatar[0]}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        <Form.Item className="!mt-8">
          <Button
            type="primary"
            htmlType="submit"
            block
            className="!bg-[#FF4000] hover:!bg-[#FF4000]/90 !border-[#FF4000] !rounded-[10px] !h-11 text-base font-medium !text-white"
          >
            Register
          </Button>
        </Form.Item>

        <div className="text-center !mt-6">
          <span className="text-sm text-[#3E424A]">Already member? </span>
          <Link
            to="/login"
            className="!text-[#FF4000] !font-medium hover:!text-[#FF4000]/80"
          >
            Log in
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
