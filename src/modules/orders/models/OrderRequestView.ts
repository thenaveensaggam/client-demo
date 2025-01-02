import {ProductsEntity} from "../../cart/models/CartResponseView";

export interface OrderRequestView {
    products: ProductsEntity[],
    total: string;
    tax: string;
    grandTotal: string;
    userObj: string;
    paymentType: string;
    orderStatus?: string;
}