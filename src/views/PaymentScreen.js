import React,{useState} from 'react'
import {Form,Button,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import {savePaymentMethod}from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';
import MercadoPagoIcon from '../utils/mercado-pago.jpg'
import StripeIcon from '../utils/stripe.png';
import PaypalIcon from '../utils/paypal.png';
const PaymentScreen = ({history}) => {

    const cart=useSelector(state=>state.cart);
    const{shippingAddress}=cart;

    if(!shippingAddress){
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    // const [paymentMethodMercadoPago, setPaymentMethodMercadoPago] = useState('MercadoPago');

    const dispatch=useDispatch();

    const submitHandler=(e)=>{
        e.preventDefault();
        // console.log('savePaymentMethod(paymentMethod')
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder');
    }

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend" className="text-center mb-5">
                        Select Method
                    </Form.Label>
                <Col className="w-100 justify-content-center align-items-center" md={12}>
                    <Col xs={12} className="justify-content-center align-items-center text-center">
                    <img src={PaypalIcon} alt="" height="30px" width="80px" />
                    <Form.Check className="m-2" type="radio" label="Paypal or Credit Card" id="Paypal" name="paymentMethod" value="Paypal"  onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                    <Col xs={12} className="mt-4 mb-4 justify-content-center align-items-center text-center">
                    <img src={StripeIcon} alt="" height="40px" width="90px" />
                    <Form.Check className="m-2" type="radio" label="Stripe" id="Stripe" name="paymentMethod" value="Stripe"  onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                    <Col xs={12} className="justify-content-center align-items-center text-center">
                    <img src={MercadoPagoIcon} alt="" height="50px" width="100px" />
                    <Form.Check className="m-2" type="radio" label="MercadoPago" id="MercadoPago" name="paymentMethod" value="MercadoPago"  onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                </Col>
                </Form.Group>

            <Button className="btn btn-block mt-2" type="submit" variant="primary">
                Continue
            </Button>
            </Form>

        </FormContainer>
    )
}

export default PaymentScreen
