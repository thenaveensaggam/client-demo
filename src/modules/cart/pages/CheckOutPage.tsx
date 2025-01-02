import React from 'react';
import MainNavBar from "../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../layout/components/layout-heading/LayoutHeading";
import {Button, Card, Col, Container, ListGroup, ListGroupItem, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as cartReducer from "../../../redux/cart/cart.reducer";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../redux/store";
import NoProductFound from "../../ui/components/NoProductsFound";

const CheckOutPage = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const PRODUCT_TAX: number = 5.0;

    // get cart count from redux
    const cartState: cartReducer.InitialState = useSelector((state: RootState) => {
        return state[cartReducer.cartFeatureKey];
    })

    const {products} = cartState;

    const calculateTotal = (): number => {
        let total: number = 0;
        for (let product of products) {
            total += (Number(product.price) * Number(product.count));
        }
        return total;
    };

    const calculateTax = (): number => {
        return calculateTotal() * PRODUCT_TAX / 100;
    };

    const calculateGrandTotal = (): number => {
        return calculateTotal() + calculateTax();
    };

    return (
        <>
            <MainNavBar/>
            <LayoutHeading heading={'CheckOut Your Products'} color={'text-success'}/>
            {
                products && products.length > 0 &&
                <Container className="mt-3">
                    <Row>
                        <Col xs={8}>
                            <Card className="shadow-lg">
                                <Card.Header className="bg-success">
                                    <p className="h3 text-white">Shipping Address</p>
                                </Card.Header>
                                <Card.Body className="bg-light-success">
                                    <ListGroup>
                                        <ListGroupItem>Name : <span
                                            className="fw-bold"></span></ListGroupItem>
                                        <ListGroupItem>Email : <span
                                            className="fw-bold"></span></ListGroupItem>
                                        <ListGroupItem>Flat : <span
                                            className="fw-bold"></span></ListGroupItem>
                                        <ListGroupItem>Street : <span
                                            className="fw-bold"></span></ListGroupItem>
                                        <ListGroupItem>Landmark : <span
                                            className="fw-bold"></span></ListGroupItem>
                                        <ListGroupItem>City : <span
                                            className="fw-bold"></span></ListGroupItem>
                                        <ListGroupItem>State : <span
                                            className="fw-bold"></span></ListGroupItem>
                                        <ListGroupItem>Country : <span
                                            className="fw-bold"></span></ListGroupItem>
                                        <ListGroupItem>PinCode : <span
                                            className="fw-bold"></span></ListGroupItem>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={4}>
                            <Card className="shadow-lg">
                                <Card.Header className="bg-success">
                                    <p className="h3 text-white">Your Cart</p>
                                </Card.Header>
                                <Card.Body className="bg-light-success">
                                    {/*
                                    }*/}
                                    <ListGroup>
                                        <ListGroupItem>
                                            {
                                                products.map((item, index) => {
                                                    return (
                                                        <Row key={index}>
                                                            <Col xs={3}>
                                                                <img src={item.imageUrl} alt="" width={100}
                                                                     height={100} className="img-fluid"/>
                                                            </Col>
                                                            <Col xs={9}>
                                                                <small>{item.title}</small><br/>
                                                                <small>count : {item.count}</small>
                                                            </Col>
                                                        </Row>
                                                    )
                                                })
                                            }
                                        </ListGroupItem>
                                    </ListGroup>

                                    <ListGroup className="mt-3">
                                        <ListGroupItem>Total : <span
                                            className="fw-bold">&#8377;{calculateTotal().toFixed(2)}</span></ListGroupItem>
                                        <ListGroupItem>Tax : <span
                                            className="fw-bold">&#8377; {calculateTax().toFixed(2)}</span></ListGroupItem>
                                        <ListGroupItem>Grand Total : <span
                                            className="fw-bold">&#8377; {calculateGrandTotal().toFixed(2)}</span></ListGroupItem>
                                    </ListGroup>
                                    <Link to={''} className="text-decoration-none">
                                        <div className="d-grid mt-2">
                                            <Button variant="warning" size="sm">
                                                Place Order
                                            </Button>
                                        </div>
                                    </Link>
                                </Card.Body>
                            </Card>

                        </Col>
                    </Row>
                </Container>
            }
            {
                products.length === 0 &&
                <NoProductFound/>
            }
        </>
    );
};
export default CheckOutPage