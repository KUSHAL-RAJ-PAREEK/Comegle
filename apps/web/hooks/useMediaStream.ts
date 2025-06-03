"use client"
import {useEffect, useRef, useState} from "react";
import {useMediaStreamStore} from "../store/useMediaStreamStore";

const useMediaStream = () =>{
    const state = useMediaStreamStore((state) => state.stream)
    const setState = useMediaStreamStore((state) => state.setStream)
const isStreamSet = useRef(false)

    useEffect(() =>{
        if(isStreamSet.current) return;
        // @ts-ignore
        isStreamSet.current = true;
        (async function initStream(){
            try{
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video:true
                })
                console.log("setting your stream")
                // @ts-ignore
                setState(stream)
            }catch(e){
                console.log("Error in media navigator",e)
            }
        } )()
    },[])
    return {
    stream : state
    }
}

export default useMediaStream;