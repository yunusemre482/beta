import api from '../config/api';
import { STATUS } from './authSlice';
import { getRemovedQuantity } from '../utils/productHelper';



const INITIAL_STATE = {
    products: [],
    cart: [],
    loading: false,
    error: null,
    status: STATUS.IDLE,
};


export const productSlice = (set, get) => ({
    ...INITIAL_STATE,
    getProducts: async () => {
        try {
            const response = await api.get('/products');

            if (response.status === 200) {
                const products = response.data || [];
                set((state) => ({ ...state, loading: false, products }));
            }

            if (response.status === 401) {
                set((state) => ({ ...state, loading: false, error: 'Unauthorized' }));
            }

        } catch (error) {
            set((state) => ({ ...state, loading: false, error: error.message }));
        }
    },
    searchProducts: async ({ name }) => {
        console.log("name", name)
        try {
            const response = await api.get(`/search`, {
                params: {
                    name
                },
            });
        
            if (response.status === 200) {
                const products = response.data || [];
                set((state) => ({ ...state, loading: false, products }));
            }

            if (response.status === 401) {
                set((state) => ({ ...state, loading: false, error: 'Unauthorized' }));
            }

        } catch (error) {
            set((state) => ({ ...state, loading: false, error: error.message }));
        }
    },
    addToCart: async (productId) => {
        try {
            const response = await api.post(`/add-to-cart`, {}, {
                params: {
                    productId
                }
            });

            if (response.status === 200) {
                const existingProduct = get().cart.find((item) => item.id === productId);

                if (existingProduct) {
                    // If the product already exists in the cart, update its quantity
                    set((state) => ({
                        cart: state.cart.map((item) =>
                            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    }));
                } else {
                    const product = get().products.find((item) => item.id === productId);

                    // If the product is not in the cart, add it with quantity 1
                    set((state) => ({
                        cart: [...state.cart, { id: productId, quantity: 1, name: product.name, price: product.price }],
                    }));
                }
            }

            if (response.status === 401) {
                set((state) => ({ ...state, loading: false, error: 'Unauthorized' }));
            }

        } catch (error) {
            set((state) => ({ ...state, loading: false, error: error.message }));
        }
    },
    viewCart: async () => {
        try {
            const response = await api.get(`/view-cart`);

            if (response.status === 200) {
                const cart = response.data
                if (Array.isArray(cart)) {
                    set(state => ({
                        ...state, cart
                    }))
                }
            }

            if (response.status === 401) {
                set((state) => ({ ...state, loading: false, error: 'Unauthorized' }));
            }

        } catch (error) {
            set((state) => ({ ...state, loading: false, error: error.message }));
        }
    },
    removeFromCart: async (productId) => {
        try {
            const response = await api.post(`/subtract-from-cart`, {}, {
                params: {
                    id: productId
                }
            });

            if (response.status === 200) {

                const existingProduct = get().cart.find((item) => item.id === productId);

                if (existingProduct) {
                    const removedQuantity = getRemovedQuantity(existingProduct);
                    const updatedCart = removedQuantity === 0 ?
                        get().cart.filter((item) => item.id !== productId) :
                        get().cart.map((item) => (item.id === productId ? { ...item, quantity: removedQuantity } : item));

                    set((state) => ({ ...state, cart: updatedCart }));
                }
            }

            if (response.status === 401) {
                set((state) => ({ ...state, loading: false, error: 'Unauthorized' }));
            }

        } catch (error) {
            set((state) => ({ ...state, loading: false, error: error.message }));
        }
    },

    getProductQuantity: (productId) => {

        // get the car from the state 

        const cart = get().cart;
        const product = cart.find((product) => product.id === productId);

        return product ? product.quantity : 0;
    },
    resetProducts: () => {
        set(INITIAL_STATE);
    }
});

