import { getFamilyStats, getUserFamily } from '@/app/actions/family';
import React from 'react'
import AmountSpentPlot from './components/AmountSpentPlot';

const page = async () => {

  const family = (await getUserFamily()).family;
  const stats = await getFamilyStats(family.id);
  console.log("Family stats");
  console.log(stats);

  return (
    <div>
      <AmountSpentPlot amountSpentPerDay={stats.amountSpentPerDay} />
    </div>
  )
}

export default page;
