import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Providers} from "../providers";


const geistSans = localFont({
    src: "/logo.png",
    variable: "--font-geist-sans",
});
const geistMono = localFont({
    src: "/logo.png",
    variable: "--font-geist-mono",
});

export const metadata: Metadata = {
    title: "Comegle",
    description: "College based omegle",
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} select-none`}>
        <Providers>
            {children}
        </Providers>

        </body>
        </html>
    );
}
