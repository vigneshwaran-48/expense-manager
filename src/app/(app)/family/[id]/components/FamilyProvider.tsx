"use client";

import { getMemberOfFamily } from "@/app/actions/family";
import { setFamily } from "@/lib/features/family/familySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";

const FamilyProvider = ({ familyId }: { familyId: string }) => {
  const userId = useAppSelector((state) => state.userSlice.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const familyMember = await getMemberOfFamily(familyId, userId);
      dispatch(
        setFamily({ family: familyMember.family, role: familyMember.role })
      );
    })();
  }, [familyId]);
  return <></>;
};

export default FamilyProvider;
