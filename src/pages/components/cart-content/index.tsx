import React from "react";
import { Button, Typography, Row, Image } from "antd";
import {
  useRemoveFromCart,
  useUpdateCartItem,
} from "../../../react-query/mutation";
import QuantitySelector from "../../cart-drawer/components/selector-quantity";

const { Title, Text } = Typography;

interface CartItem {
  id: number;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  total_price: number;
  cover_image: string;
  images: string[];
  available_colors: string[];
}

interface CartContentProps {
  cartItems: CartItem[];
  showQuantitySelector?: boolean;
  showRemoveButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const CartContent: React.FC<CartContentProps> = ({
  cartItems,
  showQuantitySelector = true,
  showRemoveButton = true,
  buttonText = "Go to checkout",
  onButtonClick,
  className = "",
}) => {
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveFromCart();

  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const delivery = 5;
  const total = subtotal ? subtotal + delivery : null;

  const getImageForColor = (item: CartItem) => {
    const index = item.available_colors.indexOf(item.color);
    return index !== -1 && item.images[index]
      ? item.images[index]
      : item.cover_image;
  };

  return (
    <div className={`flex flex-col justify-between h-full ${className}`}>
      <div className="flex flex-col">
        {cartItems.map((item) => (
          <div
            className="flex w-[460px] gap-2 mb-7"
            key={item.id + item.color + item.size}
          >
            <div className="flex justify-center items-center w-24 h-32 border-thin border-grey rounded-xl">
              <Image src={getImageForColor(item)} width={60} preview={false} />
            </div>

            <div
              className="flex flex-col h-32 justify-between py-1"
              style={{ width: 285 }}
            >
              <Text strong>{item.name}</Text>
              <Text type="secondary">{item.color}</Text>
              <Text type="secondary">{item.size}</Text>
              {showQuantitySelector ? (
                <QuantitySelector
                  value={item.quantity}
                  min={1}
                  onChange={(value: any) =>
                    updateCartItem.mutate({
                      productId: Number(item.id),
                      body: { quantity: value },
                    })
                  }
                />
              ) : (
                <Text className="!text-sm">Quantity: {item.quantity}</Text>
              )}
            </div>

            <div
              className="flex flex-col justify-between h-32 py-1"
              style={{ flexShrink: 0, width: "auto" }}
            >
              <Text className="!text-center">$ {item.total_price}</Text>
              {showRemoveButton && (
                <Button
                  className="!text-blue !text-xs"
                  type="link"
                  size="small"
                  danger
                  onClick={() => removeCartItem.mutate(Number(item.id))}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <Row justify="space-between">
          <Text>Items subtotal</Text>
          <Text>$ {subtotal}</Text>
        </Row>
        <Row justify="space-between">
          <Text>Delivery</Text>
          <Text>$ {delivery}</Text>
        </Row>
        <Row justify="space-between" align="middle">
          <Title className="!m-0" level={4}>
            Total
          </Title>
          <Title className="!m-0" level={4}>
            $ {total}
          </Title>
        </Row>

        <Button
          type="primary"
          className="!text-white !bg-primary !mb-10 !rounded-xl"
          block
          size="large"
          style={{
            height: "59px",
            marginTop: "60px",
            borderColor: "orangered",
          }}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default CartContent;
