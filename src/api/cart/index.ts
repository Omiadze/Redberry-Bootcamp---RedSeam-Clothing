import { httpClient } from "..";
import { CART_ENDPOINTS } from "./index.enum";
import type { CartItemRequest, CartItemResponse } from "./index.types";

// ✅ 1. Get all products in cart
export const getCart = async (): Promise<CartItemResponse[]> => {
  const result = await httpClient.get(CART_ENDPOINTS.GET_CART);
  return result.data;
};

// ✅ 2. Add product to cart
export const addToCart = async (
  productId: number,
  body: CartItemRequest
): Promise<CartItemResponse> => {
  const result = await httpClient.post(
    `${CART_ENDPOINTS.UPDATE_CART}${productId}`,
    body
  );
  return result.data;
};

// ✅ 3. Update product in cart (PATCH)
export const updateCartItem = async (
  productId: number,
  body: Partial<CartItemRequest> // usually { quantity }
): Promise<CartItemResponse> => {
  const result = await httpClient.patch(
    `${CART_ENDPOINTS.UPDATE_CART}${productId}`,
    body
  );
  return result.data;
};

// ✅ 4. Remove product from cart
export const removeFromCart = async (productId: number): Promise<void> => {
  await httpClient.delete(`${CART_ENDPOINTS.UPDATE_CART}${productId}`);
};
