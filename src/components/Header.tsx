"use client"
import React from 'react'

import { MdOutlineLightMode } from "react-icons/md";
import { MdMenuOpen } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
    // const info = JSON.parse(localStorage.getItem("adminInfo"))
    const info = {}

    return (
        <header className='h-[70px] bg-[#112143] w-full'>
            <div className='flex items-center h-full p-4 pl-0'>
                <div className='w-[20%] pl-4 text-2xl text-white font-medium'>
                    EduHub
                </div>
                <div className='flex gap-4'>
                    <button className='text-white bg-[#1d315f] p-2 rounded-full'>
                        <MdMenuOpen size={20} />
                    </button>
                    <input type="text" placeholder='Search here....' className='outline-none text-sm rounded-sm bg-[#1d315f] py-2 px-3 text-white w-[500px]' />
                </div>
                <div className='flex items-center gap-4 justify-end flex-1'>
                    <button className='text-white bg-[#1d315f] p-2 rounded-full'>
                        <MdOutlineLightMode size={20} />
                    </button>
                    <button className='text-white bg-[#1d315f] p-2 rounded-full'>
                        <FaRegBell size={20} />
                    </button>
                    <Avatar className='w-9 h-9'>
                        <AvatarImage src={info?.avatar ? info?.avatar : "https://github.com/shadcn.png"} className='object-cover' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col text-sm text-white justify-between'>
                        <h5 className='font-medium'>Trần Đức Sơn</h5>
                        <h6 className='text-xs font-medium'>sontransonn@gmail.com</h6>
                    </div>
                </div>
            </div>
        </header>
    )
}
