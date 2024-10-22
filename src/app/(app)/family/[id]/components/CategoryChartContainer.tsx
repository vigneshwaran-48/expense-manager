"use client"

import { ResponsivePie } from '@nivo/pie'
import React from 'react'

const CategoryChartContainer = ({ data }: { data: any }) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 20, bottom: 60, left: 0 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'pink_yellowGreen' }}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.2
            ]
          ]
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              2
            ]
          ]
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'column',
            justify: false,
            translateX: 340,
            translateY: -152,
            itemsSpacing: 17,
            itemWidth: 107,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    </div>
  )
}

export default CategoryChartContainer
