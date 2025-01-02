import axios from 'axios';
import {CartRequestView} from "../models/CartRequestView";
import {CartResponseView} from "../models/CartResponseView";

export class CartService {

    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    /**
     * CREATE CART when click on checkOut Button
     * @param cart
     */
    public static createCart(cart: CartRequestView): Promise<{ data: { msg: string, cart: CartResponseView } }> {
        let dataUrl = `${this.serverUrl}/api/carts/`;
        return axios.post(dataUrl, cart);
    }

    /**
     * To get cart information from server
     */
    public static getCartInfo(): Promise<{ data: CartResponseView }> {
        let dataUrl = `${this.serverUrl}/api/carts/me`;
        return axios.get(dataUrl);
    }
}