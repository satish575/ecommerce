import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import {fetchAllOrders} from "../../features/orderSlice"
function Orders() {
    const dispatch=useDispatch();
    const orders=useSelector((state)=>{
         return state.orderReducer.orders;
    })
    useEffect(()=>{
        dispatch(fetchAllOrders());
    },[])
  return (
    <div className='w-1/2 ml-auto mr-auto mt-40'>
       
    <div class="relative overflow-x-auto">
        <h2 className='font-bold'>New Orders</h2>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Customer name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Amount
                    </th>
                    <th scope="col" class="px-6 py-3">
                        No of Products
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
            {
                orders.map((order)=>{
                    if(order.status==0){
                    return(
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {order.user.username}
                    </th>
                    <td class="px-6 py-4">
                        $ {order.amount}
                    </td>
                    <td class="px-6 py-4">
                        {order.products.length}
                    </td>
                    <td class="px-6 py-4">
                        <Link to={`orderdetails/${order._id}`} className="bg-slate-600 text-white p-2 rounded-md">
                          details
                        </Link>
                    </td>
                </tr>
                )}
                })
            }
                
                
                
            </tbody>
        </table>
    </div>
    <div class="relative overflow-x-auto mt-6">
        <h2 className='font-bold'>Orders History</h2>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Customer name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Amount
                    </th>
                    <th scope="col" class="px-6 py-3">
                        No of products
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>

            {
                orders.map((order)=>{
                    if(order.status==2){
                    return(
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {order.user.username}
                    </th>
                    <td class="px-6 py-4">
                        $ {order.amount}
                    </td>
                    <td class="px-6 py-4">
                        {order.products.length}
                    </td>
                    <td class="px-6 py-4">
                        <Link to={`orderdetails`} className="bg-slate-600 text-white p-2 rounded-md">
                          details
                        </Link>
                    </td>
                </tr>
                )}
                })
            }
             
                
                
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default Orders