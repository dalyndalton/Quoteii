import { useEffect, useState } from "react";
import { Quote, IQuote } from "../components/Quote";
import "./HomePage.css";

interface APIQuote extends IQuote {
  id: string;
}

export function HomePage() {
  const [searchState, setSearchState] = useState(false);
  const [query, setQuery] = useState("");
  const [quotes, setQuotes] = useState<APIQuote[]>([]);

  async function randomQuote() {
    // Fetch a random quote from the Quotable API
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    if (response.ok) {
      // Update DOM elements
      console.log(data);
      setQuotes([{ body: data.content, author: data.author, id: data._id }]);
    } else {
      setQuotes([
        {
          body: "Cannot fetch a quote at this time",
          author: "Error: Fetch Fail",
          id: "n/a",
        },
      ]);
      console.log(data);
      console.log("Error");
    }
  }

  async function searchQuote() {
    // Set the css state
    setSearchState(true);

    // Fetch the query
    const response = await fetch(
      `https://api.quotable.io/search/quotes?query=${query}&fields=author`
    );
    const data = await response.json();
    if (response.ok) {
      // Update DOM elements
      console.log(data);
      setQuotes([{ body: data.content, author: data.author, id: data._id }]);
    } else {
      setQuotes([
        {
          body: "Cannot fetch a quote at this time",
          author: "Error: Fetch Fail",
          id: "n/a",
        },
      ]);
      console.log(data);
      console.log("Error");
    }
  }

  // Event listener that runs on render
  useEffect(() => {
    randomQuote();
  }, []);

  return (
    <div className="center">
      <div className={`search_container ${searchState ? "search" : ""}`}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchQuote();
            }
          }}
          className="search_input"
          type="text"
          placeholder="Search"
        ></input>
      </div>
      <div>
        {quotes.map((quote: APIQuote) => (
          <Quote key={quote.id} body={quote.body} author={quote.author} />
        ))}
      </div>
    </div>
  );
}
