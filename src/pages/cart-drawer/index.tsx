import React from "react";
import { Drawer, Button, Typography, Row, Image } from "antd";
import { useCart } from "../../react-query/query";
import {
  useRemoveFromCart,
  useUpdateCartItem,
} from "../../react-query/mutation";
import CartErrorPage from "./components/cart-404";
import QuantitySelector from "./components/selector-quantity";

const { Title, Text } = Typography;

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { data: cartItems, isLoading, isError } = useCart();
  console.log(cartItems, "cart");

  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveFromCart();

  if (isLoading) return <p>Loading cart...</p>;

  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const delivery = 5;
  const total = subtotal ? subtotal + delivery : null;

  return (
    <Drawer
      title={`Shopping cart (${cartItems?.length ?? 0})`}
      placement="right"
      onClose={onClose}
      open={open}
      size={540}
    >
      {isError || !cartItems?.length ? (
        <CartErrorPage />
      ) : (
        <>
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
              {cartItems.map((item) => (
                <div className="flex w-[460px] gap-2 mb-7" key={item.id}>
                  <div className="flex justify-center items-center w-24 h-32 border-thin border-grey rounded-xl">
                    <Image src={item.cover_image} width={60} preview={false} />
                  </div>

                  <div
                    className="flex flex-col h-32 justify-between py-1"
                    style={{ width: 285 }}
                  >
                    <Text strong>{item.name}</Text>
                    <Text type="secondary">{item.color}</Text>
                    <Text type="secondary">{item.size}</Text>
                    <QuantitySelector
                      value={item.quantity}
                      min={1}
                      onChange={(value) =>
                        updateCartItem.mutate({
                          productId: item.id,
                          body: { quantity: value },
                        })
                      }
                    />
                  </div>

                  <div
                    className="flex flex-col justify-between h-32 py-1"
                    style={{ flexShrink: 0, width: "auto" }}
                  >
                    <Text className="!text-center">${item.total_price}</Text>
                    <Button
                      className="!text-blue !text-xs"
                      type="link"
                      size="small"
                      danger
                      onClick={() => removeCartItem.mutate(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <Row justify="space-between">
                <Text>Items subtotal</Text>
                <Text>${subtotal}</Text>
              </Row>
              <Row justify="space-between">
                <Text>Delivery</Text>
                <Text>${delivery}</Text>
              </Row>
              <Row justify="space-between" align="middle">
                <Title className="!m-0" level={4}>
                  Total
                </Title>
                <Title className="!m-0" level={4}>
                  ${total}
                </Title>
              </Row>

              <Button
                type="primary"
                block
                size="large"
                style={{
                  marginTop: "60px",
                  backgroundColor: "orangered",
                  borderColor: "orangered",
                }}
              >
                Go to checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;
