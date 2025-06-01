"use client";
// @ts-ignore
import RainbowCursor from "../../hooks/useRainbow";
import { useRef, useEffect, useState } from "react";
import {FaGithub, FaLinkedin} from "react-icons/fa";

export default function Footer() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isReady, setIsReady] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (wrapperRef.current) {
            setIsReady(true);
        }
    }, []);
    // console.log(isReady)
    return (
        <div
            className="relative h-full w-full bg-gray-900 text-white"
            ref={wrapperRef}
        >
            {isReady && wrapperRef.current && (
                <RainbowCursor
                    element={wrapperRef.current}
                    length={15}
                    size={2}
                    colors={["#FF0000", "#00FF00", "#0000FF"]}
                />
            )}
            <div className="flex flex-col bg-gray-900 justify-center items-center">
                <button
                    className="text-9xl  font-bold transition-transform duration-300 hover:scale-170 hover:text-gray-200 hover:opacity-20 mt-20"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    K R P
                </button>

                <div className="h-12 mt-7">
                    {hovered && (
                        <p className="text-xl text-white typing-animation-desktop sm:typing-animation-mobile">
                            Kushal Raj Pareek
                        </p>
                    )}
                </div>

                <div className="flex space-x-6 my-8">
                    <a
                        href="https://www.linkedin.com/in/kushal-raj-pareek/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-3xl text-white hover:text-blue-500 transition-colors"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://github.com/KUSHAL-RAJ-PAREEK"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-3xl text-white hover:text-gray-400 transition-colors"
                    >
                        <FaGithub />
                    </a>
                </div>
            </div>


        </div>
    );
}
