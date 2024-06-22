import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import {fetchOrdersOfClient} from "../../features/orderSlice"
import {useDispatch,useSelector} from "react-redux"
import { Navigate } from 'react-router-dom'
function Ordersclient() {
  const dispatch=useDispatch();
  const user=useSelector(state=>state.userReducer.userdata);
  const orders=useSelector(state=>state.orderReducer.orders);
  if(!user){
    return <Navigate to={'/login'}/>
  }
  useEffect(()=>{
    dispatch(fetchOrdersOfClient());
  },[])
console.log(orders);

  return (
   
    <div className="w-1/2 ml-auto mr-auto">  
    <div class="relative overflow-x-auto">
        <h2 className='font-bold'>New Orders</h2>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Order id
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Amount
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
           
            </thead>
            <tbody>
            {orders.length?
                orders.map((order)=>{
                  return(
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {order._id}
                    </th>
                    <td class="px-6 py-4">
                        {order.amount}
                    </td>
                    <td class="px-6 py-4">
                        {order.updatedAt}
                    </td>
                    <td class="px-6 py-4">
                        <Link to={`/orders/${order._id}`} className="bg-slate-600 text-white p-2 rounded-md">
                          Details
                        </Link>
                    </td>
                </tr>
                  )
              }):"No Items"}

            </tbody>
        </table>
    </div>
    </div> 
  )
}

export default Ordersclient