import { StateCreator } from 'zustand';
import api from '../config/api';
import { resetAllStores } from '.';

export const STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    SUCCESS: 'success',
    ERROR: 'error',
};

const INITIAL_STATE = {
    isAuthenticated: false,
    loading: false,
    error: null,
    status: STATUS.IDLE,
};


export const authSlice = (set) => ({
    ...INITIAL_STATE,
    createSession: async () => {
        try {
            const response = await api.get('/createsession');

            if (response.status === 200) {
                localStorage.setItem('sessionToken', response.data);
                set((state) => ({ ...state, loading: false, isAuthenticated: true }));
            }

            if (response.status === 401) {
                set((state) => ({ ...state, loading: false, error: 'Unauthorized' }));
            }

        } catch (error) {
            set((state) => ({ ...state, loading: false, error: error.message }));
        }
    },
    logout: () => {
        localStorage.removeItem('sessionToken');
        resetAllStores();
    },

    resetAuth: () => {
        set(INITIAL_STATE);
    }
});