import { getUserFamily } from '@/app/actions/family';
import { getFamilyStats } from '@/app/actions/stats';
import React from 'react'
import WeekPlot from './components/WeekPlot';

const page = async () => {

  const family = (await getUserFamily()).family;
  const stats = await getFamilyStats();
  console.log("Family stats");
  console.log(stats);

  return (
    <div className="flex flex-wrap">
      <WeekPlot weekData={stats.weekAmount} />
    </div>
  )
}

export default page;
