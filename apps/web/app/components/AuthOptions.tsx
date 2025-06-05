"use client"
import Image from "next/image";
import {useState} from "react";
import {signIn} from "next-auth/react";

export default function () {

    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await signIn('google')
        setTimeout(() => {
            setLoading(false);
        }, 4000);
    };

    return <div className="relative h-screen w-screen items-center justify-center bg-white">
        <div className="absolute inset-0 bg-[url('/pattern-5.svg')] bg-cover bg-center opacity-5 z-0"/>
        <div className="absolute inset-0 flex justify-center items-center">
            <div className="relative z-10 flex flex-col items-center justify-center">
                <p className="text-xl sm:text-xl md:text-2xl font-bold text-orange-400 text-center">
                    Meet your college crowd join <br/>
                    <span
                        className="bg-gradient-to-tl from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
    Comegle
  </span> now!
                </p>
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={120}
                    height={120}
                    className=" select-none pointer-events-none"
                />

                <div className="px-6 sm:px-0 max-w-sm mt-2">
                    <button
                        onClick={handleClick}
                        disabled={loading}
                        aria-label="Sign in with Google"
                        className={`flex items-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-base font-medium transition-all duration-200 ${
                            loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-md"
                        }`}
                    >
                        <div className="flex items-center justify-center bg-white w-7 h-7 rounded-l">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    className="fill-[#4285F4]"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    className="fill-[#34A853]"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    className="fill-[#FBBC05]"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    className="fill-[#EA4335]"
                                />
                            </svg>
                        </div>

                        <span className="text-gray-700">
          {loading ? "Signing in..." : "Sign in with Google"}
        </span>

                        {loading && (
                            <svg
                                className="w-5 h-5 animate-spin text-gray-500 ml-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                <p className="tracking-tighter text-gray-600 md:text-sm text-center mt-6">
                    <a href="#" className="font-semibold text-gray-900 underline decoration-indigo-500">No terms &
                        conditions</a>
                    , just college chaos. <br/> You’re old enough for this.
                </p>

                <p className="text-center text-sm text-gray-500 mt-5">
                    Made with <span className="text-red-500">❤️</span> in Jaipur
                </p>

            </div>

        </div>
    </div>
}