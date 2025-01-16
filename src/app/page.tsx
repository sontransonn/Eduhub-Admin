"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {
  // Dữ liệu biểu đồ
  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Revenue (USD)",
        data: [1200, 1500, 1800, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000],
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Tuỳ chỉnh biểu đồ
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Revenue",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue (USD)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col w-[80%] gap-5 p-5 bg-[#071739] h-[calc(100vh-70px)] overflow-y-auto text-white">
      {/* Thông tin tổng quan */}
      <div className="grid grid-cols-12 gap-5">
        {/* Card tổng quan */}
        <div className="col-span-8 grid grid-cols-4 gap-5">
          {/* Số khóa học */}
          <div className="col-span-2">
            <div className="w-full bg-gradient-to-r from-green-400 to-green-600 p-5 h-[170px] rounded-lg shadow-lg flex flex-col justify-between">
              <h4 className="text-lg font-bold">Total Courses</h4>
              <p className="text-3xl font-bold">120</p>
              <span className="text-sm text-green-200">+5 this month</span>
            </div>
          </div>
          {/* Số học viên */}
          <div className="col-span-2">
            <div className="w-full bg-gradient-to-r from-purple-400 to-purple-600 p-5 h-[170px] rounded-lg shadow-lg flex flex-col justify-between">
              <h4 className="text-lg font-bold">Total Students</h4>
              <p className="text-3xl font-bold">15,430</p>
              <span className="text-sm text-purple-200">+320 this month</span>
            </div>
          </div>
          {/* Doanh thu */}
          <div className="col-span-2">
            <div className="w-full bg-gradient-to-r from-blue-400 to-blue-600 p-5 h-[170px] rounded-lg shadow-lg flex flex-col justify-between">
              <h4 className="text-lg font-bold">Revenue</h4>
              <p className="text-3xl font-bold">$25,300</p>
              <span className="text-sm text-blue-200">+8% compared to last month</span>
            </div>
          </div>
          {/* Đánh giá trung bình */}
          <div className="col-span-2">
            <div className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 p-5 h-[170px] rounded-lg shadow-lg flex flex-col justify-between">
              <h4 className="text-lg font-bold">Average Rating</h4>
              <p className="text-3xl font-bold">4.8/5</p>
              <span className="text-sm text-yellow-200">Based on 1,200 reviews</span>
            </div>
          </div>
        </div>
        {/* Card phụ */}
        <div className="col-span-4 bg-blue-800 w-full h-full rounded-lg shadow-lg p-5">
          <h4 className="text-lg font-bold mb-3">Active Users</h4>
          <p className="text-2xl font-bold">1,032</p>
          <span className="text-sm text-blue-200">+10% since last week</span>
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="w-full bg-white rounded-lg p-5 flex flex-col gap-5 text-gray-800">
        <h3 className="text-[#403e57] text-lg font-bold">Monthly Revenue Statistics</h3>
        <div>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="w-full bg-white rounded-lg p-5 flex flex-col gap-5 pr-5 text-gray-800">
        <h3 className="text-[#403e57] text-lg font-bold">Best Selling Courses</h3>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Course ID</th>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Instructor</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Enrolled</th>
                <th className="border border-gray-300 px-4 py-2">Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center">001</td>
                <td className="border border-gray-300 px-4 py-2">React for Beginners</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Web Development</td>
                <td className="border border-gray-300 px-4 py-2 text-center">John Doe</td>
                <td className="border border-gray-300 px-4 py-2 text-center">$49.99</td>
                <td className="border border-gray-300 px-4 py-2 text-center">1,200</td>
                <td className="border border-gray-300 px-4 py-2 text-center">4.9</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center">002</td>
                <td className="border border-gray-300 px-4 py-2">Master Python</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Programming</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Jane Smith</td>
                <td className="border border-gray-300 px-4 py-2 text-center">$39.99</td>
                <td className="border border-gray-300 px-4 py-2 text-center">900</td>
                <td className="border border-gray-300 px-4 py-2 text-center">4.8</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
