import React,{useState,useEffect} from 'react'
import axios from "axios";
import {Link, useParams} from "react-router-dom"
function OrdersclientDetails() {
    const {id}=useParams();
    const [order,setOrder]=useState({});
    useEffect(()=>{
        axios.get(`http://localhost:2000/orders?id=${id}`).then((response)=>{
            setOrder(response.data.orders);
            
        })
    },[]);
  return (
    <>
    {
       
        order.user ?
        
                <>
                
        
        <div class="relative overflow-x-auto w-1/2 ml-auto mr-auto ">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Quantity
                        </th>
                       
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
               { order.products.map((product)=>{
                    if(product.product_id){
                    return(
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {product.product_id.title}
                        </th>
                        <td class="px-6 py-4">
                            {product.quantity}
                        </td>
                       
                        <td class="px-6 py-4">
                             {product.product_id.price * product.quantity}
                        </td>
                    </tr>
                    )}else{
                        return(
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                product not found
                            </th>
                            <td class="px-6 py-4">
                                N/A
                            </td>
                           
                            <td class="px-6 py-4">
                                N/A
                            </td>
                        </tr>
                        )
                    }
                })}
                    
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        
                        <th scope="col" class="px-6 py-3">
                            Grand Total :
                        </th>
                       
                        <th scope="col" class="px-6 py-3">
                            {order.amount}
                        </th>
                        <th scope="col" class="px-6 py-3">
                            {
                                order.status < 2 ?
                                <p className='bg-slate-600 font-bold text-white p-2 rounded-sm'>{order.status==0?"Pending":(order.status==1?"Dispatched":"")}</p> 
                                : <p className='bg-slate-600 font-bold text-white p-2 rounded-sm'>Completed</p>
                        }
                           </th>
                    </tr>
                </thead>
                </tbody>
            </table>
        </div>
        </>
       :""     
    }
</>
  )
}

export default OrdersclientDetails