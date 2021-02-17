import React,{useEffect, Fragment,useState} from 'react'
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import {Col,Row,ListGroup,Image,Card,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import {ORDER_PAY_RESET} from '../constants/orderConstants';
import {loadStripe} from '@stripe/stripe-js';
// import {Elements,CardElement} from '@stripe/react-stripe-js';

const stripePromise=loadStripe('pk_test_51ILXZNGrmcGmCK47uGT7R2bf8O0Rqh7g2v623h9PZg54aoHRlCNGYWgYFnTVDiNsGG9oTwxKSZcPg1YZu5StfT3l00V1vBOcVE');




function OrderScreen({match}) {
    const orderId=match.params.id;
    const [sdkReady, setSdkReady] = useState(false);

    const dispatch=useDispatch();

    const orderDetails=useSelector(state=>state.orderDetails);
    const{order,loading,error}=orderDetails;

    const orderPay=useSelector(state=>state.orderPay);
    const{loading:loadingPay,success:successPay}=orderPay;

    if(!loading){
        // calculate ItemsPrice decimals
        const addDecimals=(num)=>{
            return (Math.round(num*100) / 100).toFixed(2);
        }
        order.itemsPrice=addDecimals(order.orderItems.reduce((acc,item)=>acc + item.price * item.qty,0));
    }

    useEffect(()=>{
        const addPayPalScript=async()=>{
            const {data:clientId}=await axios.get('/api/config/paypal');
            const script=document.createElement('script');
            script.type='text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async=true
            script.onload=()=>{
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }
        if(!order || successPay || order?._id !==orderId){
            dispatch({type:ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript();
            }else{
                setSdkReady(true);
            }
        }
        const query = new URLSearchParams(window.location.search)
        if (query.get("success")) {
            alert("Order placed! You will receive an email confirmation.");
          }
          if (query.get("canceled")) {
            alert(
              "Order canceled -- continue to shop around and checkout when you're ready."
            );
          }
    },[orderId,dispatch,successPay,order]);
    const successPaymentHandler=(paymentResult)=>{
        console.log(paymentResult)
        dispatch(payOrder(orderId,paymentResult))
    }
    const createcheckOutButton=(preference)=>{
        var script = document.createElement('script');
        script.src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.type='text/javascript';
        script.dataset.preferenceId=preference;
        document.getElementById("button-checkout").innerHTML = "";
        document.querySelector("#button-checkout").appendChild(script);
    }

    const handleClickMercadoPago=async(order)=>{
        let itemsDescription=[];
        let nombres= order.orderItems;
        nombres.forEach(item=>{
            // console.log(item.name)
            itemsDescription.push(item.name);
        })
        var orderData={
            quantity:1,
            description:itemsDescription.toString(),
            price:order.totalPrice,
            id:orderId,
        }
            fetch(`/create_preference/${orderId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            }).then(
            function(response){
                return response.json();
            }
        ).then(function(preference){
            createcheckOutButton(preference.id);
        }).catch(function(){
            alert('error');
        })
    }

    const handleClickStripe=async(order)=>{
        // const stripe = await stripePromise;
        // const response = await fetch("/create-checkout-session", {
        //   method: "POST",
        // });
        // const session = await response.json();
        // // When the customer clicks on the button, redirect them to Checkout.
        // const result = await stripe.redirectToCheckout({
        //   sessionId: session.id,
        //   lineItems:[{
        //       price:order.totalPrice,
        //       quantity:1
        //   }],
        //   mode:'payment',
        // });
        // if (result.error) {
        //   // If `redirectToCheckout` fails due to a browser or network
        //   // error, display the localized error message to your customer
        //   // using `result.error.message`.
        // }
        console.log(order)
      };

    return (
        <Fragment>
            {loading?(<Loader/>):error?(<Message variant="danger">{error}</Message>):(
                <Fragment>
                    <h1>Order {order._id}</h1>
                        <Row>
                            <Col md={8}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h2>Shipping</h2>
                                        <p><strong>Name: </strong>{order.user.name}</p>
                                        <p>
                                            <strong>Email: </strong>
                                            <a href={`mailto:${order.user.email}`}> {order.user.email}</a></p>
                                        <p>
                                            <strong>Address:</strong>
                                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                        </p>
                                        {
                                        order.isDelivered
                                        ?(<Message variant="success">Delivered On {order.isDelivered}</Message>)
                                        :(<Message variant="info">Not Delivered</Message>)
                                        }
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <h2>Payment Method</h2>
                                        <p>
                                        <strong>Method:</strong>
                                        {order.paymentMethod}
                                        </p>
                                        {
                                        order.isPaid
                                        ?(<Message variant="success">Paid On {order.paidAt}</Message>)
                                        :(<Message variant="warning">Not Paid</Message>)
                                        }
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <h2>Order Items</h2>
                                        {order.orderItems.length===0?(<Message>Order is empty</Message>):(
                                            <ListGroup variant="flush">
                                                {order.orderItems.map((item,index)=>(
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={3} sm={4} xs={6}>
                                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                                            </Col>
                                                            <Col>
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.qty} x ${item.price} = $ {item.qty*item.price}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h2>Order Summary</h2>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Items</Col>
                                                <Col>$ {order.itemsPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Shipping</Col>
                                                <Col>$ {order.shippingPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Tax</Col>
                                                <Col>$ {order.taxPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total</Col>
                                                <Col>$ {order.totalPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                                {order.paymentMethod==='Paypal'?

                                                
                                            !order.isPaid&&(
                                                <ListGroup.Item>
                                                    {loadingPay&&<Loader/>}
                                                    {!sdkReady?<Loader/>:(
                                                        <PayPalButton
                                                        amount ={order.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                        />
                                                    )}
                                                </ListGroup.Item>
                                            
                                            ):order.paymentMethod==='MercadoPago'?
                                                    !order.isPaid&&(
                                                        <ListGroup.Item>
                                                        <Button id="button-checkout" onClick={()=>handleClickMercadoPago(order)} className="btn btn-block btn-info">MercadoPago</Button>
                                                        </ListGroup.Item>
                                                
                                            ):(
                                                <ListGroup.Item>
                                                    <Button className="btn btn-block"
                                                    onClick={()=>{handleClickStripe(order)}}
                                                    >Stripe Button</Button>
                                                </ListGroup.Item>
                                            )
                                        }
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                </Fragment>
            
            )}
        </Fragment>
    )
}

export default OrderScreen;
