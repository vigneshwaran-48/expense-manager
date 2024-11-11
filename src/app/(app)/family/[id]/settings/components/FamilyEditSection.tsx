"use client"

import React from 'react'
import FamilyForm from '../../../create/components/FamilyForm'

const FamilyEditSection = () => {
  return (
    <section className="w-full max-w-[500px] p-4 my-4 border-b">
      <h2 className="text-2xl font-bold">Basic Information</h2>
      <FamilyForm isEdit={true} />
    </section>
  )
}

export default FamilyEditSection
