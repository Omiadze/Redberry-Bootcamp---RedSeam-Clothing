import { useQuery } from "@tanstack/react-query";
import type { ProductDetailsType } from "../../../api/products/index.types";
import { getOneProduct } from "../../../api/products";

export const useProduct = (id: number) => {
  return useQuery<ProductDetailsType, Error>({
    queryKey: ["product", id],
    queryFn: () => getOneProduct(id),
    enabled: !!id,
  });
};
