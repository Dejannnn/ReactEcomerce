import { Tally3 } from "lucide-react";
import { useState } from "react";
//Enum
import { FilterType } from "../../enum/index";

type Props = {
  filter: string;
  setFilter: (filter: string) => void;
};

const Sort = ({ filter, setFilter }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <div className="relative mb-5 mt-5">
        <button
          className="border px-4 py-2 rounded-full flex items-center"
          onClick={() => {
            setDropdownOpen((prevState) => !prevState);
          }}
        >
          <Tally3 className="mr-2"></Tally3>
          {filter === "all"
            ? "Filters"
            : filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
        {dropdownOpen && (
          <div className="absolute bg-white border border-gray-200 w-full sm:w-40 mt-2 rounded">
            <button
              className="block px-4 py-2 w-full text-left hover:bg-slate-200"
              onClick={() => {
                setFilter(FilterType.CHEAP);
                setDropdownOpen(false);
              }}
            >
              Cheap
            </button>
            <button
              className="block px-4 py-2 w-full text-left hover:bg-slate-200"
              onClick={() => {
                setFilter(FilterType.EXPENCIVE);
                setDropdownOpen(false);
              }}
            >
              Exepencive
            </button>
            <button
              className="block px-4 py-2 w-full text-left hover:bg-slate-200"
              onClick={() => {
                setFilter(FilterType.POPULAR);
                setDropdownOpen(false);
              }}
            >
              Popular
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sort;
