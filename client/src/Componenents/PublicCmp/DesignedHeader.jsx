import './DesignedHeader.css';
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tooltip } from 'primereact/tooltip';

export default function DesignedHeader() {

  const { /*username,*/ role } = useSelector(state => state.user);

  const itemRenderer = (item) => (

    <NavLink
      to={item.path || '#'}
      className={`flex align-items-center p-menuitem-link ${!item.parent ? 'submenu-link' : 'topmenu-link'}`}
      // className="flex align-items-center p-menuitem-link"
      style={{ textDecoration: 'none', }}
    >
      <span className="mx-2" /*style={{ color: "#B8BB87" }}*/>{item.label}</span >
      {item.badge && <Badge className="ml-auto" value={item.badge} />}

    </NavLink>
  );


  const items = [
    {
      label: 'בית',
      // icon: 'pi pi-home',
      path: "/",
      template: itemRenderer,
      parent: true
    },
    // {
    //   label: 'חנות המוצרים',
    //   // icon: 'pi pi-home',
    //   path: "/ProdList",
    //   template: itemRenderer,
    //   parent: true
    // },
    {
      label: 'חנות המוצרים',
      // icon: 'pi pi-search',
      parent: true,
      items: [
        {
          label: 'כל המוצרים',
          path: "/ProdOnlyCategory",
          template: itemRenderer
        },
        {
          label: 'מפיצי ריח עם מקלות',
          path: "/ProdOnlyCategory?category=מפיצי ריח עם מקלות",
          template: itemRenderer
        },
        {
          label: 'מפיצי ריח ספריי',
          path: "/ProdOnlyCategory?category=מפיצי ריח ספריי",
          template: itemRenderer
        },
        {
          label: 'מכשירי ריח חשמליים',
          path: "/ProdOnlyCategory?category=מכשירי ריח חשמליים",
          template: itemRenderer
        },
        {
          label: 'מעטפות ריח',
          path: "/ProdOnlyCategory?category=מעטפות ריח ",
          template: itemRenderer
        },
      ]
    },
    // {
    //   label: 'יצירת קשר',
    //   path: "/ContactUs",
    //   template: itemRenderer,
    //   parent: true
    // },
  ];

  try {
    // const user = JSON.parse(localStorage.getItem("CurrentUser"))

    // const decoded = jwtDecode(user.data);
    // console.log('Decoded Token:', decoded)

    console.log(role === 'Admin');

    if (role === 'Admin') {
      items.push({
        label: 'ניהול המוצרים',
        path: "/ProductsDemo",
        template: itemRenderer,
        parent: true,
        // items: [
        //   {
        //     label: 'הוספה',
        //     // icon: 'pi pi-bolt',
        //     path: "/AddProduct",
        //     // shortcut: '⌘+S',
        //     template: itemRenderer
        //   },
        //   {
        //     label: 'עדכון',
        //     // icon: 'pi pi-bolt',
        //     path: "/UpdateProduct",
        //     // shortcut: '⌘+S',
        //     template: itemRenderer
        //   },
        //   {
        //     label: 'מחיקה',
        //     // icon: 'pi pi-bolt',
        //     path: "/DeleteProduct",
        //     // shortcut: '⌘+S',
        //     template: itemRenderer
        //   }, {
        //     label: 'ניהול',
        //     // icon: 'pi pi-bolt',
        //     path: "/ProductsDemo",
        //     // shortcut: '⌘+S',
        //     template: itemRenderer
        //   }
        // ]
      },)
    }
  }
  catch {
    console.log("??");

  }


  const start = <img alt="logo" src={`http://localhost:5000/davos/logo.jpg`} height="125" className="mr-2"></img>;
  const end = (
    <div className="flex align-items-center gap-2">
      <a href="/Login" className='iconMenu shadow-2' id="loginIcon"> <i className="pi pi-user" style={{ fontSize: '1.5rem' }} > </i></a>
      <Tooltip target="#loginIcon" content="החשבון שלי" position="top" />
      <a href="/ShoppingCart" className='iconMenu shadow-2' id="cartIcon" > <i className="pi pi-shopping-cart " style={{ fontSize: '1.5rem' }}></i></a>
      <Tooltip target="#cartIcon" content="עגלת הקניות" position="top" />

    </div>
  );

  return (
    <>
      <div className="p-component">
        <div className="card">
          <Menubar className="p-4" model={items} start={end} end={start} />
        </div>
      </div>
      <div>
        {/* שלום {username} - התפקיד שלך: {role} */}
      </div>
    </>
  )
}

