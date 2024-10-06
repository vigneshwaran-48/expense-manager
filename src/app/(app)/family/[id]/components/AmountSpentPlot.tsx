"use client"

import React, { useEffect, useRef } from 'react'
import * as Plot from "@observablehq/plot";

const AmountSpentPlot = ({ amountSpentPerDay }: { amountSpentPerDay: { [key: string]: number } }) => {

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const otherColor = getComputedStyle(document.documentElement).getPropertyValue("--color-other-background");

    const data = Object.entries(amountSpentPerDay).map(([key, value]) => {
      return {
        date: new Date(key),
        amount: value
      }
    })

    const plot = Plot.plot({
      x: {
        type: "band", domain: data.map(d => d.date)
      },
      y: {
        grid: true
      },
      marks: [
        Plot.rectY(data, { x: "date", y: "amount", fill: otherColor })
      ]
    })

    if (parentRef.current) {
      parentRef.current.append(plot);
    }

    return () => plot.remove();
  }, []);


  return (
    <div>
      {
        Object.entries(amountSpentPerDay).length > 0 ?
          <div ref={parentRef}>
          </div>
          : <h1 className="text-2xl">No data available!</h1>
      }
    </div>
  )
}

export default AmountSpentPlot
