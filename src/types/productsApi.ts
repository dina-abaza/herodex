/** شكل استجابة جلب المنتجات (وثيقة الـ API + وضع تجريبي) */
export type ProductListItem = Record<string, unknown> & {
  _id: string;
  name?: string;
  price?: number;
  image?: string;
  description?: string;
  category?: { _id?: string; name?: string };
};

export type GetProductsResponse = {
  success: boolean;
  message?: string;
  data: {
    products: ProductListItem[];
    page: number;
    pages: number;
  };
};

export type GetProductsArg = {
  page?: number;
  limit?: number;
  category?: string;
};

export type GetProductByIdResponse = {
  success: boolean;
  message?: string;
  data: ProductListItem;
};
