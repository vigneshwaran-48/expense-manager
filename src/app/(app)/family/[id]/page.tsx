import { getUserFamily } from '@/app/actions/family';
import { getFamilyStats } from '@/app/actions/stats';
import React from 'react'
import WeekPlot from './components/WeekPlot';
import RecenetExpenses from './components/RecenetExpenses';

const page = async () => {

  const family = (await getUserFamily()).family;
  const stats = await getFamilyStats();
  console.log("Family stats");
  console.log(stats);

  return (
    <div className="flex flex-wrap w-full h-full overflow-y-scroll hide-scrollbar">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2">
          <WeekPlot weekData={stats.weekAmount} />
        </div>
        <div className="w-full p-2">
          <div className="w-full md:w-1/3">
            <RecenetExpenses expenses={stats.recentExpenses.reverse()} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page;
