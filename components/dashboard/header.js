import Image from "next/image";
import Logo from "@/public/TheLogo.png";

export default function Header({ user }) {
  return (
    <header className="bg-zinc-950 text-white border-1 border-zinc-900 flex flex-grow max-h-1/10 h-1/10 items-center justify-end px-10">
      <div className="flex gap-4 items-center h-full montserrat text-end">
        <div>
          <h1 className="font-semibold text-[#ee6711] text-lg">GuardX</h1>
          <p className="text-zinc-600 text-sm">Be Safe & Stay Safe</p>
        </div>
        <Image
          className="h-13 w-13"
          src={Logo}
          width={100}
          height={100}
          alt="App's Logo"
        />
      </div>
    </header>
  );
}
