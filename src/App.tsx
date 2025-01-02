import React, {useEffect} from 'react';
import './App.css';
import ToastConfiguration from "./modules/ui/components/ToastConfiguration";
import HomePage from "./modules/layout/pages/home/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLogin from "./modules/users/pages/UserLogin";
import UserRegister from "./modules/users/pages/UserRegister";
import UserProfile from "./modules/users/pages/UserProfile";
import {AppDispatch, useAppDispatch} from "./redux/store";
import * as userActions from "./redux/users/user.actions";
import ChangePassword from "./modules/users/pages/ChangePassword";
import AddCategory from "./modules/categories/pages/add-category/AddCategory";
import {AuthUtil} from "./util/AuthUtil";
import UploadProduct from "./modules/products/pages/upload-product/UploadProduct";
import ManageProducts from "./modules/products/pages/manage-products/ManageProducts";
import EditProduct from "./modules/products/pages/edit-product/EditProduct";
import FashionCatalogue from "./modules/products/pages/catalogues/fashion-catalogue/FashionCatalogue";
import ElectronicsCatalogue from "./modules/products/pages/catalogues/electronics-catalogue/ElectronicsCatalogue";
import HouseholdCatalogue from "./modules/products/pages/catalogues/household-catalogue/HouseholdCatalogue";
import ViewProduct from "./modules/products/pages/view-product/ViewProduct";
import CartPage from "./modules/cart/pages/CartPage";
import CheckOutPage from "./modules/cart/pages/CheckOutPage";

const App: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        if (AuthUtil.setTokenToRequestHeader()) {
            dispatch(userActions.getUserInformationAction());
        }
    }, [])

    return (
        <>
            <ToastConfiguration/>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/products/fashion'} element={<FashionCatalogue/>}/>
                    <Route path={'/products/electronics'} element={<ElectronicsCatalogue/>}/>
                    <Route path={'/products/household'} element={<HouseholdCatalogue/>}/>
                    <Route path={'/products/upload'} element={<UploadProduct/>}/>
                    <Route path={'/products/edit/:productId'} element={<EditProduct/>}/>
                    <Route path={'/products/view/:categoryName/:productId'} element={<ViewProduct/>}/>
                    <Route path={'/products/manage'} element={<ManageProducts/>}/>
                    <Route path={'/users/login'} element={<UserLogin/>}/>
                    <Route path={'/users/register'} element={<UserRegister/>}/>
                    <Route path={'/users/profile'} element={<UserProfile/>}/>
                    <Route path={'/users/change-password'} element={<ChangePassword/>}/>
                    <Route path={'/categories/add'} element={<AddCategory/>}/>
                    <Route path={'/cart/list'} element={<CartPage/>}/>
                    <Route path={'/cart/checkout'} element={<CheckOutPage/>}/>
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;
