import { forwardRef, useImperativeHandle, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Form, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutFormSchema, type CheckoutFormData } from "./schema";
import { useAuthContext } from "../../../../context/auth/hooks";

const { Title } = Typography;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
}

const defaultValues: CheckoutFormData = {
  name: "",
  surname: "",
  email: "",
  address: "",
  zip_code: "",
};

const CheckoutForm = forwardRef(({ onSubmit }: CheckoutFormProps, ref) => {
  const { user } = useAuthContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues,
  });

  // Prefill form with user email if available
  useEffect(() => {
    if (user?.email) {
      reset({
        ...defaultValues,
        email: user.email, // prepopulate email
      });
    }
  }, [user?.email, reset]);

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(onSubmit)(),
  }));

  return (
    <div className="w-1/2">
      <Title className="!mb-8 !mt-0 !text-2xl !font-medium">
        Order details
      </Title>
      <Form layout="vertical" className="space-y-6">
        <div className="flex gap-4">
          <Form.Item
            validateStatus={errors?.name ? "error" : ""}
            help={errors?.name?.message}
            className="flex-1 !mb-0 !text-sm !font-normal"
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  className="!text-sm !font-normal"
                  placeholder="Name"
                  size="large"
                  {...field}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            validateStatus={errors?.surname ? "error" : ""}
            help={errors?.surname?.message}
            className="flex-1 !mb-0"
          >
            <Controller
              name="surname"
              control={control}
              render={({ field }) => (
                <Input
                  className="!text-sm !font-normal"
                  placeholder="Surname"
                  size="large"
                  {...field}
                />
              )}
            />
          </Form.Item>
        </div>
        <Form.Item
          validateStatus={errors?.email ? "error" : ""}
          help={errors?.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                className="!text-sm !font-normal"
                prefix={<MailOutlined />}
                placeholder="Email"
                size="large"
                {...field}
              />
            )}
          />
        </Form.Item>
        <div className="flex gap-4">
          <Form.Item
            validateStatus={errors?.address ? "error" : ""}
            help={errors?.address?.message}
            className="flex-1 !mb-0"
          >
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  className="!text-sm !font-normal"
                  placeholder="Address"
                  size="large"
                  {...field}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            validateStatus={errors?.zip_code ? "error" : ""}
            help={errors?.zip_code?.message}
            className="flex-1 !mb-0"
          >
            <Controller
              name="zip_code"
              control={control}
              render={({ field }) => (
                <Input
                  className="!text-sm !font-normal"
                  placeholder="Zip code"
                  size="large"
                  {...field}
                />
              )}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
});

export default CheckoutForm;
