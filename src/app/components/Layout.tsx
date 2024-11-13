"use client";
import Sidebar from "./Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex transition-transform -translate-x-72 md:translate-x-0">
      <Sidebar />
      {children}
    </div>
  );
}
