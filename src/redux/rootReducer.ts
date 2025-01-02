import {combineReducers} from "@reduxjs/toolkit";
import * as userReducer from './users/user.reducer';
import * as categoryReducer from "./categories/category.reducer";
import * as productReducer from './products/product.reducers';
import * as cartReducer from './cart/cart.reducer';

const rootReducer: any = combineReducers({
    [userReducer.userFeatureKey]: userReducer.userSlice.reducer,
    [categoryReducer.categoryFeatureKey]: categoryReducer.categorySlice.reducer,
    [productReducer.productFeatureKey]: productReducer.productSlice.reducer,
    [cartReducer.cartFeatureKey]: cartReducer.cartSlice.reducer
});
export default rootReducer;