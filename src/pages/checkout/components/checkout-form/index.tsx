import { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Form, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutFormSchema, type CheckoutFormData } from "./schema";

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

// Use forwardRef to allow ref from parent
const CheckoutForm = forwardRef(({ onSubmit }: CheckoutFormProps, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues,
  });

  // Expose a `submit` method to parent
  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(onSubmit)(),
  }));

  return (
    <div className="bg-white">
      <Title level={3} className="!mb-8 !mt-0 !text-gray-800">
        Order details
      </Title>
      <Form layout="vertical" className="space-y-6">
        <div className="flex gap-4">
          <Form.Item
            validateStatus={errors?.name ? "error" : ""}
            help={errors?.name?.message}
            className="flex-1 !mb-0"
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input placeholder="Name" size="large" {...field} />
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
                <Input placeholder="Surname" size="large" {...field} />
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
                <Input placeholder="Address" size="large" {...field} />
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
                <Input placeholder="Zip code" size="large" {...field} />
              )}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
});

export default CheckoutForm;
