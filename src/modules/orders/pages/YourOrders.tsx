import React, {useEffect} from 'react';
import MainNavBar from "../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../layout/components/layout-heading/LayoutHeading";
import {Badge, Button, Col, Container, ListGroup, ListGroupItem, Row, Table} from "react-bootstrap";
import * as orderReducer from "../../../redux/order/order.reducer";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../redux/store";
import SpinnerUI from "../../ui/components/SpinnerUI";
import * as orderActions from "../../../redux/order/order.actions";
import NoProductFound from "../../ui/components/NoProductsFound";
import {Link} from "react-router-dom";

/**
 * The MyOrders Page Component
 * @constructor
 */
const YourOrders = () => {
    const dispatch: AppDispatch = useAppDispatch();

    /**
     * get order state from server
     */
    const orderState: orderReducer.InitialState = useSelector((state: RootState) => {
        return state[orderReducer.orderFeatureKey];
    });

    const {loading, orders} = orderState;

    /**
     * get all my orders when the page is loaded
     */
    useEffect(() => {
        dispatch(orderActions.getMyOrdersAction());
    }, [])

    return (
        <>
            {loading && <SpinnerUI/>}
            <MainNavBar/>
            <LayoutHeading heading={'Your Orders'} color={'text-success'}/>
            {
                orders && orders.length > 0 ? <>
                    <Container>
                        <Row>
                            <Col>
                                <Table striped hover className="text-center shadow-lg">
                                    <thead className="bg-success text-white">
                                    <tr>
                                        <th>Order Number</th>
                                        <th>Order Details</th>
                                        <th>Order Placed On</th>
                                        <th>Order By</th>
                                        <th>Total Amount</th>
                                        <th>Payment Type</th>
                                        <th>Order Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        orders.map(order => {
                                            return (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>
                                                        <ListGroup>
                                                            {
                                                                order.products.map(item => {
                                                                    return (
                                                                        <ListGroupItem key={item._id}>
                                                                            <Row>
                                                                                <Col xs={2}>
                                                                                    <img src={item?.imageUrl}
                                                                                         alt="" width={25} height={25}/>
                                                                                </Col>
                                                                                <Col xs={8}>
                                                                                    <Link
                                                                                        className="text-decoration-none text-success"
                                                                                        to={`/products/view/Fashion/${item._id}`}>{item.title}</Link>
                                                                                </Col>
                                                                            </Row>
                                                                        </ListGroupItem>
                                                                    )
                                                                })
                                                            }
                                                        </ListGroup>
                                                    </td>
                                                    <td>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</td>
                                                    <td>{order.orderBy?.username}</td>
                                                    <td>&#8377; {Number(order.grandTotal).toFixed(2)}</td>
                                                    <td>{order.paymentType}</td>
                                                    <td className="fw-bold">
                                                        {
                                                            order.orderStatus === "Order Placed" &&
                                                            <Badge bg={'info'}>{order.orderStatus}</Badge>
                                                        }
                                                        {
                                                            order.orderStatus === "Processing" &&
                                                            <Badge bg={'primary'}>{order.orderStatus}</Badge>
                                                        }
                                                        {
                                                            order.orderStatus === "Dispatched" &&
                                                            <Badge bg={'success'}>{order.orderStatus}</Badge>
                                                        }
                                                        {
                                                            order.orderStatus === "Delivered" &&
                                                            <Badge bg={'warning'}>{order.orderStatus}</Badge>
                                                        }
                                                        {
                                                            order.orderStatus === "Cancelled" &&
                                                            <Badge bg={'danger'}>{order.orderStatus}</Badge>
                                                        }
                                                        {
                                                            order.orderStatus === "Completed" &&
                                                            <Badge bg={'success'}>{order.orderStatus}</Badge>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </> : <>
                    <NoProductFound/>
                </>
            }
        </>
    );
};
export default YourOrders;