import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../api/cart";
import type { CartItemResponse } from "../../api/cart/index.types";

// Fetch all cart products
export const useCart = () => {
  return useQuery<CartItemResponse[]>({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};
