import { useEffect, useState } from "react";
import { Quote, IQuote } from "../components/Quote";
import { SearchBar } from "../components/Search";

import "./HomePage.css";
export function HomePage() {
  const [searchState, setSearchState] = useState(false);
  const [quotes, setQuotes] = useState<IQuote[]>([]);

  async function updateQuote() {
    // Fetch a random quote from the Quotable API
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();

    if (response.ok) {
      // Update DOM elements
      console.log(data);
      quotes.push({
        author: data.author,
        body: data.content,
      });
    } else {
      quotes.push({
        author: "Error",
        body: "Cannot get a quote at this time",
      });
      console.log(data);
      console.log("Error");
    }
  }

  useEffect(() => {
    updateQuote();
  });

  return (
    <div>
      <div className="search_container">
        <input
          className="search_input"
          type="text"
          placeholder="Search"
        ></input>
      </div>
      <div>
        {quotes.map(({ body, author }: IQuote) => {
          return <Quote body={body} author={author} />;
        })}
      </div>
    </div>
  );
}
