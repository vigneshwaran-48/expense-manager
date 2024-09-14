"use client";

import React, { useState } from 'react'
import Plus from './icon/Plus'

interface Props {
  onFileUpload: (file: File) => void,
  uploadedFiles?: File[],
  showPreview?: boolean,
  displayName?: string,
  className?: string,
  dragHoverEffect?: string
}

const hoverEffect = `bg-light-bg text-other-bg border-other-bg`

const DragNDrop = ({ onFileUpload, uploadedFiles = [], showPreview = false, displayName = "Upload an Attachement", className = "", dragHoverEffect = hoverEffect }: Props) => {

  const [dragOver, setDragOver] = useState<boolean>(false);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = getFileFromDragEvent(e);
    if (file) {
      onFileUpload(file);
    } else {
      console.log("No file got from onDrag() event");
    }
    setDragOver(false);
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setDragOver(false);
  }

  const getFileFromDragEvent = (e: React.DragEvent<HTMLDivElement>) => {
    let file: File | null = null;
    if (e.dataTransfer.items) {
      Array.from(e.dataTransfer.items).forEach(item => {
        if (item.kind === "file") {
          file = item.getAsFile();
        }
      })
    } else {
      Array.from(e.dataTransfer.files).forEach(f => {
        file = f;
      })
    }
    return file;
  }

  return (
    <div className={`w-full h-full flex flex-col p-2`}>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`w-full border-2 border-dashed border-dark-bg flex flex-col justify-center rounded items-center transition duration-500 cursor-pointer ${showPreview && uploadedFiles.length > 0
          ? "h-[calc(100%-200px)]" : "h-full"} text-light-color-text ${className} ${dragOver ? dragHoverEffect : ""} `}>
        <Plus className="w-[30px] h-[30px]" />
        <p className="my-2">{displayName}</p>
      </div>
      <div className={`w-full ${showPreview && uploadedFiles.length > 0 ? "h-[200px]" : ""}`}>
      </div>
    </div>
  )
}

export default DragNDrop
