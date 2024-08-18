import React from 'react'
import Navbar from './components/Navbar';

interface Props {
  params: { id: string },
  children: React.ReactNode
}

const layout = ({ params: { id }, children }: Props) => {
  return (
    <div className="w-full h-full p-2 pt-6">
      <Navbar id={id} />
      <div className="h-[calc(100%-60px)]">
        { children }
      </div>
    </div>
  )
}

export default layout;
