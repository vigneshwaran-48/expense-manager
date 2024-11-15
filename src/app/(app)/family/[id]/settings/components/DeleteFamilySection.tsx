"use client"

import { deleteFamily } from '@/app/actions/family';
import { addToast, ToastType } from '@/lib/features/toast/toastSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getUniqueId } from '@/util/getUniqueId';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const DeleteFamilySection = () => {

  const familyId = useAppSelector(state => state.familySlice.family.id);
  const [deleting, setDeleting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDeleteFamily = async () => {
    setDeleting(true);
    const response = await deleteFamily(familyId || "null");
    if (response.status === 200) {
      dispatch(addToast({ id: getUniqueId(), message: response.message, type: ToastType.SUCCESS }))
    } else {
      dispatch(addToast({ id: getUniqueId(), message: response.error, type: ToastType.ERROR }))
    }
    router.replace("/family");
  }

  return (
    <section className="w-full max-w-[500px] p-4 my-4 border-b">
      <h2 className="text-2xl font-bold">Delete Family</h2>
      <b><p className="text-light-color-text mt-2">This action can&apos;t be reverted!</p></b>
      <button
        className="bg-red-500 p-2 rounded my-4"
        disabled={deleting}
        onClick={handleDeleteFamily}
      >
        {deleting ? "Deleting" : "Delete Family"}
      </button>
    </section>
  )
}

export default DeleteFamilySection
