import React, { useEffect } from "react";
import { Link, NavLink, redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../features/categorySlice";
import { fetchAllProducts, fetchByCategory } from "../../features/productSlice";
import { TbFilterSearch } from "react-icons/tb";
import { addToCart } from "../../features/cartSlice";
import {Navigate} from "react-router-dom"
function AdminProducts() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categoryReducer.categories);
    const products = useSelector((state) => state.productReducer.products);
    
    useEffect(() => {
      
      dispatch(fetchCategories());
      dispatch(fetchAllProducts());
    }, []);
    const handleAddToCart=(productid)=>{
            dispatch(addToCart(productid));
           
    }
    const getCategory=(product)=>{
      let title=null;
        categories.forEach((cate)=>{
              if(cate._id==product.category){
                title= cate.title;
              }
         })
         
        return title;
    }
    return (
    <>
        
        <div className='mt-40 mb-6 w-1/2 h-4 ml-auto mr-auto'>
         <Link to={'addProduct'} className='p-3 bg-slate-500 text-white w-10 h-4 ml-auto mr-auto rounded-md'>
          Add New Product
       </Link>
       </div>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2 ml-auto mr-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Stocks
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          {
            products.map((product)=>{
              return(
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.title}
                </th>
                <td class="px-6 py-4">
                    {product.stocks}
                </td>
                <td class="px-6 py-4">
                    {
                      getCategory(product)
                    }
                </td>
                <td class="px-6 py-4">
                    ${product.price}
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
              )
            })
            
            
          }
        </tbody>
    </table>
</div>

    </>
  )
}

export default AdminProducts