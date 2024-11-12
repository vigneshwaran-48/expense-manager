"use client";

import { setTitle } from "@/lib/features/app/appSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";

const Title = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTitle(title));
  }, [title]);
  return <></>;
};

export default Title;
