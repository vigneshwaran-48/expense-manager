"use client";

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect } from 'react'

const SignupPage = ({ error, callbackUrl }: { error: string | undefined, callbackUrl: string | undefined }) => {

    useEffect(() => {
        if (!callbackUrl) {
            callbackUrl = `${window.location.origin}/`;
        }
        signIn("vapps", { callbackUrl })
    }, []);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <p>Authenticating ...</p>
        </div>
    )
}

const Icon = ({ link }: { link: string }) => {

    return (
        <Image
            src={link}
            alt="Google"
            width={50}
            height={50}
        />
    )
}


export default SignupPage;