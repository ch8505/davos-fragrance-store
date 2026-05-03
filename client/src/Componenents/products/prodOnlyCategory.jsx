
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Rating } from 'primereact/rating';
// import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useCallback } from 'react';
import { Dialog } from 'primereact/dialog';
import SingleProduct from "./SingleProduct";
import { useSearchParams } from 'react-router-dom';

import AddCart from "../ShoppingCart/AddCart";

export default function BasicDemo() {

    //סטיט עבור כל המוצרים
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    const fetchData = useCallback(async () => {
        try {
            if (category) {
                const { data } = await Axios.get(`http://localhost:5000/api/product?category=${category}`);
                setProducts(data);
            }
            else {
                const { data } = await Axios.get(`http://localhost:5000/api/product`);
                setProducts(data);
            }

        }
        catch (error) {
            setProducts([]);
        }
    }, [category])


    //הצגת המוצרים בעת כניסה לקומפוננטה
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // const getSeverity = (product) => {
    //     switch (product.inventoryStatus) {
    //         case 'INSTOCK': return 'success';
    //         case 'LOWSTOCK': return 'warning';
    //         case 'OUTOFSTOCK': return 'danger';
    //         default: return null;
    //     }
    // };


    const [visibleId, setVisibleId] = useState(null);

    const openDialog = (id) => setVisibleId(id);
    const closeDialog = () => setVisibleId(null);

    const listItem = (product, index) => {
        return (
            <>
                <div className="col-12">
                    <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                        <img
                            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round cursor-pointer"
                            src={`http://localhost:5000/davos/${product.image}`}
                            alt={product.name}
                            onClick={() => openDialog(product._id)}
                        />
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900 cursor-pointer"  onClick={() => openDialog(product._id)}> {product.name}</div>
                                {/* <Rating value={product.rating} readOnly cancel={false} /> */}
                                <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                        <i className="pi pi-tag"></i>
                                        <span className="font-semibold">{product.category}</span>
                                    </span>
                                    {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)} /> */}
                                </div>
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span className="text-2xl font-semibold">${product.price}</span>
                                <AddCart id={product._id} />
                            </div>
                        </div>
                    </div>
                </div>
               
                <Dialog header={<img alt={product.name} src={`http://localhost:5000/davos/${product.image}`} style={{ maxHeight: "42vh" }} />} visible={visibleId === product._id} style={{ width: '20vw' }}  onHide={closeDialog}>
                    <SingleProduct prodId={product._id} />
                </Dialog>
            </>
        );
    };

    const gridItem = (product) => {
        return (
            <>
                <div className="col-12 sm:col-6 lg:col-4 xl:col-3 p-2 ">
                    <div className="p-4 shadow-2 surface-border surface-card border-round m-2 hover:shadow-6 flex flex-column h-full">
                        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                            <div className="flex align-items-center gap-2">
                                <i className="pi pi-tag"></i>
                                <span className="font-semibold">{product.category}</span>
                            </div>
                            {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)} /> */}
                        </div>
                        <div className="flex flex-column align-items-center gap-3 py-5">
                            <img
                                className="w-9 shadow-2 border-round cursor-pointer"
                                src={`http://localhost:5000/davos/${product.image}`}
                                alt={product.name}
                                onClick={() => openDialog(product._id)}
                            />
                            <div className="lg:text-2xl sm:text-xl font-bold text-center cursor-pointer"  onClick={() => openDialog(product._id)} >{product.name}</div>
                            {/* <Rating value={product.rating} readOnly cancel={false} /> */}
                        </div>
                        <div className="flex align-items-center justify-content-between mt-auto">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <AddCart id={product._id} />
                        </div>
                    </div>
                </div>
              
                <Dialog header={<img alt={product.name} src={`http://localhost:5000/davos/${product.image}`} style={{ maxHeight: "42vh" }} />} visible={visibleId === product._id} style={{ width: '20vw' }}  onHide={closeDialog}>
                    <SingleProduct prodId={product._id} />
                </Dialog>

            </>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) return null;
        return layout === 'list' ? listItem(product, index) : gridItem(product, index);
    };

    const listTemplate = (products, layout) => {
        return (
            <div className="grid grid-nogutter px-8 py-7">
                {products.map((product, index) => (
                    <React.Fragment key={product.id || index}>
                        {itemTemplate(product, layout, index)}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    const header = () => (
        <div className="flex justify-content-end px-8">
            <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
    );

    return (
        <>
            {/* <Toast ref={toast} /> */}
            <ConfirmDialog />
            <div className="card flex justify-content-center ">
                <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
            </div>
        </>
    );
}
