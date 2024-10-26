import { getFamilyStats } from '@/app/actions/stats';
import React from 'react'
import WeekPlot from './components/WeekPlot';
import RecenetExpenses from './components/RecenetExpenses';
import CategoryPieChart from './components/CategoryPieChart';
import TopUsers from './components/TopUsers';

const page = async () => {

  const stats = await getFamilyStats();
  console.log(stats);

  return (
    <div className="flex flex-wrap w-full h-full overflow-y-scroll hide-scrollbar">
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
            <TopUsers topUsers={stats.userAmount} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page;
