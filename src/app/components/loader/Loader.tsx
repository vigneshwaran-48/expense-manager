import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image src="/loading.gif" width={200} height={200} alt="Loading ..." />
    </div>
  )
}

export default Loader
