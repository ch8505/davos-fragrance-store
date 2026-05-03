import '../../css/Auth.css'
import leaf from "../../img/image.png";
import React, { useState, useRef } from "react";
import { AutoComplete } from "primereact/autocomplete";

import { InputText } from 'primereact/inputtext';
import { InputMask } from "primereact/inputmask";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import Axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';

const Register = () => {

    // const [selectedItem, setSelectedItem] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);

    const items = [
        {
            label: "User",
            value: 1
        },
        {
            label: "Admine",
            value: 2
        },
    ]

    const searchItems = (event) => {
        let query = event.query;
        let _filteredItems = [];

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.label.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                _filteredItems.push(item);
            }
        }
        setFilteredItems(_filteredItems);
    }
    const dispatch = useDispatch()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("User")

    const toast = useRef(null);

    const navigate = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            console.log(role);
            const myToken = await Axios.post("http://localhost:5000/api/auth/register", { username, password, name, phone, email, role })

            const CurrentUser = {
                token: myToken.data,
                username,
                role
            }
            localStorage.setItem("CurrentUser", JSON.stringify(CurrentUser))

            dispatch(setUser({
                username,
                // password: decoded.password,
                role,
                token: myToken.data
            }));


            // toast.current.show({ severity: 'success', summary: 'Success', detail: 'נרשמת בהצלחה', life: 3000 });
            navigate("/ProdOnlyCategory")
        }
        catch {
            if (!name || !username || !password)
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'שם משתמש שם מלא וסיסמא הם שדות חובה', life: 3000 });
            else
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'משתמש קיים', life: 3000 });
        }
    }

    return (
        <>
            {/* <div className="card" style={{ maxWidth: 450, margin: '0 auto', padding: 25 }}>
                <h2 className="mb-4">טופס הרשמה</h2>
                <form onSubmit={submitForm} className="p-fluid">

                    <AutoComplete value={role} suggestions={filteredItems} completeMethod={searchItems}
                        virtualScrollerOptions={{ itemSize: 38 }} field="label" dropdown onChange={(e) => setRole(e.value)} />
                    <InputText id="email" keyfilter="email" className="w-full" placeholder="Email" onChange={(e) => setEmail(e.value)} />
                    <InputMask id="phone" mask="999-999-9999" placeholder="phone 999-999-9999" onChange={(e) => setPhone(e.value)}></InputMask>
                    <Password variant="filled" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} tabIndex={1} toggleMask placeholder="password" required />
                    <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="name" required />
                    <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" required />
                    <Toast ref={toast} />
                    <div className="flex flex-wrap gap-2">
                        <Button onClick={submitForm} label="Submit" icon="pi pi-check" />
                    </div>
                </form>
            </div> */}




            <div className="register-wrapper">
                <div className="register-card">
                    <h2 className="register-title">טופס הרשמה</h2>
                    <form onSubmit={submitForm} className="p-fluid">

                        <div className="p-inputgroup flex-1 mb-3">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-users"></i>
                            </span>
                            <AutoComplete
                                value={role}
                                suggestions={filteredItems}
                                completeMethod={searchItems}
                                field="label"
                                dropdown
                                placeholder="בחר תפקיד"
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="p-inputgroup flex-1 mb-3">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-envelope"></i>
                            </span>
                            <InputText
                                value={email}
                                onChange={(e) => setEmail(e.value)}
                                placeholder="אימייל"
                                className="w-full"
                            />
                        </div>

                        <div className="p-inputgroup flex-1 mb-3">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-phone"></i>
                            </span>
                            <InputMask value={phone} mask="999-999-9999" placeholder="טלפון" onChange={(e) => setPhone(e.value)} className="w-full" />
                        </div>

                        <div className="p-inputgroup flex-1 mb-3">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <span className="p-input-icon-right" style={{ width: '100%' }}>
                                <Password
                                    inputClassName="custom-password-input"
                                    className="w-full" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask placeholder="סיסמה" />
                            </span>
                        </div>

                        <div className="p-inputgroup flex-1 mb-3">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="שם מלא" className="w-full" />
                        </div>

                        <div className="p-inputgroup flex-1 mb-3">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-id-card"></i>
                            </span>
                            <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="שם משתמש" className="w-full" />
                        </div>

                        <Button onClick={submitForm} label="הרשמה" icon="pi pi-check" style={{ backgroundColor: "#ac9c79", borderRadius: "10px" }} />

                    </form>
                </div>

                <img src={leaf} className="leaf-floating" style={{ position: "absolute", top: "15vh", right: "10vw", width: "10vw" }} alt="" />
                <img src={leaf} className="leaf-floating" style={{ position: "absolute", bottom: "10vh", left: "8vw", width: "8vw", animationDelay: "2s" }} alt="" />
            </div>
            <Toast ref={toast} />
        </>
    )
}

export default Register
