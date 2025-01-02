import React, {useEffect, useState} from 'react';
import MainNavBar from "../../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../../layout/components/layout-heading/LayoutHeading";
import ProductSideBar from "../../../component/ProductSideBar";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import * as categoryActions from "../../../../../redux/categories/category.actions";
import * as categoryReducer from "../../../../../redux/categories/category.reducer";
import * as productActions from "../../../../../redux/products/product.actions";
import * as productReducer from "../../../../../redux/products/product.reducers";
import * as cartReducer from "../../../../../redux/cart/cart.reducer";
import {AppDispatch, RootState, useAppDispatch} from "../../../../../redux/store";
import {useSelector} from "react-redux";
import {CategoryView, SubCategoryView} from "../../../../categories/models/CategoryView";
import SpinnerUI from "../../../../ui/components/SpinnerUI";
import {Link} from "react-router-dom";
import {ProductResponseView} from "../../../models/ProductResponseView";
import NoProductFound from "../../../../ui/components/NoProductsFound";
import {CartReduxService} from "../../../../../redux/cart/CartReduxService";

/**
 * Fashion Products Main Page Component
 * @constructor
 */
const FashionCatalogue = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const [filterLoading, setFilterLoading] = useState<boolean>(false);
    const [subCategories, setSubCategories] = useState<SubCategoryView[]>([] as SubCategoryView[]);
    const [category, setCategory] = useState<CategoryView>({} as CategoryView);
    const [filteredProducts, setFilteredProducts] = useState<ProductResponseView[]>([] as ProductResponseView[]);

    /**
     * to get all categories from Redux
     */
    const categoryState: categoryReducer.InitialState = useSelector((state: RootState) => {
        return state[categoryReducer.categoryFeatureKey];
    });

    /**
     * get all products from redux state
     */
    const productState: productReducer.InitialState = useSelector((state: RootState) => {
        return state[productReducer.productFeatureKey];
    })

    const {categories} = categoryState;
    const {loading, products} = productState;

    /**
     * get all categories from server
     */
    useEffect(() => {
        dispatch(categoryActions.getAllCategoriesAction());
    }, [])

    /**
     * set subcategories when categories are changed
     */
    useEffect(() => {
        if (categories.length > 0) {
            const categoryObj: CategoryView | undefined = categories.find(cateObj => cateObj.name === "Fashion");
            if (categoryObj) {
                setCategory(categoryObj);
                setSubCategories(categoryObj.subCategories?.map(item => {
                    return {
                        ...item,
                        isChecked: true
                    }
                }));
            }
        }
    }, [categories]);

    /**
     * get all products with the category selected
     */
    useEffect(() => {
        if (Object.keys(category).length > 0) {
            dispatch(productActions.getAllProductsWithCategoryIdAction({
                categoryId: category._id
            }))
        }
    }, [category]);

    /**
     * set products to local state
     */
    useEffect(() => {
        if (products) {
            setFilteredProducts(products);
        }
    }, [products]);

    /**
     * filter the products from nested component
     * @param subsList
     */
    const filteredTheProducts = (subsList: SubCategoryView[]) => {
        let subs = subsList.map(item => {
            if (item.isChecked) {
                return item._id;
            }
        }).filter(item => item !== undefined);
        setFilterLoading(true);
        setTimeout(() => {
            setFilteredProducts(products.filter(item => subs.includes(item?.subCategoryObj?._id)));
            setFilterLoading(false);
        }, 300);

    };

    /**
     * on click of add to cart
     * @param product
     */
    const clickAddToCart = (product: ProductResponseView) => {
        dispatch({
            type: `${cartReducer.addToCart}`,
            payload: {product: {...CartReduxService.convertCartProduct(product), count: 1}, dispatch: dispatch}
        })
    };

    return (
        <>
            {(loading || filterLoading) && <SpinnerUI/>}
            <MainNavBar/>
            <Container fluid>
                <Row>
                    <Col xs={1}>
                        <ProductSideBar subCategories={subCategories} setSubCategories={setSubCategories}
                                        filteredTheProducts={filteredTheProducts}/>
                    </Col>
                    <Col className="product-layout">
                        <LayoutHeading heading={'Fashion Catalogue'} color={'text-success'}/>
                    </Col>
                </Row>
            </Container>
            {
                filteredProducts && filteredProducts.length > 0 &&
                <Container>
                    <Row>
                        {
                            filteredProducts.map((product) => {
                                return (
                                    <Col xs={3} key={product._id} className="mb-3 text-center ">
                                        <Card>
                                            <Card.Header className="fashion-products">
                                                <Link to={`/products/view/${category.name}/${product._id}`}>
                                                    <img src={product.imageUrl} alt="" width={180}
                                                         className="text-center m-auto d-block"/>
                                                </Link>
                                            </Card.Header>
                                            <Card.Body>
                                                <small className="fw-bold text-success">{product.title}</small><br/>
                                                <small
                                                    className="fw-bold text-danger">&#8377; {Number(product.price).toFixed(2)}</small><br/>
                                                <Button variant={'warning'} size={'sm'}
                                                        onClick={() => clickAddToCart(product)}>Add to
                                                    Cart</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            }
            {
                filteredProducts.length === 0 &&
                <NoProductFound/>
            }
        </>
    );
};
export default FashionCatalogue