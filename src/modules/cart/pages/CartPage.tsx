import React, {useEffect, useState} from 'react';
import MainNavBar from "../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../layout/components/layout-heading/LayoutHeading";
import {Button, Card, Col, Container, ListGroup, ListGroupItem, Row, Table} from "react-bootstrap";
import * as cartReducer from "../../../redux/cart/cart.reducer";
import * as userReducer from "../../../redux/users/user.reducer";
import * as cartActions from "../../../redux/cart/cart.actions";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../redux/store";
import NoProductFound from "../../ui/components/NoProductsFound";
import {CartRequestView} from "../models/CartRequestView";
import {useNavigate} from "react-router-dom";
import SpinnerUI from "../../ui/components/SpinnerUI";
import {CartResponseView, ProductsEntity} from "../models/CartResponseView";
import {CartReduxService} from "../../../redux/cart/CartReduxService";

/**
 * The Cart Page Main Component
 * @constructor
 */
const CartPage = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const PRODUCT_TAX: number = 5.0;

    /**
     * cart state data
     */
    const [cart, setCart] = useState<CartResponseView>({} as CartResponseView);

    /**
     * get cart count from redux
     */
    const cartState: cartReducer.InitialState = useSelector((state: RootState) => {
        return state[cartReducer.cartFeatureKey];
    })

    /**
     * get user state from redux
     */
    const userState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userReducer.userFeatureKey];
    })

    const {loading, cart: cartRedux} = cartState;
    const {user} = userState

    /**
     * click on decr Count
     * @param productId
     */
    const clickDecrCount = (productId: string) => {
        dispatch({
            type: `${cartReducer.decrementCartProductCount}`,
            payload: {productId: productId}
        })
    };

    /**
     * click on incr count
     * @param productId
     */
    const clickIncrCount = (productId: string) => {
        dispatch({
            type: `${cartReducer.incrementCartProductCount}`,
            payload: {productId: productId}
        })
    };

    /**
     * click on delete product from cart
     * @param productId
     */
    const clickDeleteProduct = (productId: string) => {
        dispatch({
            type: `${cartReducer.deleteProductFromCart}`,
            payload: {productId: productId}
        })
    };

    /**
     * click on checkout button, to save data to server
     */
    const clickCheckOut = () => {
        const cartProds: ProductsEntity[] = cart.products;
        if (user && user._id) {
            const theCart: CartRequestView = {
                products: cartProds,
                tax: CartReduxService.calculateTax(cartProds).toString(),
                total: CartReduxService.calculateTotal(cartProds).toString(),
                grandTotal: CartReduxService.calculateGrandTotal(cartProds).toString(),
                userObj: user._id
            }
            dispatch(cartActions.createCartAction(theCart)).then((response: any) => {
                if (!response.error) {
                    navigate("/cart/checkout");
                }
            });
        }
    };

    /**
     * when the cart data changed from server
     */
    useEffect(() => {
        if (cartRedux && Object.keys(cartRedux).length > 0) {
            setCart(cartRedux);
        }
    }, [cartRedux])

    return (
        <>
            {loading && <SpinnerUI/>}
            <MainNavBar/>
            <LayoutHeading heading={'Cart Page'} color={'text-success'}/>
            {
                cart && cart.products && cart.products.length > 0 &&
                <Container className="mt-3">
                    <Row>
                        <Col xs={9}>
                            <Card className="shadow-lg">
                                <Card.Header className="bg-success">
                                    <p className="h3 text-white">Cart Items</p>
                                </Card.Header>
                                <Card.Body className="bg-light-success">
                                    <Table striped hover className="text-center">
                                        <thead className="bg-warning">
                                        <tr>
                                            <th>SNO</th>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            cart.products.map((product, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <img src={product.imageUrl} alt="" width={50} height={50}/>
                                                        </td>
                                                        <td>{product.title}</td>
                                                        <td>{product.price}</td>
                                                        <td>
                                                            <i className="bi bi-dash-circle-fill text-success me-1"
                                                               onClick={() => clickDecrCount(product._id)}></i>
                                                            {product.count}
                                                            <i className="bi bi-plus-circle-fill text-success ms-1"
                                                               onClick={() => clickIncrCount(product._id)}></i>
                                                        </td>
                                                        <td>{Number(product.price) * (product.count ? product.count : 1)}</td>
                                                        <td>
                                                            <Button variant={'danger'}
                                                                    onClick={() => clickDeleteProduct(product._id)}>
                                                                <i className="bi bi-trash-fill"></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3}>
                            <Card className="shadow-lg">
                                <Card.Header className="bg-success">
                                    <p className="h3 text-white">Your Total</p>
                                </Card.Header>
                                <Card.Body className="bg-light-success">
                                    <ListGroup>
                                        <ListGroupItem>Total : <span
                                            className="fw-bold">&#8377;{CartReduxService.calculateTotal(cart.products).toFixed(2)}</span></ListGroupItem>
                                        <ListGroupItem>Tax : <span
                                            className="fw-bold">&#8377; {CartReduxService.calculateTax(cart.products).toFixed(2)}</span></ListGroupItem>
                                        <ListGroupItem>Grand Total : <span
                                            className="fw-bold">&#8377; {CartReduxService.calculateGrandTotal(cart.products).toFixed(2)}</span></ListGroupItem>
                                    </ListGroup>
                                    <div className="d-grid mt-2">
                                        <Button variant="warning" size="sm" onClick={clickCheckOut}>
                                            CheckOut
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>

                        </Col>
                    </Row>
                </Container>
            }
            {
                cart?.products?.length === 0 &&
                <NoProductFound/>
            }
        </>
    );
};
export default CartPage