import React from "react";
import Navbar from "./components/Navbar";
import Title from "../../components/Title";
import { getFamilyById } from "@/app/actions/family";
import FamilyProvider from "./components/FamilyProvider";

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

const layout = async ({ params: { id }, children }: Props) => {
  const family = await getFamilyById(id);

  return (
    <div className="w-full h-full sm:p-2 pt-6">
      <FamilyProvider familyId={id} />
      <Title title={family.name} />
      <Navbar id={id} />
      <div className="h-[calc(100%-60px)]">{children}</div>
    </div>
  );
};

export default layout;
