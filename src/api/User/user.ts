import { Author } from "../../components/TopSeller/types";
export const getUsers = async () => {
  const response = await fetch(`${import.meta.env.VITE_USER_API}?results=5`);

  let result = await response.json();
  const authorData: Author[] = result.results.map((author: any) => {
    return {
      name: `${author.name.first} ${author.name.last}`,
      isFolowing: false,
      image: author.picture.medium,
    };
  });
  return authorData;
};
