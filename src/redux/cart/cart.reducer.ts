import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {ToastUtil} from "../../util/ToastUtil";
import * as cartActions from './cart.actions';
import {CartResponseView, ProductsEntity} from "../../modules/cart/models/CartResponseView";
import {CartReduxService} from "./CartReduxService";

export const cartFeatureKey = "cartFeature";

export interface InitialState {
    loading: boolean;
    error: SerializedError;
    cart: CartResponseView;
    products: ProductsEntity[];
}

const initialState: InitialState = {
    cart: {} as CartResponseView,
    loading: false,
    error: {} as SerializedError,
    products: [] as ProductsEntity[]
};

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initialState,
    reducers: {
        clearCart: (state, action) => {
            state.cart = CartReduxService.clearCart(state.cart);
        },
        addToCart: (state, action) => {
            const {product, dispatch} = action.payload;
            state.cart = CartReduxService.addToCart(state.cart, product, dispatch)
        },
        incrementCartProductCount: (state, action) => {
            const {productId} = action.payload;
            state.cart = CartReduxService.incrementProductCount(state.cart, productId);
        },
        decrementCartProductCount: (state, action) => {
            const {productId} = action.payload;
            state.cart = CartReduxService.decrementProductCount(state.cart, productId);
        },
        deleteProductFromCart: (state, action) => {
            const {productId} = action.payload;
            state.cart = CartReduxService.deleteProductFromCart(state.cart, productId);
        }
    },
    extraReducers: (builder) => {
        // createCartAction
        builder.addCase(cartActions.createCartAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(cartActions.createCartAction.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
        }).addCase(cartActions.createCartAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Unable to create cart at server`);
            }
        })

        // getCartInfoAction
        builder.addCase(cartActions.getCartInfoAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(cartActions.getCartInfoAction.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.cart = action.payload;
            } else {
                state.cart = {...state.cart, products: []};
            }
        }).addCase(cartActions.getCartInfoAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Unable to Get cart from server`);
            }
        })
    }
})
export const {
    addToCart,
    clearCart,
    incrementCartProductCount,
    decrementCartProductCount,
    deleteProductFromCart
} = cartSlice.actions;