import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import { toast } from 'react-hot-toast'
import { io } from "socket.io-client";
const BASE_URL = import.meta.env.MODE === 'development' ?  'http://localhost:3000' : import.meta.env.REACT_APP_API_URL;


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSignup: false,
    isLogin: false,
    isUpdateProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
           const res = await axiosInstance.get('/auth/check')
           set({ authUser: res.data,})
        } catch (error) {
            console.log("Error in CheckAuth", error)
            set({ authUser: null})
        } finally{
            set({ isCheckingAuth: false})
        }
    },

    SignUp: async (data) => {
        set({ isSignup: true })
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({ authUser: res.data })
            toast.success('Account created successfully')
        } catch (error) {
            console.log("Error in SignUp frontend", error)
            toast.error(error.response?.data?.message || error.message || "Something went wrong")
        } finally {
            set({ isSignup: false })
        }
    },

    Login: async (data) => {
        set({ isLogin: true })
        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({ authUser: res.data })
            toast.success('Login successfully')
        } catch (error) {
            console.log("Error in Login", error)
            toast.error(error.response?.data?.message || error.message || "Something went wrong")
        } finally{
            set({ isLogin: false })
        }
    },

    Logout: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({
                authUser: null
            })
            toast.success('Logged out successfully')
             get().disconnectSocket();
        } catch (error) {
            console.log("Error in LogOut", error)
            toast.error(error.response?.data?.message || error.message || "Something went wrong")
        }
    },

     updateProfile: async (data) => {
    set({ isUpdateProfile: true })
    try {
      const res = await axiosInstance.put("/auth/update-profile", data)
      set({ authUser: res.data })
      toast.success("Profile updated successfully")
    } catch (error) {
      console.log("error in update profile:", error)
      toast.error(error.response?.data?.message || error.message || "Something went wrong")
    } finally {
      set({ isUpdateProfile: false })
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
      withCredentials: true, // ensure cookies are sent if needed
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    // Optionally, emit an event to notify server of online status
    socket.emit("userOnline", authUser._id);
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
