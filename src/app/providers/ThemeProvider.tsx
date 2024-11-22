"use client"

import { useAppSelector } from '@/lib/hooks';
import React, { useEffect } from 'react'

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

  const { darkMode, theme } = useAppSelector(state => state.settingsSlice.preferences)

  useEffect(() => {
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
  }, [darkMode]);

  let themeClass = "theme-blue"
  switch (theme) {
    case "BLUE":
      themeClass = "theme-blue"
      break;
    case "RED":
      themeClass = "theme-red"
      break;
    case "GREEN":
      themeClass = "theme-green"
      break;
    default:
      throw new Error("Unknown theme")
  }

  return (
    <div className={`w-full h-full ${darkMode ? "mode-dark" : "mode-light"} ${themeClass} bg-dark-bg text-color-text flex p-2 justify-around sm:p-4 relative`}>
      {children}
    </div>
  )
}

export default ThemeProvider
