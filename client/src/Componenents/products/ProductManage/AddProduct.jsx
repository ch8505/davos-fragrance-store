import { useState } from "react"
import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import Axios from 'axios';
// import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';

const AddProduct = () => {

    const { token} = useSelector(state => state.user);

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [amount, setAmount] = useState("")
    const [image, setImage] = useState("")
    const [category, setCategory] = useState("")


    const toast = useRef(null);

    // const navigate = useNavigate()


    const showSuccess = async (e) => {

        e.preventDefault()
        try {
            // const user = JSON.parse(localStorage.getItem("CurrentUser"))
            // console.log(user.data);
            console.log(token);
            

            const reply = await Axios.post("http://localhost:5000/api/product", { name, price, amount, image, category }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            });
            console.log(reply);



            // navigate("/ProdList")
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'המוצר נוסף בהצלחה', life: 3000 });
        }
        catch {
            toast.current.show({ severity: 'error', summary: 'Error', detail: ' אין הרשאת גישה / חסרים פרטים', life: 3000 });
        }
    }

    // const showError = () => {
    //     toast.current.show({ severity: 'error', summary: 'Error', detail: 'חסרים פרטים', life: 3000 });
    // }

    return (
        <>
            <h1>AddProduct</h1>
            <div className="card flex justify-content-center">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="name" required></input>
            </div>
            <div className="card flex justify-content-center">
                <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="price" required></input>
            </div>
            <div className="card flex justify-content-center">
                <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="amount" required></input>
            </div >

            <div className="card flex justify-content-center">
                <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="image" required></input>
            </div >
            <div className="card flex justify-content-center">
                <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="category" required></input>
            </div >
            <div className="card flex justify-content-center">

                <Toast ref={toast} />
                <div className="flex flex-wrap gap-2">
                    <Button label="Success" severity="success" onClick={showSuccess} />
                </div>
            </div>
        </>
    )
}
export default AddProduct