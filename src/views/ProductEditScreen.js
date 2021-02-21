import React,{useState,useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {listProductDetails} from '../actions/productActions'
import FormContainer from '../components/FormContainer';

const ProductEditScreen = ({match,history}) => {
    const productId=match.params.id;

    const [name,setName]=useState('');
    const [price,setPrice]=useState(0);
    const [image,setImage]=useState('');
    const [brand,setBrand]=useState('');
    const [category,setCategory]=useState('');
    const [countInStock,setCountInStock]=useState(0);
    const [description,setDescription]=useState('');
    

    const dispatch=useDispatch();

    const productDetail=useSelector(state=>state.productDetail)
    const {loading,error,product}=productDetail;

    useEffect(()=>{
        
        if(!product.name || product._id!==productId){
            dispatch(listProductDetails(productId))
        }else{
            setName(product.name)
            setPrice(product.email)
            setBrand(product.brand);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    
    },[product,dispatch,productId,history])

    const submitHandler=(e)=>{
        e.preventDefault();
        // Update product
    }
    return (
        <Fragment>
            <Link to="/admin/productlist" className="btn btn-light my-3">
                Go back
            </Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:(
             <Form onSubmit={submitHandler}>
             <Form.Group controlId="name">
                     <Form.Label>Name</Form.Label>
                         <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}>
                         </Form.Control>
                 </Form.Group>
                                 <Form.Group controlId="price">
                     <Form.Label>Price</Form.Label>
                         <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e)=>setPrice(e.target.value)}>
                         </Form.Control>
                 </Form.Group>
 
                 <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                         <Form.Control type="text" placeholder="Enter Image url" value={image} onChange={(e)=>setImage(e.target.value)}>
                         </Form.Control>
                 </Form.Group>
 
                 <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                         <Form.Control type="text" placeholder="Enter Brand" value={brand} onChange={(e)=>setBrand(e.target.value)}>
                         </Form.Control>
                 </Form.Group>
 
                 <Form.Group controlId="countInStock">
                        <Form.Label>Count In Stock</Form.Label>
                         <Form.Control type="number" placeholder="Enter countInStock" value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}>
                         </Form.Control>
                 </Form.Group>

                 <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                         <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e)=>setCategory(e.target.value)}>
                         </Form.Control>
                 </Form.Group>

                 <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                         <Form.Control as="textarea" rows={3} type="text" placeholder="Enter description" value={description} onChange={(e)=>setDescription(e.target.value)}>
                         </Form.Control>
                 </Form.Group>

                 <Button type="submit" variant="primary">
                     Update
                 </Button>
             </Form>

            )}
           
        </FormContainer>
        </Fragment>

    )
}

export default ProductEditScreen;
