import React, { Fragment,useState,useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Products from '../components/Products';
// import products from '../products';
import axios from 'axios';

const HomeScreen = () => {
    const[products,setProducts]=useState([]);

    useEffect(()=>{
        const fetchProducts=async()=>{
            const {data}=await axios.get('/api/products');
            setProducts(data);
        }
        fetchProducts();
    },[])

    return ( 
        <Fragment>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Products
                        product={product}
                        />
                    </Col>
                ))}
            </Row>
        </Fragment>
     );
}
 
export default HomeScreen;