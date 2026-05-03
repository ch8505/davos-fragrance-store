
import { Button } from 'primereact/button';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const DeleteProdFromCart = (props) => {

    const { token } = useSelector(state => state.user);

    const deleteProd = async (prodId) => {

        if (!token) {
            console.error("No token found!");
            return;
        }

        try {
            const result = await Axios.delete(`http://localhost:5000/api/cart/${prodId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                })

            props.onDelete(prodId)
            console.log(result);
        }
        catch (error) {
            console.log("error delete product", error);
        }
    }

    return (
        <>
            <div className="flex flex-wrap justify-content-center gap-3">
                <Button onClick={() => deleteProd(props.prodId)} className='focus:shadow-none surface-card border-transparent text-color-secondary p-0' > <i className='pi pi-times-circle' ></i> </Button>
            </div>
        </>
    )
}
export default DeleteProdFromCart