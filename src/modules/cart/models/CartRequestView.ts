import {ProductsEntity, UserObj} from "./CartResponseView";

export interface CartRequestView {
    products: ProductsEntity[],
    total: string;
    tax: string;
    grandTotal: string;
    userObj: string;
}
