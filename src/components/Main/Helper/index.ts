import { FilterType } from "../../../enum/index";

export const createPartOfApiUrl = (filter: string) => {
  switch (filter) {
    case FilterType.CHEAP: {
      return `&sortBy=price&order=asc`;
    }
    case FilterType.EXPENCIVE: {
      return `&sortBy=price&order=desc`;
    }
    case FilterType.POPULAR: {
      return `&sortBy=rating&order=desc`;
    }
    default: {
      return "";
    }
  }
};
