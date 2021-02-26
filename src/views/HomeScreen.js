import React, { Fragment,useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Products from '../components/Products';
import {listProducts} from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import axios from 'axios';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
const HomeScreen = ({match}) => {
    const keyword=match.params.keyword;
    const pageNumber=match.params.pageNumber || 1;

    const dispath=useDispatch();
    const productList=useSelector(state=>state.productList)
    const{loading,error,products,page,pages}=productList
    
    useEffect(()=>{
        dispath(listProducts(keyword,pageNumber))
    },[dispath,match,keyword,pageNumber])

    return ( 
        <Fragment>
            <Meta/>
            {keyword===undefined ? <ProductCarousel/>:<Link to="/" className="btn btn-light">Go back</Link>}
            <h1>Latest Products</h1>
            {loading?(<Loader/>):error?(<Message variant='danger'>{error}</Message>):
            (
            <Fragment>
            <Row>
                {products.map(product=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Products
                        product={product}
                        />
                    </Col>
                ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword?keyword:''}/>
            </Fragment>
            )
        }
        </Fragment>
     );
}
 
export default HomeScreen;