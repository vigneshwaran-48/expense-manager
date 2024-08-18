"use client";

import ErrorIcon from "@/app/components/icon/ErrorIcon";
import TickIcon from "@/app/components/icon/TickIcon";
import WarningIcon from "@/app/components/icon/WarningIcon";
import XIcon from "@/app/components/icon/XIcon";
import {
  removeToast,
  Toast as T,
  ToastType,
} from "@/lib/features/toast/toastSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { useEffect } from "react";

const Toast = ({ toast }: { toast: T }) => {
  const { id, message, duration = 3, type } = toast;
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeToast(id));
    }, duration * 1000);
  }, []);

  const icon =
    type === ToastType.SUCCESS ? (
      <TickIcon />
    ) : type === ToastType.ERROR ? (
      <ErrorIcon />
    ) : (
      <WarningIcon />
    );

  const textColor =
    type === ToastType.ERROR
      ? "text-red-600"
      : type === ToastType.SUCCESS
      ? "text-green-500"
      : "text-orange-500";

  const bgColor =
    type === ToastType.ERROR
      ? "bg-red-600"
      : type === ToastType.SUCCESS
      ? "bg-green-500"
      : "bg-orange-500";

  return (
    <div
      className={`flex flex-col w-full justify-between bg-dark-bg shadow-toast rounded mb-2`}
    >
      <div className={`flex relative items-center p-2`}>
        <span
          className={`flex ${textColor} w-[22px] h-[22px] justify-center items-center rounded-full`}
        >
          {icon}
        </span>
        <p className="flex-1 text-center">{message}</p>
        <span
          className={`flex rounded-full h-full text-[14px] justify-center items-center transition cursor-pointer`}
          onClick={() => dispatch(removeToast(id))}
        >
          <XIcon className="w-[14px] h-[14px]" />
        </span>
      </div>
      <div className={`h-[5px] ${bgColor}`}></div>
    </div>
  );
};

export default Toast;
