import React,{useEffect, Fragment} from 'react'
import {LinkContainer} from 'react-router-bootstrap';
import {Button,Table,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
const ProductListScreen=({history,match})=>{

    const dispatch=useDispatch();

    const productList=useSelector(state=>state.productList);
    const {loading,error,products}=productList;

    const productDelete=useSelector(state=>state.productDelete);
    const {loading:loadingDelete,error:errorDelete,success:successDelete}=productDelete;

    const userLogin=useSelector(state=>state.userLogin);
    const {userInfo}=userLogin;

    const productCreate=useSelector(state=>state.productCreate);
    const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct}=productCreate;

    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})
        // if(userInfo&&userInfo.isAdmin){
        //     dispatch(listProducts())
        // }else{
        //     history.push('/login');
        // }
        if(!userInfo.isAdmin){
            history.push('/login');
        }
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch,history,userInfo,successDelete,successDelete,createdProduct])

    const deleteHandler=(id)=>{
        // console.log('delete',id)
        if(window.confirm('Are you sure')){
        //     dispatch(deleteUser(id))
        // }
        dispatch(deleteProduct(id));
        }
    }
    const createProductHandler=()=>{
        // 
        // dispatch(craetepr)
        // dispatch(createProduct());
        dispatch(createProduct());
        // console.log('algo')
    }

    return (
        <Fragment>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete&&<Loader/>}
            {loadingCreate&&<Loader/>}
            {errorDelete&&<Message variant="danger">{errorDelete}</Message>}
            {errorCreate&&<Message variant="danger">{errorCreate}</Message>}
            {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:(
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product=>(
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>$ {product.price}</td>
                                <td>
                                    $ {product.category}
                                </td>
                                <td>
                                    {product.category}
                                </td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant="light" className="btn btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    
                                        <Button variant="danger" className="btn-sm" onClick={()=>deleteHandler(product._id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Fragment>
    )
}

export default ProductListScreen
