import { useState } from "react"
import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const DeleteProduct = () => {

    const [name, setName] = useState("")

    const toast = useRef(null);

    // const navigate = useNavigate()
    const { token } = useSelector(state => state.user);


    const showSuccess = async (e) => {

        e.preventDefault()
        try {
            // const currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
            // const token = currentUser?.data;

            // if (!token) {
            //     console.error("No token found!");
            //     return;
            // }
            console.log("llll");


            console.log(name);

            console.log("http://localhost:5000/api/product");
            console.log(name);

            const reply = await Axios.delete("http://localhost:5000/api/product", {
                data: { name },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            });
            console.log("reply: ", reply);
            // navigate("/ProdList")
            toast.current.show({ severity: 'success', summary: 'Success', detail: ' המוצר נמחק בהצלחה ', life: 3000 });
        }
        catch {
            // if()
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'מוצר לא קיים ', life: 3000 });
        }
    }
    return (
        <>
            <h1>DeleteProduct</h1>
            <div className="card flex justify-content-center">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="name" required></input>
            </div>
            <div className="card flex justify-content-center">
                <Toast ref={toast} />
                <div className="flex flex-wrap gap-2">
                    <Button label="Success" severity="success" onClick={showSuccess} />
                </div>
            </div>
        </>
    )
}
export default DeleteProduct