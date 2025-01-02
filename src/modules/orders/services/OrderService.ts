import axios from 'axios';
import {OrderRequestView} from "../models/OrderRequestView";
import {OrderResponseView} from "../models/OrderResponseView";

export class OrderService {

    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    /**
     * To place an order
     * @param order
     */
    public static placeOrder(order: OrderRequestView): Promise<{ data: { msg: string, order: OrderResponseView } }> {
        let dataUrl = `${this.serverUrl}/api/orders/place`;
        return axios.post(dataUrl, order);
    }

    /**
     * to get all the orders
     */
    public static getAllOrders(): Promise<{ data: OrderResponseView[] }> {
        let dataUrl = `${this.serverUrl}/api/orders/all`;
        return axios.get(dataUrl);
    }

    /**
     * to get my orders
     */
    public static getMyOrders(): Promise<{ data: OrderResponseView[] }> {
        let dataUrl = `${this.serverUrl}/api/orders/me`;
        return axios.get(dataUrl);
    }

    /**
     * to update the order status
     * @param orderStatus
     * @param orderId
     */
    public static updateOrderStatus(orderStatus: string, orderId: string): Promise<{ data: { msg: string, order: OrderResponseView } }> {
        let dataUrl = `${this.serverUrl}/api/orders/${orderId}`;
        return axios.post(dataUrl, {orderStatus: orderStatus});
    }
}