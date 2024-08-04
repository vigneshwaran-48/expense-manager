"use client";

import { setTitle } from "@/lib/features/app/appSlice";
import { useAppDispatch } from "@/lib/hooks";

const Title = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();
  dispatch(setTitle(title));
  return <></>;
};

export default Title;
