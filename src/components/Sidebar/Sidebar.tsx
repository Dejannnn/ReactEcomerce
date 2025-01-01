import React, { useEffect, useState } from "react";
import { useFilter } from "../../context/FilterContext/FilterContext";

//Helper
import { isValueNumber } from "./Helper/index";
const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedCategory,
    setSelectedCategory,
    keyword,
    setKeyword,
  } = useFilter();
  const [category, setCategory] = useState<string[]>([]);
  const [keys] = useState<string[]>(["WATCH", "APPLE", "NIKE", "PIXEL"]);
  useEffect(() => {
    const fetchCateories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products/category-list`
        );
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.log(">>>>Error fetchng product", error);
      }
    };
    fetchCateories();
  }, []);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (isValueNumber(value))
      setMinPrice(value ? parseFloat(value) : undefined);
  };
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (isValueNumber(value))
      setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSelectedCategory("");
    setKeyword("");
  };

  return (
    <div className="w-64 p-5">
      <h1 className="font-bold text-2xl mb-10 mt-4">React Store</h1>
      <section className="">
        <input
          className="border-2 rounded px-2 sm:mb-1 "
          placeholder="Search product"
          type="text"
          name="product_name"
          value={searchQuery}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(event.target.value)
          }
        />
        <div className="flex justify-center items-center">
          <input
            className="border-2 rounded px-5 py-3 mr-2 mb-3 w-full"
            placeholder="Min"
            type="text"
            name="min_price"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            className="border-2 px-5 py-3 rounded mb-3 w-full"
            placeholder="Max"
            type="text"
            name="max_price"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>
        <div className="mb-2">
          <h2 className="font-semibold text-xl mb-3">Cateogry</h2>
        </div>
        {category.map((category, index) => {
          return (
            <label
              className="mb-2 capitalize items-center flex"
              key={index + category}
            >
              <input
                className="mr-2 w-[16px] h-[16px]"
                type="radio"
                value={category}
                name="category"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSelectedCategory(event.currentTarget.value)
                }
                checked={category === selectedCategory}
              />
              {category}
            </label>
          );
        })}
        <div className="mb-2">
          <h2 className="font-semibold text-xl mb-3">Keyword</h2>
        </div>
        {keys.map((key, index) => {
          return (
            <button
              key={index + key}
              className="block mb-2 px-4 py-2 text-left rounded hover:bg-gray-200  w-full"
              value={key}
              name="key"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                console.log(">>>>>", event.currentTarget.value);
                setKeyword(event.currentTarget.value);
              }}
            >
              {key}
            </button>
          );
        })}
        <button
          className="bg-black text-white rounded mt-5 w-full mb-[4rem] py-2"
          onClick={handleResetFilters}
        >
          Reset filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
