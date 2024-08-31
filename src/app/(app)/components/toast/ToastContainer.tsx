"use client";

import { useAppSelector } from "@/lib/hooks";
import React from "react";
import Toast from "./Toast";

const ToastContainer = () => {
  const toasts = useAppSelector((state) => state.toastSlice);

  const toastElems = toasts.map((toast) => (
    <Toast key={toast.id} toast={toast} />
  ));

  return (
    <div className="hide-scrollbar fixed flex flex-col top-0 right-0 max-w-[300px] w-full items-center p-2 overflow-y-scroll z-50">
      {toastElems}
    </div>
  );
};

export default ToastContainer;
