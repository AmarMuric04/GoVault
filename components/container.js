export default function Container({ children, className }) {
  return (
    <div
      className={`border-1 border-zinc-900 bg-zinc-950 rounded-md shadow-md flex flex-col ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}
