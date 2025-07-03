import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore{
    isAdmin: boolean;
    isLoading: boolean;
    error: string | null;

    checkAdminStatus: () => Promise<void>;
    reset: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>( (set) => (
    {
        isLoading: false,
        isAdmin: false,
        error: null,

        checkAdminStatus: async () => {
            set({isLoading: true, error: null })
            try {
                const response = await axiosInstance.get("/admin/check", { withCredentials: true });
                set ({isAdmin: response.data});

            } catch (error: any) {
                set({isAdmin: false, error: error.response.data.message});
            } finally{
                set({ isLoading: false});
            }
        },
        reset: async() => {
            set({isAdmin: false, error: null, isLoading: false});
        },
    }
));