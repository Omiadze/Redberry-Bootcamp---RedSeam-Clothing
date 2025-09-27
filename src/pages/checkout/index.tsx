import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../react-query/query";
import CartContent from "../components/cart-content";
import CheckoutForm from "./components/checkout-form";
import type { CheckoutFormData } from "./components/checkout-form/schema";
import { useGoCheckout } from "../../react-query/mutation";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: cartItems, isLoading, isError } = useCart();

  const { mutate: checkout } = useGoCheckout();

  const formRef = useRef<any>(null);

  const handleFormSubmit = (formData: CheckoutFormData) => {
    console.log("Form values:", formData);

    if (!cartItems?.length) return;

    checkout(formData, {
      onSuccess: (res) => {
        navigate("/order-success", { state: res });
      },
    });
  };

  if (isLoading) return <div className="p-8">Loading cart...</div>;
  if (isError || !cartItems?.length)
    return <div className="p-8">No items in cart</div>;

  return (
    <div className="min-h-screen sm:w-[90%] mx-auto mt-20 mb-20">
      <div className="w-full">
        <h1 className="text-[42px] font-semibold mb-8 ">Checkout</h1>

        <div className="flex w-full justify-between gap-4">
          <div className="bg-[#F8F6F7] rounded-xl p-8 h-[634px] shadow-sm w-[65%]">
            <CheckoutForm ref={formRef} onSubmit={handleFormSubmit} />
          </div>
          <div className="w-[460px]">
            <CartContent
              cartItems={cartItems}
              // showQuantitySelector={false}
              showRemoveButton={false}
              onButtonClick={() => formRef.current?.submit()}
              buttonText="Pay"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
