import {CartResponseView, ProductsEntity, UserObj} from "../../modules/cart/models/CartResponseView";
import {ToastUtil} from "../../util/ToastUtil";
import {ProductResponseView} from "../../modules/products/models/ProductResponseView";
import {createCartAction} from "./cart.actions";

export class CartReduxService {

    private static PRODUCT_TAX: number = 5.0;

    public static convertCartProduct(product: ProductResponseView): ProductsEntity {
        return {
            categoryObj: product.categoryObj,
            subCategoryObj: product.subCategoryObj,
            _id: product._id,
            title: product.title,
            description: product.description,
            count: product.count,
            price: product.price,
            brand: product.brand,
            imageUrl: product.imageUrl,
            sold: product.sold,
            quantity: product.quantity
        } as ProductsEntity;
    }

    public static clearCart(cart: CartResponseView): CartResponseView {
        return {
            ...cart,
            products: [] as ProductsEntity[],
            total: "",
            tax: "",
            grandTotal: "",
            userObj: {} as UserObj,
        }
    }

    public static addToCart(cart: CartResponseView, product: ProductsEntity, dispatch: any): CartResponseView {
        console.log("::", dispatch);
        // check if the product is exists
        let isExists = cart.products.find(item => item._id === product._id);
        if (isExists) {
            ToastUtil.displayInfoToast("Item is already in the cart");
            return cart;
        }
        ToastUtil.displaySuccessToast("Item is added to cart");
        cart.products = [...cart.products, product];
        return cart;
    }

    public static incrementProductCount(cart: CartResponseView, productId: string): CartResponseView {
        cart.products = cart.products.map(item => {
            if (item._id === productId) {
                return {
                    ...item,
                    count: item.count + 1
                }
            }
            return item
        })
        return cart;
    }

    public static decrementProductCount(cart: CartResponseView, productId: string): CartResponseView {
        cart.products = cart.products.map(item => {
            if (item._id === productId) {
                return {
                    ...item,
                    count: item.count - 1 > 0 ? item.count - 1 : 1
                }
            }
            return item
        })
        return cart;
    }

    public static deleteProductFromCart(cart: CartResponseView, productId: string): CartResponseView {
        cart.products = cart.products.filter(item => item._id !== productId);
        return cart;
    }

    public static calculateTotal(products: ProductsEntity[]): number {
        let total: number = 0;
        for (let product of products) {
            total += (Number(product.price) * Number(product.count));
        }
        return total;
    };

    public static calculateTax(products: ProductsEntity[]): number {
        return CartReduxService.calculateTotal(products) * CartReduxService.PRODUCT_TAX / 100;
    };

    public static calculateGrandTotal(products: ProductsEntity[]): number {
        return CartReduxService.calculateTotal(products) + CartReduxService.calculateTax(products);
    };

}