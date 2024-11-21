"use client"

import { useAppSelector } from '@/lib/hooks';
import React, { useEffect } from 'react'

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

  const { darkMode } = useAppSelector(state => state.settingsSlice.preferences)

  useEffect(() => {
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className={`w-full h-full ${darkMode ? "mode-dark" : "mode-light"} bg-dark-bg text-color-text flex p-2 justify-around sm:p-4 relative`}>
      {children}
    </div>
  )
}

export default ThemeProvider
