import React from 'react'
import {useSelector} from "react-redux"
import { Link } from 'react-router-dom';

function Categories() {
    const categories = useSelector((state) => state.categoryReducer.categories);
  return (
   <>
         <div className='mt-40 mb-6 w-1/2 h-4 ml-auto mr-auto'>
         <Link to={'addCategory'} className='p-3 bg-slate-500 text-white w-10 h-4 ml-auto mr-auto rounded-md'>
          Add New Category
       </Link>
       </div>
<div class="w-1/2 ml-auto mr-auto  relative overflow-x-auto shadow-md sm:rounded-lg">

    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
   
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Category name
                </th>
                
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
                categories.map((category)=>{
                      return(
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {category.title}
                        </th>
                        
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

export default Categories