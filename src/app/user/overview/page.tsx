"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { MdHome } from "react-icons/md";
import { FaFilter, FaShoppingCart } from "react-icons/fa";
import { FaBox, FaUser } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { getAllUser } from "@/api/admin.api";

export default function Orders() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);
    const [totalUser, setTotalUser] = useState(0)
    const [users, setUsers] = useState([{
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        country: "",
        city: "",
        dateOfBirth: "",
        role: ""
    }])

    useEffect(() => {
        fetchData()
    }, [currentPage])

    const fetchData = async () => {
        try {
            const data = await getAllUser(currentPage)
            setUsers(data.user)
            setTotalUser(data.totalUser)
            setTotalPages(data.totalPages)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Failed:', error.message);
            } else {
                console.error('Failed with an unknown error');
            }
        }
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col gap-5 p-5 bg-[#071739] w-[80%] overflow-y-auto scrollbar-hide h-[calc(100vh-70px)]">
            <div className="bg-[#1b2b4d] flex justify-between shadow p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white">Tổng quan người dùng</h3>
                <div className="flex items-center gap-3">
                    <button className="bg-gray-200 hover:bg-gray-300 py-0.5 px-2 text-[13px] rounded-lg flex items-center gap-1.5">
                        <MdHome size={16} />
                        Dashboard
                    </button>
                    /
                    <button className="bg-gray-200 hover:bg-gray-300 py-0.5 px-2 text-[13px] rounded-lg">Users</button>
                </div>
            </div>

            {/* Card Statistics */}
            <div className="flex gap-5">
                <div className="w-1/3 bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-lg text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-xl font-semibold">Total Users</h4>
                            <p className="text-3xl font-bold">277</p>
                        </div>
                        <div className="bg-white text-green-500 p-3 rounded-full">
                            <FaUser size={30} />
                        </div>
                    </div>
                </div>
                <div className="w-1/3 bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-lg shadow-lg text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-xl font-semibold">Total Users</h4>
                            <p className="text-3xl font-bold">277</p>
                        </div>
                        <div className="bg-white text-purple-500 p-3 rounded-full">
                            <FaShoppingCart size={30} />
                        </div>
                    </div>
                </div>
                <div className="w-1/3 bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-xl font-semibold">Total Users</h4>
                            <p className="text-3xl font-bold">277</p>
                        </div>
                        <div className="bg-white text-blue-500 p-3 rounded-full">
                            <FaBox size={30} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-[#1b2b4d] p-5 rounded-lg shadow flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="p-2 rounded border border-gray-300 text-sm"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="canceled">Đã hủy</option>
                        <option value="paid">Đã thanh toán</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="Tìm kiếm đơn hàng..."
                        className="p-2 border border-gray-300 rounded text-sm w-[200px]"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm flex items-center gap-1">
                        <FaFilter /> Lọc
                    </button>
                </div>
            </div>

            {/* List of Orders */}
            <div className="w-full bg-[#1b2b4d] rounded-lg p-5 flex flex-col gap-5 pr-5">
                <h3 className="text-white text-lg font-bold">Danh sách các người dùng</h3>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="border border-[#33333] px-4 py-2">STT</th>
                                <th className="border border-[#33333] px-4 py-2">Email</th>
                                <th className="border border-[#33333] px-4 py-2">Phone</th>
                                <th className="border border-[#33333] px-4 py-2">Role</th>
                                <th className="border border-[#33333] px-4 py-2">Gender</th>
                                <th className="border border-[#33333] px-4 py-2">Country</th>
                                <th className="border border-[#33333] px-4 py-2">Date of Birth</th>
                                <th className="border border-[#33333] px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-sm">
                            {users?.map((user, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-[#1b2b4d]' : 'bg-[#17223e]'} text-white`}>
                                    <td className="border border-[#33333] px-4 py-2 text-center">#{(currentPage - 1) * 8 + index + 1}</td>
                                    <td className="border border-[#33333] px-4 py-2 text-center">{user?.email || 'N/A'}</td>
                                    <td className="border border-[#33333] px-4 py-2 text-center">{user?.phone || 'N/A'}</td>
                                    <td className="border border-[#33333] px-4 py-2 text-center">{user?.role || 'N/A'}</td>
                                    <td className="border border-[#33333] px-4 py-2 text-center">{user?.gender || 'N/A'}</td>
                                    <td className="border border-[#33333] px-4 py-2 text-center">{user?.country || 'N/A'}</td>
                                    <td className="border border-[#33333] px-4 py-2 text-center">{formatDate(user?.dateOfBirth)}</td>
                                    <td className="border border-[#33333] px-4 py-2 text-white text-center gap-1.5">
                                        <button className="p-2 text-xs bg-purple-500 hover:bg-purple-600 rounded">
                                            <FaEye />
                                        </button>
                                        <button className="p-2 text-xs bg-green-500 hover:bg-green-600 rounded ml-1.5">
                                            <FaPencilAlt />
                                        </button>
                                        <button className="p-2 text-xs bg-red-500 hover:bg-red-600 rounded ml-1.5">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalUser >= 8 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    className={`bg-gray-200 hover:bg-gray-300`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) {
                                            handlePageChange(currentPage - 1)
                                        }
                                    }}
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }).map((page, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href={"#"}
                                        className={`${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(index + 1);
                                        }}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    className={`bg-gray-200 hover:bg-gray-300`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < totalPages) {
                                            handlePageChange(currentPage + 1)
                                        }
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
}
