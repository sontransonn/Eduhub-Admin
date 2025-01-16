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

import { getPendingCourse, approvedCourse, getAllApplication } from "@/api/admin.api";

export default function Orders() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [courses, setCourses] = useState([{
        _id: "",
        poster: "",
        courseName: "",
        description: "",
        category: "",
        approvedBy: {
            fullName: ""
        },
        price: 0,
        rating: 0,
        approvalStatus: "",
        createdAt: "",
        sold: 0
    }])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);
    const [totalCourse, setTotalCourse] = useState(0)

    useEffect(() => {
        fetchData()
    }, [currentPage])

    const fetchData = async () => {
        try {
            const data = await getAllApplication()

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

    const handleApproved = async (courseId: string) => {
        const isConfirmed = window.confirm("Bạn chắc chắn muốn xuất bản khóa học này?");
        if (isConfirmed) {
            try {
                const data = await approvedCourse(courseId)
                toast.success(data.message)
                fetchData()
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(error.message)
                    console.error('Failed:', error.message);
                } else {
                    console.error('Failed with an unknown error');
                }
            }
        }
    }

    return (
        <div className="flex flex-col gap-5 p-5 bg-[#071739] w-[80%] overflow-y-auto scrollbar-hide h-[calc(100vh-70px)]">
            <div className="bg-[#1b2b4d] flex justify-between shadow p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white">Khóa học chờ duyệt</h3>
                <div className="flex items-center gap-3">
                    <button className="bg-gray-200 hover:bg-gray-300 py-0.5 px-2 text-[13px] rounded-lg flex items-center gap-1.5">
                        <MdHome size={16} />
                        Dashboard
                    </button>
                    /
                    <button className="bg-gray-200 hover:bg-gray-300 py-0.5 px-2 text-[13px] rounded-lg">Orders</button>
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
                <h3 className="text-white text-lg font-bold">Danh sách các khóa học</h3>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="border border-[#33333] px-4 py-2">STT</th>
                                <th className="border border-[#33333] px-4 py-2">Course</th>
                                <th className="border border-[#33333] px-4 py-2">Category</th>
                                <th className="border border-[#33333] px-4 py-2">Instructor</th>
                                <th className="border border-[#33333] px-4 py-2">Price</th>
                                <th className="border border-[#33333] px-4 py-2">Date</th>
                                <th className="border border-[#33333] px-4 py-2">Status</th>
                                <th className="border border-[#33333] px-4 py-2">Actions</th>
                                <th className="border border-[#33333] px-4 py-2">Approve</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {courses.map((course, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-[#1b2b4d]' : 'bg-[#17223e]'} text-white`}>
                                    <td className="border border-[#33333] px-4 py-2 text-center">#{(currentPage - 1) * 8 + index + 1}</td>
                                    <td className="border border-[#33333] px-4 py-2 flex gap-2">
                                        <img src={course?.poster} alt="" className="w-20 h-12 rounded-sm" />
                                        <div className="flex flex-col flex-wrap">
                                            <h5 className="font-semibold text-sm">{course.courseName.slice(0, 24)}...</h5>
                                            <p className="text-xs">{course?.description.slice(0, 24)}...</p>
                                        </div>
                                    </td>
                                    <td className="border border-[#33333] px-4 py-2 text-center">{course.category || 'N/A'}</td>
                                    <td className="border border-[#33333] px-4 py-2 text-center">{course?.approvedBy?.fullName || 'N/A'}</td>
                                    <td className="border border-[#33333] px-4 py-2 text-center">{course?.price ? `${course.price.toLocaleString('vi-VN')}đ` : 'Free'}</td>
                                    <td className="border border-[#33333] px-4 py-2 text-center">{formatDate(course?.createdAt)}</td>
                                    <td className="border border-[#33333] px-4 py-2 text-center text-yellow-500">{course.approvalStatus || 'N/A'}</td>
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
                                    <td className="border border-[#33333] px-4 py-2 text-center">
                                        <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm" onClick={() => handleApproved(course._id)}>
                                            Approve
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalCourse >= 8 && (
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
