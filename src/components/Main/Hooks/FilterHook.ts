import { useMemo } from "react";

interface Product {
  category: string;
  price: number;
  title: string;
}

interface UseFilteredProductsParams {
  products: Product[];
  selectedCategory: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  searchQuery: string;
}

const useFilteredProducts = ({
  products,
  selectedCategory,
  minPrice,
  maxPrice,
  searchQuery,
}: UseFilteredProductsParams) => {
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      result = result.filter((product) => product.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      result = result.filter((product) => product.price <= maxPrice);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    return result;
  }, [products, selectedCategory, minPrice, maxPrice, searchQuery]);

  return filteredProducts;
};

export default useFilteredProducts;
