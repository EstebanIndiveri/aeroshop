import React, { Fragment,useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Products from '../components/Products';
import {listProducts} from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const HomeScreen = () => {
    const dispath=useDispatch();
    const productList=useSelector(state=>state.productList)
    const{loading,error,products}=productList
    
    useEffect(()=>{
        dispath(listProducts())
    },[dispath])

    return ( 
        <Fragment>
            <h1>Latest Products</h1>
            {loading?(<Loader/>):error?(<Message variant='danger'>{error}</Message>):
            (<Row>
                {products.map(product=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Products
                        product={product}
                        />
                    </Col>
                ))}
            </Row>)
        }
        </Fragment>
     );
}
 
export default HomeScreen;