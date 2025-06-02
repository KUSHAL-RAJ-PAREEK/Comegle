"use client"
import { SessionProvider } from "next-auth/react";
import {SocketProvider} from "./context/socket";
export const Providers = ({children}: {children: React.ReactNode}) => {
    return <SessionProvider>
        <SocketProvider>
            {children}
        </SocketProvider>
        </SessionProvider>
}