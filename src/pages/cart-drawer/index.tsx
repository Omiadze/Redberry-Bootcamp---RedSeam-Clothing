import React from "react";
import { Drawer } from "antd";
import { useCart } from "../../react-query/query";
import CartErrorPage from "./components/cart-404";
import CartContent from "../components/cart-content";
import { useNavigate } from "react-router-dom";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { data: cartItems, isLoading, isError } = useCart();
  const navigate = useNavigate();
  console.log(cartItems, "cart");

  if (isLoading) return <p>Loading cart...</p>;

  const handleCheckout = () => {
    console.log("Going to checkout...");
    navigate("checkout");
  };

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
        <CartContent
          cartItems={cartItems}
          showQuantitySelector={true}
          showRemoveButton={true}
          buttonText="Go to checkout"
          onButtonClick={handleCheckout}
        />
      )}
    </Drawer>
  );
};

export default CartDrawer;
