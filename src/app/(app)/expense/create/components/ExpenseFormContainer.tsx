"use client";

import React, { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseAttachement from './ExpenseAttachement'

const ExpenseFormContainer = () => {
  const [attachments, setAttachments] = useState<File[]>([]);

  const addAttachment = (file: File) => {
    setAttachments(prevAttachments => [...prevAttachments, file]);
  }

  const removeAttachment = (file: File) => {
    setAttachments(prevAttachments => prevAttachments.filter(attachment => attachment !== file));
  }

  return (
    <div className="w-full h-full flex flex-col justify-around overflow-y-scroll hide-scrollbar">
      <div className="w-full h-[calc(100%-40px)] flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 h-full flex flex-col">
          <ExpenseForm isFamilyExpense={false} />
        </div>
        <div className="w-full lg:w-1/3 h-full">
          <ExpenseAttachement
            addAttachment={addAttachment}
            removeAttachment={removeAttachment}
            attachments={attachments} />
        </div>
      </div>
      <div className="w-full flex justify-end items-center p-2">
        <button className="px-2 py-1 m-2 rounded bg-dark-bg text-light-color-text">Cancel</button>
        <button className="px-2 py-1 m-2 rounded bg-other-bg text-other-text">Create</button>
      </div>
    </div>
  )
}

export default ExpenseFormContainer