export type ProductsDataType = {
  page?: number;
  "filter[price_from]"?: number;
  "filter[price_to]"?: number;
  sort?: "price" | "-price" | "created_at" | "-created_at" | string;
};

export type ProductType = {
  id: number;
  name: string;
  description: string;
  release_year: string;
  cover_image: string;
  images: string[];
  price: number;
  available_colors: string[];
  available_sizes: string[];
};

export type ProductsListResponseType = {
  data: ProductType[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
};
