import React from 'react'
import CategoryChartContainer from './CategoryChartContainer'
import { Category } from '@/util/AppTypes'

const CategoryPieChart = ({ categoryAmount }: { categoryAmount: Record<string, number> }) => {

  const categoryPromises: Promise<Category>[] = [];

//  Object.keys(categoryAmount).forEach(id => {
//    categoryPromises.push(getCate)
//  })

  const pieData = Object.entries(categoryAmount).map(([key, value]) => {
    return {
      id: key,
      label: key,
      value
    }
  })

  return (
    <div className="m-2 w-full large-md:max-w-[calc(100%-540px)] h-[400px] flex-shrink-0">
      <h2 className="font-bold text-2xl p-2 text-center">Top Categories</h2>
      <CategoryChartContainer data={pieData} />
    </div>
  )
}

export default CategoryPieChart
