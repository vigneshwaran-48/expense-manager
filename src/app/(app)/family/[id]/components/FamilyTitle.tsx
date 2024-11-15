"use client"

import Title from '@/app/(app)/components/Title'
import { useAppSelector } from '@/lib/hooks'
import React from 'react'

const FamilyTitle = () => {

  const familyName = useAppSelector(state => state.familySlice.family.name);

  return (
    <Title title={familyName} />
  )
}

export default FamilyTitle
