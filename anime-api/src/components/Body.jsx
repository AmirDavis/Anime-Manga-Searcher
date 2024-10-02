import { useState } from "react";
import RetrievedAnime from "./Retrieved-Anime";
import SearchBar from "./SearchBar";

export default function Body() {
  const [searchValue, setSearchValue] = useState("Pokemon");

  return (
    <div>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <RetrievedAnime searchValue={searchValue} />
    </div>
  );
}
