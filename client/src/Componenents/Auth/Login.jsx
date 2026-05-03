import '../../css/Auth.css'
import leaf from "../../img/image.png";
import LogOut from './LogOut'
import { useState, useRef } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';

import 'primeflex/primeflex.css';


const Login = () => {

    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const toast = useRef(null);

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const myToken = await Axios.post("http://localhost:5000/api/auth/login", { username, password })
            // console.log(myToken);

            const decoded = jwtDecode(myToken.data);
            console.log('Decoded Token:', decoded)

            const CurrentUser = {
                token: myToken.data,
                username: decoded.username,
                role: decoded.role
            }

            localStorage.setItem("CurrentUser", JSON.stringify(CurrentUser))

            dispatch(setUser({
                username: decoded.username,
                password: decoded.password,
                role: decoded.role,
                token: myToken.data
            }));

            console.log("gggggggg");

            navigate("/ProdOnlyCategory")
        }
        catch {
            if (!username || !password)
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'password and username is required', life: 3000 });
            else
                toast.current.show({ severity: 'error', summary: 'Error', detail: ' משתמש לא קיים או שאחד הפרטים שגויים', life: 3000 });
        }
    }
    return (
        <>
            {/* <div className='container-login'>
                <div className="card" style={{ maxWidth: 500, margin: '0 auto', padding: 25, borderRadius: "6px", marginTop: 150, border: "2px solid #ac9c79", backgroundColor: "white" }}>
                    <h2 className="mb-4" >  ברוכים הבאים! התחברו / הרשמו </h2>
                    <h5 style={{ color: "#7c6a4d" }}>עדיין לא נרשמת? <a href='/Register'>להרשמה לחץ כאן</a></h5>
                    <form onSubmit={handleLogin} className="m-4" >
                        <div className="card flex flex-column md:flex-colum gap-3" style={{ direction: "ltr" }}>
                            <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="שם משתמש" required />
                            </div>

                            <div className="p-inputgroup flex-1 " >
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-key"></i>
                                </span>
                                <Password value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} tabIndex={1} placeholder="סיסמא" required />
                            </div>
                        </div>
                    </form >
                    <div className="card flex flex-column md:flex-row gap-3 flex justify-content-center">
                        <Toast ref={toast} />
                        <Button onClick={handleLogin} label="Send" style={{ backgroundColor: "#ac9c79" }} />
                        <LogOut />
                    </div>
                </div >
                <img
                    src={leaf}
                    // className="leaf-floating"
                    style={{ position: "absolute", top: "55vh", right: "12vw", transform: "rotate(180deg)", width: "12vw" }}
                    alt=''
                />
                <img
                    src={leaf}
                    // className="leaf-floating"
                    style={{ position: "absolute", top: "60vh", right: "8vw", width: "5vw", animationDelay: "2s" }}
                    alt=''

                />

            </div> */}



            <div className="login-wrapper">
                <div className="login-card">
                    <h2 className="login-title">ברוכים הבאים!</h2>
                    <p className="login-link"> עדיין לא נרשמת? <a href='/Register'>להרשמה לחץ כאן</a> </p>
                    <form onSubmit={handleLogin} className="p-fluid">
                        <div className="p-inputgroup flex-1 mb-3" style={{ direction: "ltr" }}>
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="שם משתמש" required />
                        </div>

                        <div className="p-inputgroup flex-1 mb-3" style={{ direction: "ltr" }}>
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-key"></i>
                            </span>
                            <Password value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} placeholder="סיסמא" required />
                        </div>
                       
                            <Button className='mb-3' onClick={handleLogin} label="התחבר" style={{ backgroundColor: "#ac9c79", borderRadius: "10px" }} />
                            <LogOut />
                    </form>

                </div>
                <Toast ref={toast} />

                <img src={leaf} className="leaf-floating" style={{ position: "absolute", top: "20vh", right: "10vw", width: "10vw" }} alt="leaf" />
                <img src={leaf} className="leaf-floating" style={{ position: "absolute", top: "60vh", left: "5vw", width: "8vw", animationDelay: "2s" }} alt="leaf" />
            </div>

        </>
    )
}

export default Login
