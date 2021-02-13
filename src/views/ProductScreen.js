import React, { Fragment,useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row,Col,Image,ListGroup,Card,Button, Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useSelector,useDispatch } from 'react-redux';
import {listProductDetails} from '../actions/productActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
// import axios from 'axios';
// import products from '../products';

const ProductScreen = ({match,history}) => {
    const [qty,setQty]=useState(1);
    const dispatch=useDispatch();
    const productDetail=useSelector(state=>state.productDetail);
    const {loading,error,product}=productDetail;
    useEffect(()=>{
        dispatch(listProductDetails(match.params.id));
    },[dispatch,match])

    const addtoCartHandler = ()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return ( 
        <Fragment>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {loading?(<Loader/>):error?(<Message variant="danter">{error}</Message>):(

            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={6} lg={3} xl={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} Reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: $ {product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={12} lg={3} xl={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row >
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>$ {product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row >
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        <strong>{product.countInStock>0?'In Stock':'Out of Stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock>0&&(
                                <ListGroup.Item>
                                    <Row>
                                        <Col sm={12}>Qty</Col>
                                        <Col sm={12}>
                                        <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                                            {
                                            [...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x+1}>
                                                    {x + 1}
                                                </option>
                                            ))
                                            }
                                        </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button 
                                onClick={addtoCartHandler}
                                className="btn btn-block" type="button" disabled={product.countInStock===0}>
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            )}
        </Fragment>
        );
}
 
export default ProductScreen;