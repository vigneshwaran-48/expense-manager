"use client"

import React from 'react'

const CategoryPieChart = ({ categoryAmount }: { categoryAmount: Record<string, number> }) => {
  console.log(categoryAmount)

  const pieData = Object.entries(categoryAmount).map(([key, value]) => {
    console.log(`Key: ${key}, Value: ${value}`)
    return {
      id: key,
      label: key,
      value
    }
  })

  return (
    <div>CategoryPieChart</div>
  )
}

export default CategoryPieChart
