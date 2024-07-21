import React from "react";

const Body = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  
  return (
    <main className="w-full h-full bg-light-bg rounded md:w-[calc(100%-var(--sidebar-width))] pt-[30px] md:pt-4 p-4">
      {children}
    </main>
  );
};

export default Body;
