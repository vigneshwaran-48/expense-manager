import React from "react";
import Navbar from "./components/Navbar";
import FamilyTitle from "./components/FamilyTitle";

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

const layout = async ({ params: { id }, children }: Props) => {

  return (
    <div className="w-full h-full sm:p-2 pt-6">
      <FamilyTitle />
      <Navbar id={id} />
      <div className="h-[calc(100%-60px)]">{children}</div>
    </div>
  );
};

export default layout;
