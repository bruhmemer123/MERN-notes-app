import { create } from "zustand"
import api from "../lib/axios.js"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
    user: null,
    isCheckingAuth: true,
    isLoggingIn: false,
    isSigningUp: false,
    checkAuth: async () => {
        try {
            const res = await api.get("/auth/me");
            set({ user: res.data.user });
        }
        catch (error) {
            console.error("Auth check failed:", error);
            set({ user: null });
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await api.post("/auth/register", data);
            set({ user: res.data.user });
            toast.success("Account created successfully");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
            return false;
        }
        finally {
            set({ isSigningUp: false });
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await api.post("/auth/login", data);
            set({ user: res.data.user });
            toast.success("Logged in successfully");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            return false;
        }
        finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            await api.post("/auth/logout")
            set({ user: null });
            toast.success("Logged out successfully");
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }
}))