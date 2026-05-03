
import { useNavigate } from "react-router-dom"
import { Button } from 'primereact/button';
import { clearUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';

const LogOut = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOut = async () => {
        // e.preventDefault()
            localStorage.clear()
            dispatch(clearUser());
            navigate("/")
    }
    return (
        <>
            {/* <h1>LogOut</h1> */}
            <Button onClick={logOut} label="יציאה" style={{backgroundColor:"#ac9c79" ,borderRadius: "10px"}} className='mb-3'/>
            {/* <Button className="col-12 flex justify-content-center mt-3 m-2" onClick={logOut} label="LogOut" /> */}
        </>
    )
}

export default LogOut


