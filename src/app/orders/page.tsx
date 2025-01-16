"use client";
import React, { useEffect, useState } from "react";
import { MdHome } from "react-icons/md";
import { FaCheck, FaTimes, FaFilter, FaShoppingCart } from "react-icons/fa";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { FaBox, FaUser } from "react-icons/fa6";

import { getAllOrders, cancelOrder } from "@/api/admin.api";
import toast from "react-hot-toast";

export default function Orders() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [listOrders, setListOrders] = useState([{
        _id: "",
        user: {
            fullName: "",
            phone: "",
            email: ""
        },
        items: [],
        totalAmount: 0,
        createdAt: "",
        paymentStatus: ""
    }])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);
    const [sumOrders, setSumOrders] = useState(0)

    useEffect(() => {
        fetchData()
    }, [currentPage])

    const fetchData = async () => {
        try {
            const data = await getAllOrders(currentPage)
            setListOrders(data.allOrders)
            setTotalPages(data.totalPages);
            setSumOrders(data.totalOrder)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Failed:', error.message);
            } else {
                console.error('Failed with an unknown error');
            }
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const orders = Array.from({ length: 8 }).map((_, index) => {
        const status = index % 2 === 0 ? "canceled" : "paid";
        return {
            orderId: `#${index + 1}`,
            customer: "John Doe",
            product: "Learn React",
            price: "$50",
            orderDate: new Date().toLocaleDateString(), // Current date as order date
            status: status,
        };
    });

    const filteredOrders = orders.filter((order) => {
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        const matchesSearch = order.product.toLowerCase().includes(searchKeyword.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleCancelOrder = async (orderId: string) => {
        const isConfirmed = window.confirm("Bạn chắc chắn muốn hủy đơn hàng này?");
        if (isConfirmed) {
            try {
                const data = await cancelOrder(orderId)
                toast.success(data.message)
                fetchData()
            } catch (error: unknown) {
                if (error instanceof Error) {
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
                <h3 className="text-lg font-semibold text-white">Tình trạng đơn hàng</h3>
                <div className="flex items-center gap-3">
                    <button className="bg-gray-200 hover:bg-gray-300 py-0.5 px-2 text-[13px] rounded-lg flex items-center gap-1.5">
                        <MdHome size={16} />
                        Dashboard
                    </button>
                    /
                    <button className="bg-gray-200 hover:bg-gray-300 py-0.5 px-2 text-[13px] rounded-lg">Orders</button>
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
                <h3 className="text-white text-lg font-bold">Danh sách các đơn hàng</h3>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead className="bg-blue-500 text-white text-[13px]">
                            <tr>
                                <th className="border-r border-gray-200 p-3 py-2">STT</th>
                                <th className="border-r border-gray-200 p-3 py-2">Mã đơn hàng</th>
                                <th className="border-r border-gray-200 p-3 py-2">Khách hàng</th>
                                <th className="border-r border-gray-200 p-3 py-2">Số điện thoại</th>
                                <th className="border-r border-gray-200 p-3 py-2">Email</th>
                                <th className="border-r border-gray-200 p-3 py-2">Khóa học</th>
                                <th className="border-r border-gray-200 p-3 py-2">Giá</th>
                                <th className="border-r border-gray-200 p-3 py-2">Ngày tạo</th>
                                <th className="border-r border-gray-200 p-3 py-2">Trạng thái</th>
                                <th className="p-3 py-2">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-[#1b2b4d] text-white">
                            {listOrders?.map((order, index) => (
                                <tr className="text-sm text-center border-b border-solid border-gray-200" key={index}>
                                    <td className="border-r border-gray-200 p-2.5">#{(currentPage - 1) * 8 + index + 1}</td>
                                    <td className="border-r border-gray-200 p-2.5">{order?._id.slice(0, 8)}...</td>
                                    <td className="border-r border-gray-200 p-2.5">{order?.user?.fullName}</td>
                                    <td className="border-r border-gray-200 p-2.5">{order?.user?.phone || "Không có"}</td>
                                    <td className="border-r border-gray-200 p-2.5">{order?.user?.email || "Không có"}</td>
                                    <td className="border-r border-gray-200 p-2.5">{order?.items?.length} khóa học</td>
                                    <td className="border-r border-gray-200 p-2.5">{order.totalAmount?.toLocaleString('vi-VN')}đ</td>
                                    <td className="border-r border-gray-200 p-2.5">{formatDate(order?.createdAt)}</td>
                                    <td className="border-r border-gray-200 p-2.5">
                                        {order?.paymentStatus === "Fail" && <span className="text-red-500">Đã hủy</span>}
                                        {order?.paymentStatus === "Paid" && <span className="text-green-500">Đã thanh toán</span>}
                                        {order?.paymentStatus === "Pending" && <span className="text-yellow-500">Chờ thanh toán</span>}
                                    </td>
                                    <td className="border-r border-gray-200 p-2.5">
                                        {order?.paymentStatus === "Pending" && (
                                            <div className="flex items-center justify-center">
                                                <button className="px-2 py-0.5 text-xs bg-red-500 hover:bg-red-600 text-white rounded" onClick={() => handleCancelOrder(order._id)}>
                                                    Hủy đơn hàng
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {sumOrders >= 8 && (
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
