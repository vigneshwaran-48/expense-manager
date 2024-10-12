import React from "react";
import { getStats } from "../actions/user";

const page = async () => {

  const stats = await getStats();
  console.log("Stats!")
  console.log(stats);

  return <div>Dashboard</div>;
};

export default page;
