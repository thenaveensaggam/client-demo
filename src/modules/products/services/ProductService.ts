import axios from 'axios';
import {ProductRequestView} from "../models/ProductRequestView";
import {ProductResponseView} from "../models/ProductResponseView";

export class ProductService {

    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    /**
     * Create a product
     * @param product
     */
    public static createProduct(product: ProductRequestView): Promise<{ data: { msg: string; product: ProductResponseView } }> {
        let dataUrl = `${this.serverUrl}/api/products/`;
        return axios.post(dataUrl, product);
    }

    /**
     * update an existing product
     * @param product
     * @param productId
     */
    public static updateProduct(product: ProductRequestView, productId: string): Promise<{ data: { msg: string; product: ProductResponseView } }> {
        let dataUrl = `${this.serverUrl}/api/products/${productId}`;
        return axios.put(dataUrl, product);
    }

    /**
     * to get all the products
     */
    public static getAllProducts(): Promise<{ data: ProductResponseView[] }> {
        let dataUrl = `${this.serverUrl}/api/products/`;
        return axios.get(dataUrl);
    }

    /**
     * to get a product
     * @param productId
     */
    public static getProduct(productId: string): Promise<{ data: ProductResponseView }> {
        let dataUrl = `${this.serverUrl}/api/products/${productId}`;
        return axios.get(dataUrl);
    }

    /**
     * Delete a product with product Id
     * @param productId
     */
    public static deleteProduct(productId: string): Promise<{ data: { msg: string } }> {
        let dataUrl = `${this.serverUrl}/api/products/${productId}`;
        return axios.delete(dataUrl);
    }

    /**
     * get all products with categoryId
     * @param categoryId
     */
    public static getAllProductsWithCategoryId(categoryId: string): Promise<{ data: ProductResponseView[] }> {
        let dataUrl = `${this.serverUrl}/api/products/categories/${categoryId}`;
        return axios.get(dataUrl);
    }
}