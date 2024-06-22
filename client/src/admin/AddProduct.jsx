import React, { useEffect,useState } from "react";
import { fetchCategories } from "../../features/categorySlice";
import {useDispatch,useSelector} from "react-redux"
import axios from "axios";
function AddProduct() {

  /*
  form states

  */

  const [productName,setProductName]=useState("");
  const [productPrice,setProductPrice]=useState(0);
  const [category,setCategory]=useState("");
  const [stock,setStock]=useState(0);
  const [description,setDescription]=useState("");
  const [image,setImage]=useState(null);
  const dispatch=useDispatch();
  const categories=useSelector((state)=>{
        return state.categoryReducer.categories;
  })
  

const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(productPrice);
        if(productPrice<0){
          alert("price can not be negative");
          return;
        }
        if(stock<0){
          alert("stock can not be negative");
          return;
        }
        if(category==""){
          alert("select category");
          return;
        }

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('category', category);
        formData.append('stock', stock);
        formData.append('description', description);
        formData.append('image', image);

        try {
          const response = await axios.post('http://localhost:2000/product/add', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Response:', response.data);
          // Handle success
        } catch (error) {
          console.error('Error:', error);
          // Handle error
        }
        
}
  return (
    <div>
      
      <form className="mt-20 ml-auto mr-auto w-1/2 " onSubmit={handleSubmit}>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product name
            </label>
            <input
              type="text"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e)=>{
                setProductName(e.target.value);
                console.log(productName);
              }}
            />
          </div>
          <div>
            <label
              for="last_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Price
            </label>
            <input
              type="number"
              id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="$ XXX"
              required
              onChange={(e)=>{
                setProductPrice(e.target.value)
                console.log(productPrice);
              }}
            />
          </div>
          <div>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a Category
            </label>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e)=>{
                setCategory(e.target.value)
                console.log(category);
              }}
            >
              <option selected>Choose a Category</option>
              {
                categories.map((category)=>{
                      return(
                        <option value={category._id}>{category.title}</option>
                      )
                })
              }
             
              
            </select>
          </div>
          <div>
            <label
              for="stock"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Stock
            </label>
            <input
              type="number"
              id="phone"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e)=>{setStock(e.target.value)}}
            />
          </div>

          <div>
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Description
            </label>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Product description here.."
              onChange={(e)=>{setDescription(e.target.value)}}
            ></textarea>
          </div>
        </div>

        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
        >
          Upload file
        </label>
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          accept="image/*"
          onChange={(e)=>{
            const file = e.target.files[0];
            setImage(file);
          }}
          required
        />
        <p
          class="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </p>

        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
