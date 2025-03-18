import { BsThreeDots } from "react-icons/bs";

export default function SmallContainer({ mainStat, description, icon }) {
  return (
    <section className="bg-zinc-950 border-1 border-zinc-900 p-4 rounded-md w-68 flex gap-4 items-center pr-10 relative flex-grow min-w-xs">
      <div className="p-4 bg-white/10 rounded-full">{icon}</div>
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl">{mainStat}</h1>
        <p>{description}</p>
      </div>
      <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-all">
        <BsThreeDots />
      </button>
    </section>
  );
}
