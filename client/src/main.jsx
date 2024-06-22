import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Login from './pages/Login.jsx'

// import Registration from './pages/Registration.jsx'
import { store } from '../app/store.js'
import {Provider} from "react-redux"
import "./index.css"
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Dashboard from './admin/Dashboard.jsx'
import Adminpanel from './admin/Adminpanel.jsx'
import AdminProducts from './admin/AdminProducts.jsx'
import AddProduct from './admin/AddProduct.jsx'
import Categories from './admin/Categories.jsx'
import AddCategory from './admin/AddCategory.jsx'
import Orders from './admin/Orders.jsx'
import OrderDetails from './admin/OrderDetails.jsx'
import Users from './admin/Users.jsx'
import Ordersclient from './pages/Ordersclient.jsx'
import Logout from './pages/Logout.jsx'
import OrdersclientDetails from './pages/OrdersclientDetails.jsx'
import Registration from './pages/Registration.jsx'

const router=createBrowserRouter([
  
  // {
  //   path:"/registration",
  //   element:<Registration/>
  // },
  {
     path:"/admin",
     element:<Adminpanel/>,
     children:[
     { 
      path:"",
      element:<Dashboard/>
    },
    {
      path:"users",
      element:<Users/>
    },
    {
      path:"orders",
      element:<Orders/>
    },{
      path:"orders/orderdetails/:id",
      element:<OrderDetails/>
    },
    {
      path:"products",
      element:<AdminProducts/>
    },{
      path:"products/addProduct",
      element:<AddProduct/>
    },{
      path:"categories",
      element:<Categories/>
    },
    {
      path:"categories/addCategory",
      element:<AddCategory/>
    }
     ]
  },
  {
    path:"",
    element:<App/>,
    children:[
      {
        path:"/login",
        element:<Login/>
    },
    {
      path:"/registration",
      element:<Registration/>
    },
    {
      path:"/logout",
      element:<Logout/>
    },
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/products",
        element:<Products/>
      },
      {
        path:"/productdetails/:id",
        element:<ProductDetails/>
      },{
        path:"/cart",
        element:<Cart/>
      },{
        path:"/orders",
        element:<Ordersclient/>
      },{
        path:"/orders/:id",
        element:<OrdersclientDetails/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

  <Provider store={store}>
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
  </Provider>
  </React.StrictMode>
)
