import {ProductResponseView} from "../../modules/products/models/ProductResponseView";
import {createSlice, SerializedError} from "@reduxjs/toolkit";
import {ToastUtil} from "../../util/ToastUtil";

export const cartFeatureKey = "cartFeature";

export interface InitialState {
    loading: boolean;
    error: SerializedError;
    products: ProductResponseView[];
    total: string;
    tax: string;
    grandTotal: string;
}

const initialState: InitialState = {
    loading: false,
    error: {} as SerializedError,
    products: [
        {
            _id: '63a1138c1a25fdfdeb7cc47f',
            title: 'Mi Smart TV 32 inch',
            description: 'About the Brand Mi Brand- Finding Basic Menswear for daily use can be hard among todays Over priced Fast fashion world, where trends change daily. That’s why we started Dennis Lingo, to create a one stop shop for premium essential Smart TVs for everyday use at lowest prices and bring Basics back in trend',
            imageUrl: 'https://res.cloudinary.com/dkziw6hud/image/upload/v1671500636/rn7ppvkp2zrrdxtrew9c.jpg',
            brand: 'Mi',
            price: "45000",
            quantity: "45",
            count: 1,
            sold: 0,
            userObj: {
                _id: '638d6609b088260ee623a6ed',
                username: 'Naveen',
                email: 'naveen.uibrains@gmail.com',
                password: '$2a$10$RKrfolhtQeDJF4QHseaHROXrGYcLOdrkxEhlx6gA/17PLtydNiaAy',
                imageUrl: 'https://res.cloudinary.com/dkziw6hud/image/upload/v1670300130/qtziikg30znqnqqntj4i.jpg',
                isAdmin: true,
                isSuperAdmin: false,
                createdAt: '2022-12-05T03:31:21.991Z',
                updatedAt: '2022-12-06T04:15:33.105Z',
                __v: 0
            },
            categoryObj: {
                _id: '63a10fe61a25fdfdeb7cc3b4',
                name: 'Household',
                description: 'Household Items',
                subCategories: [
                    '63a110021a25fdfdeb7cc3b8',
                    '63a1100f1a25fdfdeb7cc3be'
                ],
                createdAt: '2022-12-20T01:29:10.772Z',
                updatedAt: '2022-12-20T01:29:51.846Z',
                __v: 2
            },
            subCategoryObj: {
                _id: '63a110021a25fdfdeb7cc3b8',
                name: 'Smart TV',
                description: 'Smart TV',
                __v: 0
            },
            createdAt: '2022-12-20T01:44:44.109Z',
            updatedAt: '2022-12-20T01:44:44.109Z',
            __v: 0
        }
    ] as ProductResponseView[],
    total: "",
    tax: "",
    grandTotal: ""
};

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const {product} = action.payload;
            // check if the product is exists
            let isExists = state.products.find(item => item._id === product._id);
            if (isExists) {
                ToastUtil.displayInfoToast("Item is already in the cart");
                return;
            }
            ToastUtil.displaySuccessToast("Item is added to cart");
            state.products = [...state.products, product]
        },
        incrementCartProductCount: (state, action) => {
            const {productId} = action.payload;
            state.products = state.products.map(item => {
                if (item._id === productId) {
                    return {
                        ...item,
                        count: item.count + 1
                    }
                }
                return item
            })
        },
        decrementCartProductCount: (state, action) => {
            const {productId} = action.payload;
            state.products = state.products.map(item => {
                if (item._id === productId) {
                    return {
                        ...item,
                        count: item.count - 1 > 0 ? item.count - 1 : 1
                    }
                }
                return item
            })
        },
        deleteProductFromCart: (state, action) => {
            const {productId} = action.payload;
            state.products = state.products.filter(item => item._id !== productId);
        }
    }
})
export const {
    addToCart,
    incrementCartProductCount,
    decrementCartProductCount,
    deleteProductFromCart
} = cartSlice.actions;