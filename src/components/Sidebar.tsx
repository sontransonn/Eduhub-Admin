"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MdDashboard, MdSchool } from "react-icons/md";
import { FaCartArrowDown, FaUser, FaUserGraduate } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";

const sidebarItems = [
    { label: "Tổng quan", icon: <MdDashboard size={22} />, route: "/" },
    {
        label: "Khóa học",
        icon: <MdSchool size={22} />,
        route: "course",
        hasSubmenu: true,
        submenu: [
            { label: "Danh sách khóa học", route: "overview" },
            { label: "Khóa học chờ duyệt", route: "pending" },
        ],
    },
    {
        label: "Người dùng",
        icon: <FaUserAstronaut size={22} />,
        route: "user",
        hasSubmenu: true,
        submenu: [
            { label: "Danh sách người dùng", route: "overview" },
            { label: "Giảng viên chờ duyệt", route: "pending" },
        ],
    },
    {
        label: "Đơn hàng",
        icon: <FaCartArrowDown size={22} />,
        route: "/orders",
    },
    { label: "Đăng nhập", icon: <FaUser size={22} />, route: "/login" },
    { label: "Đăng ký", icon: <FaUser size={22} />, route: "/signup" },
];

export default function Sidebar() {
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const pathname = usePathname(); // Lấy route hiện tại

    const toggleSubmenu = (index: number) => {
        setActiveMenu(activeMenu === index ? null : index);
    };

    const isActive = (route: string): boolean => {
        // Kiểm tra chính xác route hiện tại hoặc các submenu
        return pathname === route || pathname.startsWith(route + "/");
    };


    const handleClick = (e: React.MouseEvent<HTMLDivElement>, hasSubmenu: boolean, index: number) => {
        if (hasSubmenu) {
            e.preventDefault();
            toggleSubmenu(index);
        }
    };

    return (
        <div className="h-[calc(100vh-70px)] w-[20%] bg-[#112143] text-white shadow-lg flex flex-col justify-between">
            <div className="p-4 overflow-y-auto scrollbar-hide">
                <ul className="flex flex-col space-y-4">
                    {sidebarItems.map((item, index) => (
                        <li
                            key={index}
                            className={`py-3 px-4 flex flex-col rounded-lg transition-all duration-300 ${isActive(item.route) ? "bg-[#293857] text-white shadow-lg" : "hover:bg-[#293857]"
                                }`}
                        >
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={(e) => handleClick(e, !!item.hasSubmenu, index)}
                            >
                                {!item.hasSubmenu ? (
                                    <Link href={item.route} className="flex items-center gap-3">
                                        {item.icon}
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                )}
                                {item.hasSubmenu && (
                                    <MdArrowForwardIos
                                        className={`transition-transform ${activeMenu === index ? "rotate-90" : ""
                                            }`}
                                    />
                                )}
                            </div>
                            {item.hasSubmenu && activeMenu === index && (
                                <ul className="mt-2 space-y-2 pl-5 text-sm">
                                    {item.submenu?.map((subItem, subIndex) => (
                                        <Link
                                            href={`/${item.route}/${subItem.route}`}
                                            key={subIndex}
                                            className={`block py-2 px-2 rounded-lg hover:bg-blue-700 transition ${pathname === `/${item.route}/${subItem.route}`
                                                ? "bg-blue-600 text-white"
                                                : ""
                                                }`}
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-5">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300">
                    LOGOUT
                </button>
            </div>
        </div>
    );
}
