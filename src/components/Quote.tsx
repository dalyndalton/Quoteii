interface QuoteProps {
  body: string;
  author: string;
}

export const Quote = ({ body, author }: QuoteProps) => {
  return (
    <div>
      <p> {body}</p>
      <p style={{ textAlign: "right" }}> {author} </p>
    </div>
  );
};
