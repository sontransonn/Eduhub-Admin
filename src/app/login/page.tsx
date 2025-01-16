"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/api/admin.api";
import toast from "react-hot-toast";

export default function Login() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = await login(email, password)
            toast.success(data.message)
            localStorage.setItem("adminInfo", JSON.stringify(data.adminInfo))
            router.push("/")
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message)
                console.error('Failed:', error.message);
            } else {
                console.error('Failed with an unknown error');
            }
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-md">
                <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">
                    Admin Login
                </h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700" >
                            Email Address
                        </label>
                        <input
                            type="email" id="email" value={email}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="admin@example.com" required onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700" >
                            Password
                        </label>
                        <input
                            type="password" id="password" value={password}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="********" required onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1">
                        Đăng nhập
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Forgot your password?{" "}
                    <a href="#" className="text-blue-600 hover:underline" >
                        Reset it here
                    </a>
                </p>
            </div>
        </div>
    );
}