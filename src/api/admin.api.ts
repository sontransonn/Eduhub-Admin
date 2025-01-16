import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/v1/admin',
    withCredentials: true,
});

export const getAllApplication = async () => {
    try {
        const response = await api.get(`/application`)
        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Failed';
            throw new Error(errorMessage);
        }
        throw new Error('An unknown error occurred');
    }
}

export const getAllUser = async (pageNumber: number) => {
    try {
        const response = await api.get(`/user/all-account?page=${pageNumber}`)
        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Failed';
            throw new Error(errorMessage);
        }
        throw new Error('An unknown error occurred');
    }
}

export const approvedCourse = async (courseId: string) => {
    try {
        const response = await api.post(`/approve/course/${courseId}`)
        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Failed';
            throw new Error(errorMessage);
        }
        throw new Error('An unknown error occurred');
    }
}

export const getPendingCourse = async (pageNumber: number) => {
    try {
        const response = await api.get(`/unapproved-course?page=${pageNumber}`)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Failed';
            throw new Error(errorMessage);
        }
        throw new Error('An unknown error occurred');
    }
}

export const getAllCourse = async (pageNumber: number) => {
    try {
        const response = await api.get(`/course/all?page=${pageNumber}`)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Failed';
            throw new Error(errorMessage);
        }
        throw new Error('An unknown error occurred');
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post("/login", {
            email: email,
            password: password
        })
        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Failed';
            throw new Error(errorMessage);
        }
        throw new Error('An unknown error occurred');
    }
}

export const cancelOrder = async (orderId: string) => {
    try {
        const response = await api.post(`/order/cancel/${orderId}`)
        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Failed';
            throw new Error(errorMessage);
        }
        throw new Error('An unknown error occurred');
    }
}

export const getAllOrders = async (pageNum: number) => {
    try {
        const response = await api.get(`/user/all-order?page=${pageNum}`)
        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Failed';
            throw new Error(errorMessage);
        }
        throw new Error('An unknown error occurred');
    }
}