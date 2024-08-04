"use client";

import { useAppSelector } from "@/lib/hooks";
import React from "react";

const Body = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const title = useAppSelector((state) => state.appSlice.title);

  return (
    <main className="w-full h-full bg-light-bg rounded md:w-[calc(100%-var(--sidebar-width))] pt-[35px] md:pt-4 p-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="w-full h-[calc(100%-40px)]">
        {children}
      </div>
    </main>
  );
};

export default Body;
