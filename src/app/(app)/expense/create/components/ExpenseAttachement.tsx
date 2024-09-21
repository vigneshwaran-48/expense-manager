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
    <div className="w-full md:h-full max-h-[750px] md:p-4">
      <DragNDrop onFileUpload={addAttachment} className="bg-dark-bg" uploadedFiles={attachments} onRemoveFile={removeAttachment} />
    </div>
  )
}

export default ExpenseAttachement
