import { createPartOfApiUrl } from "../../components/Main/Helper";

const apiUrl = import.meta.env.VITE_API_URL;

export const getProduct = async (
  itemsPerPage: number,
  skip: number,
  keyword: string,
  filter: string
) => {
  let url = `${apiUrl}/products?limit=${itemsPerPage}&skip=${skip}`;
  if (keyword) {
    url = `${apiUrl}/products/search?q=${keyword}`;
  }
  if (filter) {
    let path = createPartOfApiUrl(filter);
    url = url.concat(path);
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Fetch product failed");
  }

  return await response.json();
};
