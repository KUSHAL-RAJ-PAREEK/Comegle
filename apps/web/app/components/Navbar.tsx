import Image from "next/image";
import {useState} from "react";

export default function () {

    const [isClick, setisClick] = useState(false);

    const toggleNavbar = () => {
        setisClick(!isClick)
    }
    return (
        <>
            <nav className="bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <a href="#signin" className="text-white">
                                    <Image
                                        src="/logo.png"
                                        alt="Logo"
                                        width={80}
                                        height={80}
                                        className=" select-none pointer-events-none"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center space-x-4">
                                <a href="#signin" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                                    Signin
                                </a>
                                <a href="#about" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                                    About
                                </a>
                                <a href="#developer"
                                   className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                                    Developer
                                </a>
                            </div>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button
                                className="group inline-flex w-8 h-8 text-slate-800 bg-white text-center items-center justify-center rounded shadow-[0_1px_0_theme(colors.slate.950/.04),0_1px_2px_theme(colors.slate.950/.12),inset_0_-2px_0_theme(colors.slate.950/.04)] hover:shadow-[0_1px_0_theme(colors.slate.950/.04),0_4px_8px_theme(colors.slate.950/.12),inset_0_-2px_0_theme(colors.slate.950/.04)] transition"
                                aria-pressed={isClick}
                                onClick={toggleNavbar}
                            >
                                <span className="sr-only">Menu</span>
                                <svg
                                    className="w-6 h-6 fill-current pointer-events-none"
                                    viewBox="0 0 16 16"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]
        ${isClick ? 'translate-x-0 translate-y-0 rotate-[315deg]' : '-translate-y-[5px] translate-x-[7px]'}`}
                                        y="7"
                                        width="9"
                                        height="2"
                                        rx="1"
                                    />
                                    <rect
                                        className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]
        ${isClick ? 'rotate-45' : ''}`}
                                        y="7"
                                        width="16"
                                        height="2"
                                        rx="1"
                                    />
                                    <rect
                                        className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]
        ${isClick ? 'translate-y-0 -rotate-[225deg]' : 'translate-y-[5px]'}`}
                                        y="7"
                                        width="9"
                                        height="2"
                                        rx="1"
                                    />
                                </svg>
                            </button>

                        </div>
                    </div>
                </div>
                {isClick && (
                    <div>
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a onClick={() => {
                                setisClick(!isClick)
                            }}
                               href="#signin"
                               className="text-white block hover:bg-white hover:text-black rounded-lg p-2">
                                Signin
                            </a>
                            <a onClick={() => {
                                setisClick(!isClick)
                            }}
                               href="#about"
                               className="text-white block hover:bg-white hover:text-black rounded-lg p-2">
                                About
                            </a>
                            <a onClick={() => {
                                setisClick(!isClick)
                            }} href="#developer"
                               className="text-white block hover:bg-white hover:text-black rounded-lg p-2">
                                Developer
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}