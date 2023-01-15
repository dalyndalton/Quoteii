import { useEffect, useState } from "react";
import { Quote, IQuote } from "../components/Quote";
import "./HomePage.css";

interface APIQuote {
  _id: string;
  author: string;
  content: string;
  authorSlug?: string;
  dateAdded?: Date;
  dateModified?: Date;
  length?: number;
}

export function HomePage() {
  const [searchState, setSearchState] = useState(true);
  const [query, setQuery] = useState("");
  const [quotes, setQuotes] = useState<APIQuote[]>([]);

  async function randomQuote() {
    // Fetch a random quote from the Quotable API
    const response = await fetch("https://api.quotable.io/random");
    const data: APIQuote = await response.json();
    if (response.ok) {
      // update the Quotes List State
      console.log(data);
      setQuotes([
        { content: data.content, author: data.author, _id: data._id },
      ]);
    } else {
      setQuotes([
        {
          content: "Cannot fetch a quote at this time",
          author: "Error: Fetch Fail",
          _id: "n/a",
        },
      ]);
      console.log(data);
      console.log("Error");
    }
  }

  async function searchQuote() {
    // Set the css state
    setSearchState(false);

    // Fetch the query
    const response = await fetch(
      `https://api.quotable.io/search/quotes?query=${query}&fields=author`
    );
    const data = await response.json();
    if (response.ok) {
      // Parse out each APIQuote from the API call
      let tmp: APIQuote[] = [];
      data.results.forEach((element: APIQuote) => {
        tmp.push({
          content: element.content,
          author: element.author,
          _id: element._id,
        });
      });

      // Update quotes list with new values
      setQuotes([...tmp]);
    } else {
      setQuotes([
        {
          content: "Cannot fetch a quote at this time",
          author: "Error: Fetch Fail",
          _id: "n/a",
        },
      ]);
      console.error("Error", data);
    }
  }

  // Event listener that runs on render
  useEffect(() => {
    randomQuote();
  }, []);

  return (
    <div
      className="homepage"
      // Switches between the centered look and a top scrollable
      style={{ justifyContent: searchState ? "center" : "start" }}
    >
      <h1>Quote Search</h1>
      <div className={`search_container`}>
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
      <div className="quote_container">
        {quotes.map((quote: APIQuote) => (
          <Quote key={quote._id} body={quote.content} author={quote.author} />
        ))}
      </div>
    </div>
  );
}
