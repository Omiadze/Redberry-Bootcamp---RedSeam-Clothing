import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItemRequest } from "../../api/cart/index.types";
import { addToCart, removeFromCart, updateCartItem } from "../../api/cart";

// Add product to cart
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
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // refresh cart
    },
  });
};

// Update cart item
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
