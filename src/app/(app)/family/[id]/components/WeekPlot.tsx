"use client";

import { WeekDay } from '@/util/AppTypes';
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
    <div className="p-2 w-full h-[400px] flex flex-col justify-around items-center">
      <div className="w-full">
        <h2 className="font-bold text-2xl p-2">This Week</h2>
      </div>
      <div className="w-full h-[calc(100%-50px)]">
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
            truncateTickAt: 0
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </div>
    </div>
  )
}

export default WeekPlot
