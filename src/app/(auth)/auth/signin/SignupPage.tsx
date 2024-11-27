"use client";

import Loader from '@/app/components/loader/Loader';
import { signIn } from 'next-auth/react';
import React, { useEffect } from 'react'

const SignupPage = ({ callbackUrl }: { error: string | undefined, callbackUrl: string | undefined }) => {

  useEffect(() => {
    if (!callbackUrl) {
      callbackUrl = `${window.location.origin}/`;
    }
    signIn("vapps", { callbackUrl })
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader />
    </div>
  )
}

export default SignupPage;
