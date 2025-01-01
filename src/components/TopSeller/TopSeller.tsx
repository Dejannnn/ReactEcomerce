import React, { useEffect } from "react";
//Types
import { Author } from "./types";
const TopSeller = () => {
  const [authors, setAuthors] = React.useState<Author[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_USER_API}?results=5`)
      .then(async (data) => {
        let result = await data.json();
        const authorData: Author[] = result.results.map((author: any) => {
          return {
            name: `${author.name.first} ${author.name.last}`,
            isFolowing: false,
            image: author.picture.medium,
          };
        });

        setAuthors(authorData);
      })
      .catch((error) => {
        console.log(">>>>error>>>", error);
      });
  }, []);
  return (
    <div className="bg-white p-5 mx-5 mt-[5rem] border w-[20rem] rounded h-[30rem]">
      <h2 className="text-xl mb-5 font-bold">Top Sellers:</h2>
      {authors.map((author, index) => {
        return (
          <p key={`${author.name}_${index}`} className="flex items-center mb-2">
            <img src={author.image} className="rounded-full w-16 h-16 mr-4" />
            <span className="mr-2 w-[100%]">{author.name}</span>
            <button className="bg-black text-white px-2 py-2 hover:bg-red-400">
              {author.isFolowing ? "Unfollow" : "Follow"}
            </button>
          </p>
        );
      })}
    </div>
  );
};

export default TopSeller;
