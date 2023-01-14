import { useState } from "react";
import { Quote } from "../components/Quote";
import { SearchBar } from "../components/Search";

import "./HomePage.css";

export function HomePage() {
  const [searchState, setSearchState] = useState(false);

  return (
    <div>
      <div className="search_container">
        <input
          className="search_input"
          type="text"
          placeholder="Search"
        ></input>
      </div>
      <Quote body="tmp" author="tmp" />
    </div>
  );
}
