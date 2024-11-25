"use client"

import React from 'react'
import CategoryChartContainer from './CategoryChartContainer'
import { useAppSelector } from '@/lib/hooks'
import Image from 'next/image'

const CategoryPieChart = ({ categoryAmount }: { categoryAmount: Record<string, number> }) => {

  const categories = useAppSelector(state => state.categorySlice.categories);

  const pieData = Object.entries(categoryAmount).map(([key, value]) => {
    return {
      id: key,
      label: categories.find(category => category.id === key)?.name,
      value
    }
  })

  return (
    <div className="m-2 w-full large-md:max-w-[calc(100%-540px)] h-[400px] flex-shrink-0">
      <h2 className="font-bold text-2xl p-2 text-center">Top Categories</h2>
      {
        pieData.length === 0 ?
          <div className="flex flex-col font-bold justify-center items-center">
            <Image
              src="/images/empty.png"
              alt="No categories illustration"
              width={150}
              height={150}
              className="h-[150px] w-[150px] md:h-[250px] md:w-[250px]"
            />
          </div>
          :
          <CategoryChartContainer data={pieData} />
      }
    </div>
  )
}

export default CategoryPieChart
