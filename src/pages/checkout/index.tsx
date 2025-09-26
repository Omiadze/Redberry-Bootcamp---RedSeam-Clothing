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

  const { mutate: checkout, isPending, error } = useGoCheckout();

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <CheckoutForm ref={formRef} onSubmit={handleFormSubmit} />
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Order Summary
            </h2>
            <CartContent
              cartItems={cartItems}
              showQuantitySelector={false}
              showRemoveButton={false}
              onButtonClick={() => formRef.current?.submit()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
