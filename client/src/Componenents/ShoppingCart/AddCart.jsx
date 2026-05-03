
import Axios from "axios";
import { useState } from "react";
import { Button } from 'primereact/button';
import { jwtDecode } from "jwt-decode"
import { confirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';

const AddCart = (props) => {

    const { token } = useSelector(state => state.user);

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);


    const addToCart = async (item) => {
        setLoading(true);

        try {
            const decoded = jwtDecode(token);
            console.log('Decoded Token:', decoded)

            const { data } = await Axios.post("http://localhost:5000/api/cart", { prodId: item, userId: decoded._id }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            });
            console.log(data);
        }
        catch (error) {
            IsNoRegister()
        }
        finally {
            setTimeout(() => {
                setLoading(false);
            }, 700)
        }
    }


    const accept = () => navigate("/Register");
    const reject = () => navigate("/ProdOnlyCategory");

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

    return (
        <>
            {/* <Toast ref={toast} /> */}
            <Button loading={loading} onClick={() => addToCart(props.id)} icon="pi pi-shopping-cart" className="p-button-rounded" />
        </>
    )

}

export default AddCart