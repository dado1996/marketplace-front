import { Product } from "../types/ProductTypes";
import { axiosInstance } from "../utils/axios";

export const fetchProductsService = async ({
  name,
  sku,
  minPrice = 1,
  maxPrice = 9999999999,
}: {
  name?: string;
  sku?: string;
  minPrice: number;
  maxPrice?: number;
}) => {
  const query = `${name && "name=" + name}&${sku}&${sku && "sku=" + sku}&${
    minPrice && "minPrice=" + minPrice
  }&${maxPrice && "maxPrice=" + maxPrice}`;

  const token = localStorage.getItem("token");

  return axiosInstance.get<{
    status: number;
    message: string;
    data: Product[];
  }>("/products/all?" + query, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const registerProductService = (
  name: string,
  sku: string,
  amount: number,
  price: number
) => {
  const token = localStorage.getItem("token");

  return axiosInstance.post<{
    status: number;
    message: string;
    data: { name: string; sku: string; amount: number; price: number };
  }>(
    "/products/register",
    {
      name,
      sku,
      amount,
      price,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
