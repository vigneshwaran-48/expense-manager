"use client";

import { WeekDay } from '@/util/AppTypes';
import React, { useEffect, useRef } from 'react'
import * as Plot from "@observablehq/plot";
import { LineChart } from '@mui/x-charts';

const WeekPlot = ({ weekData }: { weekData: Record<WeekDay, number> }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const otherColor = getComputedStyle(document.documentElement).getPropertyValue("--color-other-background");

    console.log(data);

    const plot = Plot.plot({
      x: {
        type: "band", domain: data.map(d => d.day)
      },
      y: {
        grid: true
      },
      marks: [
        Plot.rectY(data, { x: "date", y: "amount", fill: otherColor, strokeWidth: 1, insetLeft: 70, insetRight: 70 })
      ]
    })

    if (parentRef.current) {
      parentRef.current.append(plot);
    }

    return () => plot.remove();
  }, []);

  // const data = [
  //   {
  //     day: "Sun",
  //     amount: weekData.SUNDAY
  //   },
  //   {
  //     day: "Mon",
  //     amount: weekData.MONDAY
  //   },
  //   {
  //     day: "Tue",
  //     amount: weekData.TUESDAY
  //   },
  //   {
  //     day: "Wed",
  //     amount: weekData.WEDNESDAY
  //   },
  //   {
  //     day: "Thurs",
  //     amount: weekData.THURSDAY
  //   },
  //   {
  //     day: "Fri",
  //     amount: weekData.FRIDAY
  //   },
  //   {
  //     day: "Sat",
  //     amount: weekData.SATURDAY
  //   }
  // ]


  const data = [
    {
      day: 0,
      amount: weekData.SUNDAY
    },
    {
      day: 1,
      amount: weekData.MONDAY
    },
    {
      day: 2,
      amount: weekData.TUESDAY
    },
    {
      day: 3,
      amount: weekData.WEDNESDAY
    },
    {
      day: 4,
      amount: weekData.THURSDAY
    },
    {
      day: 5,
      amount: weekData.FRIDAY
    },
    {
      day: 6,
      amount: weekData.SATURDAY
    }
  ]

  return (
    <div className="p-2 md:max-w-[400px] md:h-[400px] flex flex-col justify-around items-center">
      <h2 className="font-bold text-2xl p-2">This Week</h2>
      <LineChart
        xAxis={[{ data: data.map(d => d.day) }]}
        series={[
          {
            data: data.map(d => d.amount),
            area: true
          },
        ]}
        colors={["red", "blue"]}
      />
    </div>
  )
}

export default WeekPlot
