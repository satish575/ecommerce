import React, { useEffect } from "react";
import "./css/cart.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  getCartData,
  removeFromCart,
  addQuantity,
  cartErrorDel,
  cartError
} from "../../features/cartSlice";
import StripePayment from "../components/StripePayment";
function Cart() {
  const dispatch = useDispatch();
  const {cartData,total} = useSelector((state) => state.cartReducer);
  const cartErrorState=useSelector((state)=>state.cartReducer.error);
  console.log(cartData);
  useEffect(() => {
    dispatch(cartError(""));
    dispatch(getCartData());
    
  }, [cartErrorState]);

  
  const updateQuantity=(productid,quantity)=>{



             if(quantity==0){
              alert("Quantity can not be less than 1");
              return;
             }
            
            let stock;
            cartData.forEach(product => {
                  if(product.product_id._id==productid){
                     stock=product.product_id.stocks;
                  }
            });
            if(quantity>stock){
              alert(`only ${stock} items are avaliable`);
              return;
            }
             dispatch(
              addQuantity(
               { 
                productid,
                quantity}
              )
            )
          dispatch(getCartData())
  }
  return (
    
    <section className="cart_section">
      {
        cartErrorState=='Login to continue'?<Navigate to={'/login'}></Navigate>:""
      }
      <div className="product_section">
        { cartData.length
          ? cartData.map((product) => {
              return (
                <div className="product">
                  <img src={product.product_id.imgurl} alt="" />
                  <div className="description">
                    <h2>{product.product_id.title}</h2>
                    <p>{product.product_id.description}</p>
                    <div className="action flex items-center justify-start gap-3">
                      <button
                        className="bg-green-500 text-white p-1 px-2"
                        onClick={(e)=>{
                          const quantity=product.quantity+1;
                          console.log(quantity);
                          updateQuantity(product.product_id._id,quantity)}}
                      >
                        +
                      </button>
                      <p>{product.quantity}</p>
                      <button className="bg-red-500 text-white p-1 px-2" onClick={(e)=>{
                          const quantity=product.quantity-1;
                          console.log(quantity);
                          updateQuantity(product.product_id._id,quantity)}}>
                        -
                      </button>
                    </div>
                    <button
                      className="bg-slate-400 text-white p-2 rounded"
                      onClick={(e) => {
                        dispatch(removeFromCart(product.product_id._id));
                        dispatch(getCartData());
                      }}
                    >
                      remove
                    </button>
                  </div>
                </div>
              );
            })
          : <div className="no-item-msg">
               No Items in Cart
          </div>
          }
      </div>
      {cartData.length ?
      <div className="checkout_section  ">
        {/*<div className="subtotal">
          <p>sub total</p>
          <p>$1900</p>
        </div>
        <div className="delivery">
          <p>delivery charge</p>
          <p>$100</p>
        </div>*/}
        <div className="delivery">
          <p>grand total</p>
          <p>{total}</p>
        </div>
        <button className="bg-slate-400 text-white p-2 rounded">
            <StripePayment total={total}/>
        </button>
      </div>
      :""
}
    </section>
  );
}

export default Cart;
