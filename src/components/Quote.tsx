import "./Quote.css";

export interface IQuote {
  body: string;
  author: string;
}

export const Quote = ({ body, author }: IQuote) => {
  return (
    <div className="quote">
      <p>{body}</p>
      <p style={{ textAlign: "right"}}>
        {" "}
        -<em>{author}</em>
      </p>
    </div>
  );
};
