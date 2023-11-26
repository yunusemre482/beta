import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { authSlice } from './authSlice';
import { productSlice } from './productSlice';
import { mountStoreDevtool } from 'simple-zustand-devtools';

const useBoundStore = create()(
    persist(
        (...a) => ({
            ...authSlice(...a),
            ...productSlice(...a)
        }),
        {
            name: 'store',
            getStorage: () => localStorage,
        }
    )
);

export const resetAllStores = () => {
    useBoundStore.getState().resetAuth();
    useBoundStore.getState().resetProducts();
};

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('store', useBoundStore);
}
export default useBoundStore;