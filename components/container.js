export default function Container({ children, className }) {
  return (
    <div
      className={`border-1 text-foreground rounded-md shadow-md flex flex-col ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}
