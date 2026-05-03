import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AddCart from "../ShoppingCart/AddCart";

const SingleProduct = (props) => {

    const id = props.prodId
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await Axios.get(`http://localhost:5000/api/product/${id}`);
                console.log(data);

                setProduct(data);
            } catch (error) {
                console.log("Error fetching product");
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div>טוען מוצר...</div>;

    return (

        <div className="card flex justify-content-center flex-column">
            <h2>{product.name}</h2>
            <div className='m-5 mb-0'>
                <p style={{ whiteSpace: 'pre-line' }} className="m-0 white-space-pre-line  line-height-2 "> {product.description}</p>
                <div className='flex flex-row justify-content-between mt-5'>
                    <p className="font-bold text-xl">${product.price}</p>
                    <AddCart id={product._id} />
                </div>
            </div>
        </div>

    );
}

export default SingleProduct;
