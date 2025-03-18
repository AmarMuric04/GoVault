import Pfp from "@/public/psw-pfp.jpg";
import Image from "next/image";
import { FaEdit, FaChartPie } from "react-icons/fa";
import { SiManageiq } from "react-icons/si";
import { IoIosCreate } from "react-icons/io";
import { IoSettingsSharp, IoLogOut } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";

export default function Sidebar({ user }) {
  return (
    <aside className="bg-zinc-950 text-white border-1 border-zinc-900 w-80 h-screen px-2">
      <h1 className="text-center mt-20 mb-10 text-2xl font-semibold">
        Welcome back!
      </h1>
      <div className="w-full flex flex-col items-center">
        <Image
          src={Pfp}
          alt="User's profile picture"
          w={100}
          h={100}
          className="rounded-full w-20 h-20"
        />
        <h2 className="text-lg font-medium mt-4">{user.email}</h2>
      </div>
      <button className="w-full py-2 font-medium bg-zinc-900 hover:bg-zinc-800 border-1 border-zinc-700 transition-all rounded-sm mt-4 flex items-center justify-center gap-2">
        <FaEdit />
        <p>Edit profile</p>
      </button>
      <button className="w-full py-2 mt-10 font-medium hover:bg-zinc-900 transition-all rounded-sm flex items-center justify-center gap-2 ">
        <FaChartPie />
        <p>Overview</p>
      </button>
      <button className="w-full py-2 my-2 font-medium hover:bg-zinc-900 transition-all rounded-sm flex items-center justify-center gap-2 ">
        <SiManageiq />
        <p>Manage</p>
      </button>
      <button className="w-full py-2 my-2 font-medium hover:bg-zinc-900 transition-all rounded-sm flex items-center justify-center gap-2 ">
        <IoIosCreate />
        <p>Generate</p>
      </button>

      <button className="w-full py-2 my-2 font-medium hover:bg-zinc-900 transition-all rounded-sm flex items-center justify-center gap-2 ">
        <MdOutlineSecurity />
        <p>Security</p>
      </button>
      <button className="w-full py-2 my-2 font-medium hover:bg-zinc-900 transition-all rounded-sm flex items-center justify-center gap-2 ">
        <IoSettingsSharp />
        <p>Settings</p>
      </button>
    </aside>
  );
}
