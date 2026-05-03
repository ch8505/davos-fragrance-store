
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from './service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
// import { FileUpload } from 'primereact/fileupload';
// import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
// import { Tag } from 'primereact/tag';
import { useSelector } from 'react-redux';
import Axios from 'axios';


export default function Manager() {

    const { token } = useSelector(state => state.user)




    let emptyProduct = {
        id: null,
        name: '',
        image: "",
        description: '',
        category: "מפיצי ריח עם מקלות",
        price: 0,
        amount: 20,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const [products, setProducts] = useState([]);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    const toast = useRef(null);
    const dt = useRef(null);


    const fetchData = useCallback(async () => {

        // const { data } = await Axios.get(`http://localhost:5000/api/product`);
        // setProducts(data);
        try {
            const { data } = await Axios.get("http://localhost:5000/api/product", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setProducts(data)
        }
        catch (error) {
            console.log(error, "No found");

        }
    }, [token])

    useEffect(() => {
        fetchData()
    }, [fetchData]);
    // console.log(product);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = async () => {
        setSubmitted(true);
        if (!product.name.trim() || !product.image.trim() || product.price === 0) {
            return;
        }
        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (product._id) {
                const index = findIndexById(product._id);
                _products[index] = _product;

                await Axios.put(`http://localhost:5000/api/product/${product._id}`,
                    {
                        name: product.name,
                        price: product.price,
                        amount: product.amount,
                        image: product.image,
                        category: product.category,
                        description: product.description
                    }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                })
                fetchData()
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                // _product.id = createId();
                _product.image = 'product-placeholder.svg';
                // _products.push(_product);

                await Axios.post("http://localhost:5000/api/product",
                    {
                        name: product.name,
                        price: product.price,
                        amount: product.amount,
                        image: product.image,
                        category: product.category,
                        description: product.description
                    }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                })
                fetchData()
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });

            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = async () => {
        let _products = products.filter((val) => val._id !== product._id);

        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        await Axios.delete(`http://localhost:5000/api/product/${product._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        })
        fetchData()
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });

    };

    const findIndexById = (_id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i]._id === _id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = async () => {
        for (const p of selectedProducts) {
            await Axios.delete(`http://localhost:5000/api/product/${p._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            })
        }

        fetchData()
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });

    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`http://localhost:5000/davos/${rowData.image}`} alt={rowData.name} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    // const ratingBodyTemplate = (rowData) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // };

    // const statusBodyTemplate = (rowData) => {
    //     return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    // };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="ml-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    // const getSeverity = (product) => {
    //     switch (product.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">ניהול מוצרים</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="ביטול" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="שמירה" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="לא" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="כן" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="לא" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="כן" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="_id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} 
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false} style={{direction: "ltr"}}></Column>
                    <Column field="name" header="שם" sortable style={{ minWidth: '16rem',textAlign:"right" }}></Column>
                    <Column field="image" header="תמונה" body={imageBodyTemplate} style={{textAlign:"right"}}></Column>
                    <Column field="price" header="מחיר" body={priceBodyTemplate} sortable style={{ minWidth: '8rem',textAlign:"right" }}></Column>
                    <Column field="category" header="קטגוריה" sortable style={{ minWidth: '10rem' ,textAlign:"right"}}></Column>
                    {/* <Column field="rating" header="ביקורת" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                    {/* <Column field="inventoryStatus" header="סטטוס" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' , textAlign:"right" }}></Column>
                    <Column field="amount" header="כמות" sortable style={{ minWidth: '8rem',textAlign:"right"}}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="פרטי מוצר" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`http://localhost:5000/davos/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        שם
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        תאור
                    </label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
                <div className="field">
                    <label htmlFor="image" className="font-bold">שם קובץ התמונה</label>
                    <InputText id="image" value={product.image} onChange={(e) => onInputChange(e, 'image')} required className={classNames({ 'p-invalid': submitted && !product.image.trim() })} />
                    {submitted && !product.image.trim() && <small className="p-error">Image is required.</small>}

                </div>
                <div className="field">
                    <label className="mb-3 font-bold" >קטגוריה</label>
                    <div className="formgrid grid" >
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId='מפיצי ריח עם מקלות' name="category" value='מפיצי ריח עם מקלות' onChange={onCategoryChange} checked={product.category === 'מפיצי ריח עם מקלות'} />
                            <label htmlFor='מפיצי ריח עם מקלות'>מפיצי ריח עם מקלות</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId='מפיצי ריח ספריי' name="category" value='מפיצי ריח ספריי' onChange={onCategoryChange} checked={product.category === 'מפיצי ריח ספריי'} />
                            <label htmlFor='מפיצי ריח ספריי'>מפיצי ריח ספריי</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId='מכשירי ריח חשמליים' name="category" value='מכשירי ריח חשמליים' onChange={onCategoryChange} checked={product.category === 'מכשירי ריח חשמליים'} />
                            <label htmlFor='מכשירי ריח חשמליים'>מכשירי ריח חשמליים</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId='מעטפות ריח' name="category" value='מעטפות ריח' onChange={onCategoryChange} checked={product.category === 'מעטפות ריח'} />
                            <label htmlFor='מעטפות ריח'>מעטפות ריח</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            מחיר
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US"
                            required autoFocus className={classNames({ 'p-invalid': submitted && (product.price === 0) })} />
                        {submitted && (product.price === 0) && <small className="p-error">Price is required.</small>}

                    </div>
                    <div className="field col">
                        <label htmlFor="amount" className="font-bold">
                            כמות
                        </label>
                        <InputNumber id="amount" value={product.amount} onValueChange={(e) => onInputNumberChange(e, 'amount')} />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle ml-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            האם אתה בטוח שאתה רוצה למחוק <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle ml-3" style={{ fontSize: '2rem' }} />
                    {product && <span>האם אתה בטוח שברצונך למחוק את המוצרים שנבחרו?</span>}
                </div>
            </Dialog>
        </div>
    );
}