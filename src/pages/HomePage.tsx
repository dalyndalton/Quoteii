import { useState } from "react";
import { Quote } from "../components/Quote";
import { SearchBar } from "../components/Search";

import "./HomePage.css";

export function HomePage() {
  const [searchState, setSearchState] = useState(false);

  return (
    <div>
      <SearchBar />
      <Quote body="tmp" author="tmp" />
    </div>
  );
}
