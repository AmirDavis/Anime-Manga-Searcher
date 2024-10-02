import { useEffect } from "react";
import "../styles/Search-bar.css";

export default function SearchBar({ searchValue, setSearchValue }) {
  return (
    <input
      type="text"
      name=""
      id="search-bar"
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
}
