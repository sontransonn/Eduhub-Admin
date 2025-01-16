'use client'
import React from 'react'
import { usePathname } from 'next/navigation';

import Header from "@/components/Header";
import Sidebar from '@/components/Sidebar';

const routeNoUseRootLayout = new Set(["/login"]);

export default function LayoutProvider({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname()
    const isRoute = routeNoUseRootLayout.has(pathname)

    if (isRoute) {
        return <>{children}</>
    }

    return (
        <>
            <Header />
            <main className='bg-[#ebe9ea] flex'>
                <Sidebar />
                {children}
            </main>
        </>
    )
}
