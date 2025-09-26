import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CartItemRequest,
  Checkout,
  CheckoutResponse,
} from "../../api/cart/index.types";
import {
  addToCart,
  goCheckout,
  removeFromCart,
  updateCartItem,
} from "../../api/cart";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      body,
    }: {
      productId: number;
      body: CartItemRequest;
    }) => addToCart(productId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      body,
    }: {
      productId: number;
      body: Partial<CartItemRequest>;
    }) => updateCartItem(productId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// Remove from cart
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: number) => removeFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useGoCheckout = () => {
  return useMutation<CheckoutResponse, Error, Checkout>({
    mutationFn: (body) => goCheckout(body),
    onSuccess: (data) => {
      console.log(data.message);
    },
    onError: (error) => {
      console.error("Checkout failed:", error.message);
    },
  });
};
