import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//types
import { Product } from "./types";
const ItemDetail = (props: {}) => {
  const [product, setProduct] = useState<Product>();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      const data = await response.json();
      console.log(">>>>data>>", data);
      setProduct(data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      {!product && (
        <div className="flex justify-center items-center h-full">
          Loading....
        </div>
      )}
      {product && (
        <div className="p-5 w-[60%]">
          <button
            className="mb-5 px-4 py-2 bg-black text-white"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-[50%] h-auto mb-5"
          />
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="mb-5 text-gray-700 w-[70%]">{product.description}</p>
          <div className="flex">
            <p>Price: {product.price}</p>
            <p className="ml-10">Rating: {product.rating}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
