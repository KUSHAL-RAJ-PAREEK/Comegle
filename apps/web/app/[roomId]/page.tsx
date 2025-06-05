"use client"
import {useSocketStore} from "../../store/useSocketStore";
import usePeer from "../../hooks/usePeer";
import useMediaStream from "../../hooks/useMediaStream";

import Player from "../components/Player/index"
import {useEffect, useState} from "react";
import usePlayer from "../../hooks/usePlayer";
import {useParams} from "next/navigation";
import {cloneDeep} from "lodash";
import {useUsersStore} from "../../store/useUsersStore";
import About from "../components/About";
import Footer from "../components/Footer";
import InNavBar from "../components/InNavBar";
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {useFullScreenStore} from "../../store/useFullScreenStore";
import BackgroundVideo from "next-video/background-video";
import noise from "../../videos/noise_2.mp4.json";
// @ts-ignore
import {Asset} from "next-video/dist/assets";
import {useMessageStore} from "../../store/useMessageStore";
import sendMessage from "../lib/actions/sendMessage";

const Room = () => {
    const socket = useSocketStore((state) => state.socket);

    const {uId, peer, myId} = usePeer();
    const {stream} = useMediaStream();
    const {roomId} = useParams();

    const isFullScreen = useFullScreenStore(state => state.isFullScreen);
    const setFullScreen = useFullScreenStore(state => state.setFullScreen);
    const messages = useMessageStore((state) => state.messages);


    const {
        players,
        setPlayers,
        playerHighlighted,
        playersCopy: nonHighlightedPlayers,
        leaveRoom,
        stopRoom
    } = usePlayer(uId, roomId, peer);


    const users = useUsersStore((state) => state.users);
    const setUser = useUsersStore((state) => state.setUser);
    const removeUser = useUsersStore((state) => state.removeUser);
    const [typedMsg, SetTypedMsg] = useState('');


    useEffect(() => {
        if (!socket || !peer || !stream) return;
        const handleUserConnected = (newUser: string) => {
            console.log(`user connected in room with ${newUser}`)

            const call = peer.call(newUser, stream)

            call.on('stream', (incomingStream: any) => {
                console.log(`incoming stream from ${newUser}`)
                setPlayers((prev) => ({
                    ...prev,
                    [newUser]: {
                        url: incomingStream,
                        muted: false,
                        playing: true
                    }
                }))

                // @ts-ignore
                setUser((prev: any) => ({
                    ...prev,
                    [newUser]: call
                }))

            })
        }
        socket.on("user-connected", handleUserConnected)

        return () => {
            socket.off("user-connected", handleUserConnected)
        }
    }, [peer, socket, stream]);


    useEffect(() => {
        const handleFullScreenChange = () => {
            const isFullScreen = !!document.fullscreenElement;
            setFullScreen(isFullScreen);
        };
        document.addEventListener("fullscreenchange", handleFullScreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullScreenChange);
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleUserLeave = (userId: any) => {
            console.log(`user ${userId} leaving the room`)

            users[userId]?.close()
            const playerCopy = cloneDeep(players);
            delete playerCopy[userId]

            setPlayers((prev) => {
                const playerCopy = {...prev};
                delete playerCopy[userId];
                return playerCopy;
            });
            removeUser(userId)
            console.log("player copy:   ", playerCopy)
        }

        socket.on(`user-leave`, handleUserLeave)

        return () => {
            socket.off(`user-leave`, handleUserLeave)
        }
    }, [setPlayers, socket, users]);


    useEffect(() => {
        if (!peer || !stream) return;

        peer.on('call', (call: any) => {
            const {peer: callerId} = call;
            call.answer(stream)

            call.on('stream', (incomingStream: any) => {
                console.log(`incoming stream from ${callerId}`)
                // @ts-ignore
                setPlayers((prev) => ({
                    ...prev,
                    [callerId]: {
                        url: incomingStream,
                        muted: false,
                        playing: true
                    }
                }))
                // @ts-ignore
                setUser((prev) => ({
                    ...prev,
                    [callerId]: call
                }))
            })
        })
    }, [peer, setPlayers, stream]);


    useEffect(() => {
        if (!stream || !myId) return;
        console.log(`setting My stream ${myId}`)
        setPlayers((prev) => ({
            ...prev,
            [myId]: {
                url: stream,
                muted: false,
                playing: true
            }
        }))
    }, [myId, setPlayers, stream])

    const toggleFullScreen = () => {
        const elem = document.documentElement;

        if (!document.fullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if ((elem as any).webkitRequestFullscreen) {
                (elem as any).webkitRequestFullscreen();
            } else if ((elem as any).msRequestFullscreen) {
                (elem as any).msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            } else if ((document as any).msExitFullscreen) {
                (document as any).msExitFullscreen();
            }
        }
    };


    return (
        <>
            <div className="absolute inset-0 bg-[url('/unicorn_bg.svg')] bg-gray-100 bg-center opacity-10 z-0"/>

            <section id="video" className="relative">

                {
                    isFullScreen ? (
                        <>
                            <div className="flex flex-col
                 md:flex-row h-auto  w-[100vw] mx-auto mt-1 rounded-2xl overflow-hidden bg-white">
                                <div className="w-full md:w-1/2 h-auto  bg-gray-200">
                                    {(() => {
                                        const filteredPlayers = Object.keys(nonHighlightedPlayers).filter(playerId => {

                                            const url = nonHighlightedPlayers[playerId]?.url;

                                            return playerHighlighted && url !== playerHighlighted?.url;
                                        });

                                        if (filteredPlayers.length === 0) {
                                            return <div className="w-full h-full">
                                                <div className="relative w-full h-full rounded-l-2xl overflow-hidden">
                                                    <BackgroundVideo
                                                        disableTracking
                                                        maxResolution="720p"
                                                        className="absolute top-0 left-0 w-full h-full object-cover scale-[2.5]"
                                                        controls={false}
                                                        src={noise as Asset}
                                                        autoPlay
                                                    />
                                                </div>
                                            </div>
                                        }

                                        return filteredPlayers.map(playerId => {

                                            const player = nonHighlightedPlayers[playerId];
                                            if (!player) return null;
                                            const { url, muted, playing } = player;

                                            return (
                                                <Player
                                                    key={playerId}
                                                    url={url}
                                                    muted={muted}
                                                    playing={playing}
                                                    isActive={false}
                                                />
                                            );
                                        });
                                    })()}
                                </div>

                                <div className="w-full md:w-1/2 h-auto bg-gray-200">
                                    {playerHighlighted ? (
                                        <Player
                                            url={playerHighlighted.url}
                                            muted={playerHighlighted.muted}
                                            playing={playerHighlighted.playing}
                                            isActive={true}
                                        />
                                    ) : (
                                        <div className="overflow-auto">
                                            <BackgroundVideo
                                                disableTracking
                                                maxResolution="720p"
                                                style={{
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'fill',
                                                }}
                                                controls={false}
                                                src={noise as Asset}
                                                autoPlay
                                            />
                                        </div>

                                    )}
                                </div>
                            </div>

                            <div className="flex flex-row justify-between items-start w-full mt-2">

                                <div
                                    className="w-full gap-2 flex items-center justify-center mt-2 md:flex-row md:justify-start mx-25 md:mx-20">
                                    <div onClick={
                                        () => leaveRoom()
                                    }
                                         className='w-50 h-45'>
                                        <div className='button w-40 h-35 bg-green-400 rounded-lg cursor-pointer select-none
  active:translate-y-2 active:[box-shadow:0_0px_0_0_#22c55e,0_0px_0_0_#22c55e41]
  active:border-b-[0px]
  transition-all duration-150 [box-shadow:0_10px_0_0_#22c55e,0_15px_0_0_#22c55e41]
  border-b-[1px] border-green-500
'>

                        <span
                            className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Next</span>
                                        </div>
                                    </div>

                                    <div onClick={
                                        () => {
                                            return stopRoom()
                                        }
                                    } className='  w-50 h-45'>
                                        <div className='button w-40 h-35 bg-red-300 rounded-lg cursor-pointer select-none
  active:translate-y-2 active:[box-shadow:0_0px_0_0_#fca5a5,0_0px_0_0_#fecaca]
  active:border-b-[0px]
  transition-all duration-150 [box-shadow:0_10px_0_0_#fca5a5,0_15px_0_0_#fecaca]
  border-b-[1px] border-red-200
'>
                        <span
                            className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Stop</span>
                                        </div>

                                    </div>

                                    <div onClick={toggleFullScreen} className=' w-50 h-45'>
                                        <div className='hidden md:block button w-40 h-35 bg-blue-500 rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
    border-b-[1px] border-blue-400
  '>
                        <span
                            className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>{
                            isFullScreen ? 'Exit' : 'Full Screen'
                        }</span>
                                        </div>

                                    </div>
                                    <div
                                        className="hidden md:flex relative h-40 w-full rounded-2xl bg-gray-100 overflow-hidden mb-6 items-center flex flex-col">

                                        <div className="flex-1 overflow-y-auto p-3 pr-2 w-full">
                                            {messages.map(({userId, msg}, index) => (
                                                <div
                                                    key={index}
                                                    className={`mb-2 flex ${userId === myId ? "justify-end" : "justify-start"}`}
                                                >
                                                    <p
                                                        className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                                                            userId === myId ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                                                        }`}
                                                    >
                                                        {msg}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                // @ts-ignore
                                                sendMessage(socket, typedMsg, roomId, myId);
                                                SetTypedMsg('')
                                            }}
                                            className="flex gap-2 p-3  border-gray-300 w-full"
                                        >
                                            <input
                                                value={typedMsg}
                                                onChange={(e) => SetTypedMsg(e.target.value)}
                                                type="text"
                                                placeholder="Type your message..."
                                                className="flex-1 bg-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                            >
                                                Send
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="relative h-full w-full bg-gray-900 text-white">
                                <div className="flex flex-col bg-gray-900 justify-center items-center">

                                    <div className="flex space-x-6 mt-6">
                                        <a
                                            href="https://www.linkedin.com/in/kushal-raj-pareek/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-3xl text-white hover:text-blue-500 transition-colors"
                                        >
                                            <FaLinkedin/>
                                        </a>
                                        <a
                                            href="https://github.com/KUSHAL-RAJ-PAREEK"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-3xl text-white hover:text-gray-400 transition-colors"
                                        >
                                            <FaGithub/>
                                        </a>
                                    </div>
                                    <p className="text-center text-sm text-gray-500 my-4">
                                        Made with <span className="text-red-500">❤️</span> in Jaipur
                                    </p>
                                </div>


                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col h-[20vh]
                 md:flex-row h-auto min-h-[74.5vh] w-[90vw] mx-auto mt-1 rounded-2xl overflow-hidden bg-white">
                                <div className="w-full md:w-1/2 h-auto  bg-gray-200">
                                    {(() => {
                                        const filteredPlayers = Object.keys(nonHighlightedPlayers).filter(playerId => {

                                            const url = nonHighlightedPlayers[playerId]?.url;

                                            return playerHighlighted && url !== playerHighlighted?.url;
                                        });

                                        if (filteredPlayers.length === 0) {
                                            return <div className="w-full h-full">
                                                <div className="relative w-full h-full rounded-l-2xl overflow-hidden">
                                                    <BackgroundVideo
                                                        disableTracking
                                                        maxResolution="720p"
                                                        className="absolute top-0 left-0 w-full h-full object-cover scale-[2.5]"
                                                        controls={false}
                                                        src={noise as Asset}
                                                        autoPlay
                                                    />
                                                </div>
                                            </div>
                                        }

                                        return filteredPlayers.map(playerId => {

                                            const player = nonHighlightedPlayers[playerId];
                                            if (!player) return null;

                                            const { url, muted, playing } = player;
                                            return (
                                                <Player
                                                    key={playerId}
                                                    url={url}
                                                    muted={muted}
                                                    playing={playing}
                                                    isActive={false}
                                                />
                                            );
                                        });
                                    })()}

                                </div>

                                <div className="w-full md:w-1/2 h-auto bg-gray-200">
                                    {playerHighlighted && (
                                        <Player
                                            url={playerHighlighted.url}
                                            muted={playerHighlighted.muted}
                                            playing={playerHighlighted.playing}
                                            isActive={true}
                                        />
                                    )}
                                </div>
                            </div>


                            <div className="flex flex-row justify-between items-start w-full mt-2">
                                <div
                                    className="w-full gap-2 flex items-center justify-center mt-2 md:flex-row md:justify-start mx-25 md:mx-20">
                                    <div onClick={
                                        () => leaveRoom()

                                    }
                                         className='w-50 h-45'>
                                        <div className='button w-40 h-35 bg-green-400 rounded-lg cursor-pointer select-none
  active:translate-y-2 active:[box-shadow:0_0px_0_0_#22c55e,0_0px_0_0_#22c55e41]
  active:border-b-[0px]
  transition-all duration-150 [box-shadow:0_10px_0_0_#22c55e,0_15px_0_0_#22c55e41]
  border-b-[1px] border-green-500
'>

                        <span
                            className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Next</span>
                                        </div>
                                    </div>

                                    <div onClick={
                                        () => stopRoom()
                                    } className='  w-50 h-45'>
                                        <div className='button w-40 h-35 bg-red-300 rounded-lg cursor-pointer select-none
  active:translate-y-2 active:[box-shadow:0_0px_0_0_#fca5a5,0_0px_0_0_#fecaca]
  active:border-b-[0px]
  transition-all duration-150 [box-shadow:0_10px_0_0_#fca5a5,0_15px_0_0_#fecaca]
  border-b-[1px] border-red-200
'>
                        <span
                            className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Stop</span>
                                        </div>

                                    </div>

                                    <div onClick={toggleFullScreen} className='w-50 h-45'>
                                        <div className='hidden md:block button w-40 h-35 bg-blue-500 rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
    border-b-[1px] border-blue-400
  '>
                        <span
                            className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>{
                            isFullScreen ? 'Exit' : 'Full Screen'
                        }</span>
                                        </div>

                                    </div>
                                    <div
                                        className="hidden md:flex relative h-40 w-full rounded-2xl bg-gray-100 overflow-hidden mb-6 items-center flex flex-col">

                                        <div className="flex-1 overflow-y-auto p-3 pr-2 w-full">
                                            {messages.map(({userId, msg}, index) => (
                                                <div
                                                    key={index}
                                                    className={`mb-2 flex ${userId === myId ? "justify-end" : "justify-start"}`}
                                                >
                                                    <p
                                                        className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                                                            userId === myId ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                                                        }`}
                                                    >
                                                        {msg}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                // @ts-ignore
                                                sendMessage(socket, typedMsg, roomId, myId);
                                                SetTypedMsg('')
                                            }}
                                            className="flex gap-2 p-3  border-gray-300 w-full"
                                        >
                                            <input
                                                value={typedMsg}
                                                onChange={(e) => SetTypedMsg(e.target.value)}
                                                type="text"
                                                placeholder="Type your message..."
                                                className="flex-1 bg-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                            >
                                                Send
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </section>
            {!isFullScreen && (
                <>
                    <div>
                        <InNavBar/>
                    </div>
                    <About/>
                    <section id="developer">
                        <div>
                            <Footer/>
                        </div>
                    </section>
                </>
            )}

        </>
    )
}

export default Room;