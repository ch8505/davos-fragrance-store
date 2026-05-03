import { useState } from "react"
import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const UpdateProduct = () => {

    const [price, setPrice] = useState("")
    const [name, setName] = useState("")

    const toast = useRef(null);

    const { token } = useSelector(state => state.user);

    // const navigate = useNavigate()


    const showSuccess = async (e) => {

        e.preventDefault()
        try {
            // const user = JSON.parse(localStorage.getItem("CurrentUser"))
            // console.log(user.data);

            console.log(name);

            const reply = await Axios.put("http://localhost:5000/api/product", { price, name }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            });
            console.log(reply);
            // navigate("/ProdList")
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'המחיר עודכן בהצלחה', life: 3000 });
        }
        catch {
            // if()
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'מוצר לא קיים ', life: 3000 });
        }
    }
    return (
        <>
            <h1>UpdateProduct</h1>
            <div className="card flex justify-content-center">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="name" required></input>
            </div>
            <div className="card flex justify-content-center">
                <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="price" required></input>
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
export default UpdateProduct