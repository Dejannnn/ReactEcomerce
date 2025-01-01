import React, { useEffect, useState } from "react";
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

//Helper
import { createPartOfApiUrl } from "./Helper/index";

const apiUrl = import.meta.env.VITE_API_URL;

const Main = () => {
  const { searchQuery, minPrice, maxPrice, selectedCategory, keyword } =
    useFilter();
  const [filter, setFilter] = useState<string>(FilterType.ALL);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<any[]>([]);
  const itemsPerPage = 12;
  const [pageNumber, setPageNumber] = useState<number>(0);

  useEffect(() => {
    let skip = (currentPage - 1) * itemsPerPage;
    let url = `${apiUrl}/products?limit=${itemsPerPage}&skip=${skip}`;
    if (keyword) {
      url = `${apiUrl}/products/search?q=${keyword}`;
    }
    if (filter) {
      let path = createPartOfApiUrl(filter);
      url = url.concat(path);
    }
    fetch(url)
      .then(async (data) => {
        let response = await data.json();
        setPageNumber(Math.ceil(response.total / itemsPerPage));
        setProducts(response.products);
      })
      .catch((error) => {
        console.log(">>>error>>", error);
      });
  }, [currentPage, keyword, filter]);

  let filteredProducts: any[] = useFilteredProducts({
    products,
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
