import { Bars3Icon } from "@heroicons/react/16/solid";
import { Dispatch, SetStateAction } from "react";

interface SidebarToggleProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SidebarToggle({ setOpen }: SidebarToggleProps) {
  return (
    <div className="fixed w-6 h-6 md:hidden m-6">
      <button
        onClick={() => {
          setOpen((prev: boolean) => !prev);
        }}
      >
        <Bars3Icon className="text-black w-6 h-6" />
      </button>
    </div>
  );
}
