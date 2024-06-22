import React, { useState } from 'react'
import StripeCheckout from "react-stripe-checkout"
import axios from "axios";
import { Navigate } from 'react-router-dom';


const StripePayment = (props) => {

    const [paymentSuccessful,setPaymentSuccessful]=useState(false);
     
    function handleBuy(token){
        
        
        
        return axios.post("http://localhost:2000/payment/",{
            token,
            total:props.total
            
        },
        {
            headers:{
                Authorization:document.cookie?document.cookie.split(';').find(cookie => cookie.startsWith('access_token=')).split('=')[1]:null
            }
        }
        ).then((response)=>{
            if(response.data.success){
                setPaymentSuccessful(true);
            }
        }).catch((error)=>{

        })
    }
  return (
    <div>
        {
            paymentSuccessful?<Navigate to={'/orders'}/>:""
        }
        <StripeCheckout stripeKey='pk_test_51OdDY6Bkio9wMdEPYvuA3gtLMOlkp3MhIxdJbtb2xxHWWUPirDAHWIYv9Qe9cjTUgHws3EtIQzKmVGKe4ChjJ06O00WTkHmC4T'
        token={handleBuy}
        name='Buy react'>
            <button>pay {props.total} $</button>
        </StripeCheckout>
    </div>
  )
}

export default StripePayment