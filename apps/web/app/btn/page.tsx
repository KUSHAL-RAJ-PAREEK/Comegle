"use client"
import { signIn } from "next-auth/react";
import {useSearchParams} from "next/navigation";

export default function Home() {

    const searchParams= useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/'
    console.log(`callbackUrllllllllllllllllllll  ${callbackUrl}}`)
    return (
        <button onClick={() => signIn('resend', { email: 'kushalrajpareek1@gmail.com',callbackUrl })}>
            Sign in with Email
        </button>
    );
}
