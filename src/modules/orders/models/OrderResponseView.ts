import {ProductsEntity} from "../../cart/models/CartResponseView";

export interface OrderResponseView {
    _id: string;
    products: ProductsEntity[];
    total: number;
    tax: number;
    grandTotal: number;
    paymentType: string;
    orderStatus: string;
    orderBy: OrderBy;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface OrderBy {
    _id: string;
    username: string;
    email: string;
    password: string;
    imageUrl: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
