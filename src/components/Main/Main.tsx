import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//Hooks
import { useFilter } from "../../context/FilterContext/FilterContext";
//Components
import Card from "../ItemCard/ItemCard";
import Pagination from "../Pagination/Pagination";
import TopSeller from "../TopSeller/TopSeller";
import Sort from "../Sort/Sort";

//Enum
import { FilterType } from "../../enum/index";
import useFilteredProducts from "./Hooks/FilterHook";

//API
import { getProduct } from "../../api/Product/product";

const Main = () => {
  const { searchQuery, minPrice, maxPrice, selectedCategory, keyword } =
    useFilter();
  const [filter, setFilter] = useState<string>(FilterType.ALL);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  let skip = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage]);

  const { data } = useQuery({
    queryKey: ["products", currentPage, filter, keyword],
    queryFn: () => getProduct(itemsPerPage, skip, keyword, filter),
  });
  const products = data?.products || [];
  const pageNumber = Math.ceil(data?.total / itemsPerPage) || 1;

  let filteredProducts: any[] = useFilteredProducts({
    products: products,
    minPrice,
    maxPrice,
    selectedCategory,
    searchQuery,
  });

  return (
    <div className="flex">
      <section className="flex xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] sm:flex-col xs-[20rem] p-5">
        <div className="mb-5">
          <Sort filter={filter} setFilter={setFilter} />
          <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              return <Card key={product.id} {...product} />;
            })}
          </div>
          <Pagination
            setCurrentPage={setCurrentPage}
            pageNumber={pageNumber}
            currentPage={currentPage}
          />
        </div>
      </section>
      <TopSeller />
    </div>
  );
};

export default Main;
