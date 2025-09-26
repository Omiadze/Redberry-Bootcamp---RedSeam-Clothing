export type CartItemRequest = {
  quantity: number;
  color: string;
  size: string;
};

export type CartItemResponse = {
  id: number;
  name: string;
  description: string;
  release_year: string;
  cover_image: string;
  images: string[];
  price: number;
  available_colors: string[];
  available_sizes: string[];
  total_price: number;
  quantity: number;
  color: string;
  size: string;
};
export type Checkout = {
  name: string;
  surname: string;
  email: string;
  zip_code: string;
  address: string;
};
export interface CheckoutResponse {
  message: string;
}
