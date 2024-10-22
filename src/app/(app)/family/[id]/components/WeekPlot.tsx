"use client";

import { WeekDay } from '@/util/AppTypes';
import { nivoTheme } from '@/util/nivoTheme';
import { ResponsiveLine } from '@nivo/line';
import React, { useEffect, useRef } from 'react'

const WeekPlot = ({ weekData }: { weekData: Record<WeekDay, number> }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const data = [
    {
      id: "weekChart",
      data: [
        { x: "Sun", y: weekData.SUNDAY },
        { x: "Mon", y: weekData.MONDAY },
        { x: "Tue", y: weekData.TUESDAY },
        { x: "Wed", y: weekData.WEDNESDAY },
        { x: "Thurs", y: weekData.THURSDAY },
        { x: "Fri", y: weekData.FRIDAY },
        { x: "Sat", y: weekData.SATURDAY },
      ]
    }
  ]

  return (
    <div className="m-2 p-2 w-full flex-shrink-0 large-md:max-w-[500px] h-[400px] flex flex-col justify-around items-center">
      <div className="w-full">
        <h2 className="font-bold text-2xl p-2">This Week</h2>
      </div>
      <div className="w-full h-[calc(100%-50px)]">
        <ResponsiveLine
          data={data}
          margin={{ top: 10, right: 20, bottom: 30, left: 25 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          curve="catmullRom"
          enableGridX={false}
          enableArea={true}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0,
          }}
          pointSize={10}
          pointColor={{ from: "color", modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[]}
          theme={nivoTheme()}
        />
      </div>
    </div>
  )
}

export default WeekPlot
