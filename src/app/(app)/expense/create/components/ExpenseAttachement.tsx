"use client"

import DragNDrop from '@/app/components/DragNDrop'
import React from 'react'

interface Props {
  attachments: File[],
  addAttachment: (file: File) => void,
  removeAttachment: (file: File) => void
}

const ExpenseAttachement = ({ attachments, addAttachment, removeAttachment }: Props) => {

  console.log(attachments);

  return (
    <div className="w-full md:h-full">
      <DragNDrop onFileUpload={addAttachment} className="bg-dark-bg" />
    </div>
  )
}

export default ExpenseAttachement
