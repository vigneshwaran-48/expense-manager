"use client";

import React, { useState } from 'react'
import Plus from './icon/Plus'
import File from './icon/File';
import XIcon from './icon/XIcon';

interface Props {
  onFileUpload: (file: File) => void,
  onRemoveFile: (file: File) => void,
  uploadedFiles?: File[],
  showPreview?: boolean,
  displayName?: string,
  className?: string,
  dragHoverEffect?: string
}

const hoverEffect = `bg-light-bg text-other-bg border-other-bg`

const DragNDrop = ({ onFileUpload, uploadedFiles = [], onRemoveFile, showPreview = true, displayName = "Upload an Attachement", className = "", dragHoverEffect = hoverEffect }: Props) => {

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

  const uploadFileElems = uploadedFiles.map(file => {
    return (
      <div className="relative w-fit p-2 group" title={file.name} onClick={() => onRemoveFile(file)} >
        <span
          className="absolute top-[-2px] right-[-2px] opacity-0 group-hover:opacity-100 transition duration-500 text-red-500 cursor-pointer">
          <XIcon className="w-[12px]" />
        </span>
        <span>
          <File className="w-[25px] h-[25px]" />
        </span>
      </div >
    )
  });

  return (
    <div className={`w-full h-full flex flex-col p-2 bg-dark-bg`}>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`w-full border-2 border-dashed border-dark-bg flex flex-col justify-center rounded items-center transition duration-500 cursor-pointer ${showPreview && uploadedFiles.length > 0
          ? "h-[calc(100%-50px)]" : "h-full"} text-light-color-text ${className} ${dragOver ? dragHoverEffect : ""} `}>
        <Plus className="w-[30px] h-[30px]" />
        <p className="my-2">{displayName}</p>
      </div>
      <div className={`w-full overflow-x-scroll hide-scrollbar ${showPreview && uploadedFiles.length > 0 ? "h-[50px]" : ""} flex items-center`}>
        {uploadFileElems}
      </div>
    </div>
  )
}

export default DragNDrop
