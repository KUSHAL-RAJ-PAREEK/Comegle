"use client"

import {signIn, signOut, useSession} from "next-auth/react";
import AuthBox from "./../../../components/AuthBox/AuthBox";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function Home() {
    const session = useSession();
    const router = useRouter();

    const status = session.status
    useEffect(() => {
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
                className="absolute top-0 left-0 w-full h-full bg-[url('/bg_auth.png')] bg-cover bg-center z-0 filter brightness-20 "/>
            <div className="flex justify-center items-center min-h-screen w-full">
                <section id="signin">
                    <AuthBox/>
                </section>

            </div>
            <div>
                <Navbar/>
            </div>
            <section id="about">
            <div className="relative min-h-screen w-full items-center justify-center bg-[oklch(75%_0.183_55.934)] ">
                <div className="absolute inset-0 bg-[url('/cat_background.svg')] bg-center  opacity-10 z-0" />


                <div className="relative z-10 flex flex-col justify-center items-center">

                    <p className="text-4xl font-bold text-white dark:text-white mt-8 px-10 text-center">
                        Welcome to Comegle - Your College’s Exclusive Random Video Chat!
                    </p>
                    <p className="text-2xl font-bold text-white dark:text-white mt-10 px-10 text-center">
                        Meet your college people Instantly Through Free Random Webcam Chat
                    </p>

                    <div className="flex flex-col md:flex-row items-start justify-between gap-5 px-4 mt-10 mb-10">

                        <div className="w-full md:w-1/2 lg:w-1/3 text-center md:text-text-left text-justify px-10">
                            <h2 className="text-xl font-bold text-white">
                                Discover the Excitement of College Video Chatting
                            </h2>
                            <p className="group text-white font-semibold mt-2">

                                Comegle instantly connects you to real college students

                                <span
                                    className="transition-all duration-300 px-1 rounded group-hover:text-black group-hover:shadow-lg group-hover:px-2">
 across the country,
                                offering a fun and spontaneous way to meet new people
</span>

                                &nbsp;
                                — just like Omegle,
                                but built specifically for the student experience. Whether it’s someone
                                from your own university or a campus on the other side of the country,
                                every chat brings the excitement of surprise.
                            </p>

                            <p className="group text-white font-semibold mt-2">
                                With thousands of students online day and night, Comegle the opens door to
                                <span
                                    className="transition-all duration-300 px-1 rounded group-hover:text-black group-hover:shadow-lg group-hover:px-2">
  endless social opportunities.
</span>

                                &nbsp; Say goodbye to boredom and
                                explore the best college-focused alternative to random video chats — completely free.
                            </p>


                            <p className="group text-white font-semibold mt-2">
                                Making friends in college isn’t always easy — but with Comegle, connecting is instant,
                                relaxed, and genuinely fun.

                                <span
                                    className="transition-all duration-300 px-1 rounded group-hover:text-black group-hover:shadow-lg group-hover:px-2">
    Switch chats at any time, meet new people, and enjoy
</span>

                                &nbsp;

                                authentic campus conversations from the comfort of your screen.
                            </p>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center items-center">
                            <img src="/img.png" alt="Video or Image" className="w-full max-w-sm rounded shadow"/>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/3 text-center md:text-text-right text-justify px-10">
                            <h2 className="text-xl font-bold text-white">
                                Working of Comegle
                            </h2>
                            <p className="group text-white font-semibold mt-2">
                                To ensure a safe and authentic community, every user on Comegle

                                <span
                                    className="transition-all duration-300 px-1 rounded group-hover:text-black group-hover:shadow-lg group-hover:px-2">
 must sign in using their official college email ID (e.g., username@ucla.edu). During sign-up,
                                Comegle extracts the domain part of your email (like ucla.edu) </span>

                                &nbsp;
                                and uses it to
                                identify which college or region you belong to. This not only verifies that
                                you're a real student, but also helps organize users into appropriate chat groups.
                            </p>
                            <p className="group text-white font-semibold mt-2">
                                Once verified, you’re added to a
                                <span
                                    className="transition-all duration-300 px-1 rounded group-hover:text-black group-hover:shadow-lg group-hover:px-2">
 dynamic stream pool of other students who signed
                                up with the same or similar college domains.
</span>

                                &nbsp;
                                 For example, if you're from ucla.edu,
                                you might be pooled with users from other West Coast universities.
                            </p>
                            <p className="group text-white font-semibold mt-2">
                                From here, you can instantly jump into random video or text chats with others in
                                your pool. Whether you’re looking to make friends, study partners, or just share
                                thoughts during a break,
                                <span
                                    className="transition-all duration-300 px-1 rounded group-hover:text-black group-hover:shadow-lg group-hover:px-2">
Comegle’s simple interface makes it easy
</span>

                                &nbsp;
                                . If a connection
                                doesn’t feel right, just hit Next to be paired with another real student —
                                all within your verified network.
                            </p>
                        </div>

                    </div>


                </div>
            </div>
            </section>
            <section id="developer">


            <div>
                <Footer/>
            </div>
            </section>
        </div>
    );
}