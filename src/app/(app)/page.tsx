import React from "react";
import { getPersonalStats } from "../actions/stats";
import WeekPlot from "./family/[id]/components/WeekPlot";
import CategoryPieChart from "./family/[id]/components/CategoryPieChart";
import RecenetExpenses from "./family/[id]/components/RecenetExpenses";
import Title from "./components/Title";

const page = async () => {

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("")
    }, 3000)
  })

  const stats = await getPersonalStats();

  return (
    <div className="flex flex-wrap w-full h-full overflow-y-scroll hide-scrollbar">
      <Title title={"Dashboard"} />
      <div className="w-full flex flex-wrap">
        <div className="w-full flex flex-wrap">
          <WeekPlot weekData={stats.weekAmount} />
          <CategoryPieChart categoryAmount={stats.categoryAmount} />
        </div>
        <div className="w-full p-2 flex flex-wrap">
          <div className="w-full md:w-1/2">
            <RecenetExpenses expenses={stats.recentExpenses.reverse()} />
          </div>
          <div className="w-full md:w-1/2">
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
