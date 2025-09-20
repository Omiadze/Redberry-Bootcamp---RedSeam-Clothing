import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ProductsDataType } from "../../../../api/products/index.types";
import { getProducts } from "../../../../api/products";

export const useProducts = (params: ProductsDataType) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};
