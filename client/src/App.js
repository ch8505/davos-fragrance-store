import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./Componenents/Sharred/Layout";
import HomePage from "./Componenents/HomePage";
import Register from "./Componenents/Auth/Register";
import Login from "./Componenents/Auth/Login";
import LogOut from "./Componenents/Auth/LogOut";
import ProdList from "./Componenents/products/ProdList";
import ShoppingCart from "./Componenents/ShoppingCart/ShoppingCart";
import AddProduct from "./Componenents/products/ProductManage/AddProduct";
import UpdateProduct from "./Componenents/products/ProductManage/UpdateProduct";
import DeleteProduct from "./Componenents/products/ProductManage/DeleteProduct";
import ProdOnlyCategory from "./Componenents/products/prodOnlyCategory";
import ProductsDemo from "./Componenents/products/ProductManage/ProdMangement";
import SingleProduct from "./Componenents/products/SingleProduct"
import AddCart from "./Componenents/ShoppingCart/AddCart"


import 'primereact/resources/themes/lara-light-indigo/theme.css';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'; // חשוב בשביל grid ו-flex
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import 'primereact/resources/themes/saga-blue /theme.css'; // או כל ערכת נושא אחרת

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const userString = localStorage.getItem('CurrentUser');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        dispatch(setUser({
          token: user.token,
          username: user.username,
          role: user.role
        }));
      } catch (error) {
        console.error('שגיאה בשליפת משתמש מ-localStorage', error);
      }
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="Register" element={< Register />} />
            <Route path="Login" element={< Login />} />
            <Route path="LogOut" element={< LogOut />} />
            <Route path="ProdList" element={< ProdList />} />
            <Route path="ProdOnlyCategory" element={< ProdOnlyCategory />} />
            <Route path="ShoppingCart" element={< ShoppingCart />} />
            <Route path="AddProduct" element={< AddProduct />} />
            <Route path="UpdateProduct" element={< UpdateProduct />} />
            <Route path="DeleteProduct" element={< DeleteProduct />} />
            <Route path="ProductsDemo" element={< ProductsDemo />} />
            <Route path="SingleProduct" element={< SingleProduct />} />
             <Route path="AddCart" element={< AddCart />} />

            {/* <Route path="/product/:id" element={<SingleProduct />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

