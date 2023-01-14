export interface IQuote {
  body: string;
  author: string;
}

export const Quote = ({ body, author }: IQuote) => {
  return (
    <div>
      <p> {body}</p>
      <p style={{ textAlign: "right" }}> -{author} </p>
    </div>
  );
};
