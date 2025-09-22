import React from "react";
import {
  Drawer,
  Button,
  Typography,
  Divider,
  Row,
  Col,
  Image,
  InputNumber,
} from "antd";
import { useCart } from "../../react-query/query";
import {
  useRemoveFromCart,
  useUpdateCartItem,
} from "../../react-query/mutation";
import CartErrorPage from "./components/cart-404";

const { Title, Text } = Typography;

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { data: cartItems, isLoading, isError } = useCart();

  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveFromCart();

  if (isLoading) return <p>Loading cart...</p>;
  // if (isError || !cartItems?.length) {
  //   return <CartErrorPage />;
  // }

  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const delivery = 5;
  const total = subtotal ? subtotal + delivery : null;

  return (
    <Drawer
      className="!w-[400px]"
      title={`Shopping cart (${cartItems?.length ?? 0})`}
      placement="right"
      onClose={onClose}
      open={open}
    >
      {isError || !cartItems?.length ? (
        <CartErrorPage />
      ) : (
        <>
          {cartItems.map((item) => (
            <Row key={item.id} gutter={16} style={{ marginBottom: "20px" }}>
              <Col span={6}>
                <Image src={item.cover_image} width={60} preview={false} />
              </Col>
              <Col span={14}>
                <Text strong>{item.name}</Text>
                <br />
                <Text type="secondary">{item.color}</Text>
                <br />
                <Text type="secondary">Size: {item.size}</Text>
                <br />
                <Text>${item.price}</Text>
              </Col>
              <Col span={4} style={{ textAlign: "center" }}>
                <InputNumber
                  min={1}
                  defaultValue={item.quantity}
                  size="small"
                  onChange={(value) =>
                    updateCartItem.mutate({
                      productId: item.id,
                      body: { quantity: value as number },
                    })
                  }
                />
                <br />
                <Button
                  type="link"
                  size="small"
                  danger
                  onClick={() => removeCartItem.mutate(item.id)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}

          <Divider />

          <Row justify="space-between">
            <Text>Items subtotal</Text>
            <Text>${subtotal}</Text>
          </Row>
          <Row justify="space-between">
            <Text>Delivery</Text>
            <Text>${delivery}</Text>
          </Row>
          <Row justify="space-between">
            <Title level={4}>Total</Title>
            <Title level={4}>${total}</Title>
          </Row>

          <Button
            type="primary"
            block
            size="large"
            style={{
              marginTop: "20px",
              backgroundColor: "orangered",
              borderColor: "orangered",
            }}
          >
            Go to checkout
          </Button>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;
