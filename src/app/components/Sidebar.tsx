import { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/16/solid";

export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("open ", open);
  }, [open]);

  return (
    <>
      <div
        className={`text-white min-h-screen w-72 bg-primary transition-transform duration-300 ease-in-out ${
          open ? "translate-x-full" : "-translate-x-full"
        } md:translate-x-0 md:relative `}
      >
        Sidebar
      </div>

      <div
        className={`fixed top-0 left-72 m-6 md:hidden transition-transform duration-300 ease-in-out ${open ? "translate-x-72" : ""}`}
      >
        <button
          onClick={() => {
            setOpen((prev: boolean) => !prev);
          }}
        >
          <Bars3Icon className="text-black w-6 h-6" />
        </button>
      </div>
    </>
  );
}
