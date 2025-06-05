"use client"

import {signIn, signOut, useSession} from "next-auth/react";
import AuthBox from "./../../../components/AuthBox/AuthBox";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import About from "../../../components/About";

export default function Home() {
    const session = useSession();
    const router = useRouter();

    const status = session.status
    useEffect(() => {
        sessionStorage.setItem("hasReloaded", "no");

        if (status == "authenticated") {
            router.replace("/")
        }
    }, [status, router]);

    if (status == "loading") {
        return <div className="flex flex justify-center items-center h-screen w-full">
            <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
                <div
                    className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"
                ></div>
            </div>

        </div>
    }
    return (
        <div>
            <div
                className="absolute top-0 left-0 w-full h-screen bg-[url('/unicorn_bg.svg')] bg-center z-0 opacity-35 filter brightness-10"/>
            <div className="flex justify-center items-center min-h-screen w-full">
                <section id="signin">
                    <AuthBox/>
                </section>

            </div>
            <div>
                <Navbar/>
            </div>
          <About/>
            <section id="developer">
                <div>
                    <Footer/>
                </div>
            </section>
        </div>
    );
}