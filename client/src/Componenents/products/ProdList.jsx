
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { jwtDecode } from "jwt-decode"

import { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
// import { Card } from 'primereact/card';

export default function BasicDemo() {

    const { token } = useSelector(state => state.user);

    //סטיט עבור כל המוצרים
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');

    // קבלת כל המוצרים
    const fetchData = async () => {
        const { data } = await Axios.get("http://localhost:5000/api/product");
        setProducts(data);
        console.log("fetchData", data);
    };



    //הצגת המוצרים בעת כניסה לקומפוננטה
    useEffect(() => {
        fetchData();
    }, []);

    const navigate = useNavigate()


    const addToCart = async (item) => {
        try {
            // const user = JSON.parse(localStorage.getItem("CurrentUser"))

            const decoded = jwtDecode(token);
            console.log('Decoded Token:', decoded)

            const { data } = await Axios.post("http://localhost:5000/api/cart", { prodId: item, userId: decoded._id }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            });
            console.log(data);
            // try {
            //     const reply = await Axios.put(`http://localhost:5000/api/product/${item}`, {
            //         headers: {
            //             Authorization: `Bearer ${user.data}`,
            //             "Content-Type": "application/json",
            //         },
            //     });
            //     console.log(reply);
            // }
            // catch {
            //     console.log(`error `);
            // }
        }
        catch (error) {
            IsNoRegister()
        }
    }
    const toast = useRef(null);

    const accept = () => {
        navigate("/Register")
    }

    const reject = () => {
        navigate("/ProdList")
    }

    const IsNoRegister = () => {
        confirmDialog({
            message: '?אינך רשום במערכת, תרצה להרשם עכשיו',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        })
    }

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK': return 'success';
            case 'LOWSTOCK': return 'warning';
            case 'OUTOFSTOCK': return 'danger';
            default: return null;
        }
    };

    const listItem = (product, index) => {
        return (
            <div className="col-12">
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <NavLink to={'/SingleProd'}>
                        <img
                            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                            src={`http://localhost:5000/davos/${product.image}`}
                            alt={product.name}
                        // width={'200px'} height={'200px'}
                        />
                    </NavLink>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false} />
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)} />
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button onClick={() => addToCart(product._id)} icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)} />
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <NavLink to={'/SingleProd'}>
                            <img
                                className="w-9 shadow-2 border-round"
                                src={`http://localhost:5000/davos/${product.image}`}
                                alt={product.name}
                            // width={'200px'} height={'200px'}
                            />
                        </NavLink>
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false} />
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button onClick={() => addToCart(product._id)} icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'} />
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) return null;
        return layout === 'list' ? listItem(product, index) : gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return (
            <div className="grid grid-nogutter">
                {products.map((product, index) => (
                    <React.Fragment key={product.id || index}>
                        {itemTemplate(product, layout, index)}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    const header = () => (
        <div className="flex justify-content-end">
            <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
    );

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="card">
                <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
            </div>
        </>
    );
}
