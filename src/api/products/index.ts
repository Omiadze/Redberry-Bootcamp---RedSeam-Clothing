import { httpClient } from "..";
import { PRODUCTS_ENDPOINTS } from "./index.enum";
import type {
  ProductDetailsType,
  ProductsDataType,
  ProductsListResponseType,
} from "./index.types";

export const getProducts = async (
  params: ProductsDataType
): Promise<ProductsListResponseType> => {
  try {
    const result = await httpClient.get(PRODUCTS_ENDPOINTS.PRODUCTS, {
      params,
    });
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed");
  }
};

export const getOneProduct = async (
  id: number
): Promise<ProductDetailsType> => {
  try {
    const result = await httpClient.get(`${PRODUCTS_ENDPOINTS.PRODUCTS}/${id}`);
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed to fetch product");
  }
};
