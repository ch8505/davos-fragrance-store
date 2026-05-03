import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';

import { OrderList } from 'primereact/orderlist';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';

import DeleteprodFromCart from "./DeleteProdFrromCart";

const ShoppingCart = () => {
  const { token } = useSelector(state => state.user);

  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [shipping, setShipping] = useState('delivery');

  const deliveryCost = 30;

  const fetchCartData = useCallback(async () => {
    try {
      if (!token) {
        console.error("No token found!");
        setLoading(false);
        return;
      }

      const { data: cartData } = await Axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })


      // חישוב סך המחיר של כל המוצרים
      const total = cartData.reduce((sum, product) => sum + product.price * product.amount, 0);

      setCartProducts(cartData);
      setTotalPrice(total);

    } catch (err) {
      console.error("שגיאה בשליפת נתונים", err);
    } finally {
      setLoading(false);
    }
  }, [token])

  useEffect(() => {
    fetchCartData()
  }, [fetchCartData]);

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3 ">
        <DeleteprodFromCart prodId={item.prodId} onDelete={fetchCartData} />
        <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`http://localhost:5000/davos/${item.image}`} alt={item.name} />
        <div className="flex-1 flex flex-column gap-2 xl:mr-8">
          <span className="font-bold">{item.name}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>{item.category}</span>
          </div>
        </div>
        <span className="font-bold text-900">${item.price}</span>
        {/* <p>מחיר ליחידה: ₪{item.price}</p> */}
        <p>כמות: {item.amount}</p>
        <p>סה״כ למוצר: ₪{item.price * item.amount}</p>
      </div>
    );
  };

  const totalWithShipping = totalPrice + (shipping === 'delivery' ? deliveryCost : 0);

  if (loading) return <h3>טוען נתונים...</h3>;
  if (!cartProducts.length) return <h3>סל הקניות שלך ריק כרגע. </h3>;

  return (
    <>
      <div className="card flex justify-content-center m-8 gap-8 p-8 pt-4 flex-wrap">
        <OrderList className='flex-grow-1' dataKey="prodId" value={cartProducts} onChange={(e) => setCartProducts(e.value)} itemTemplate={itemTemplate} header="מוצרים"></OrderList>
        {/* <h2>סה״כ לתשלום: ₪{totalPrice}</h2> */}


        <div className="flex-1 min-h-full" style={{ minWidth: '300px' }}>
          <div style={{ background: '#ffffff', color: '#4b5563', border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', }} >
            <div style={{ background: '#f9fafb', color: '#374151', padding: '1rem 1.25rem', fontWeight: 700, borderBottom: '1px solid #e5e7eb', fontSize: '1.125rem' }} > סיכום </div>

            <div style={{ padding: '1rem 1.25rem', flexGrow: 1 }} className='flex flex-column gap-1'>
              <div className="flex justify-content-between mb-3">
                <span>סכום ביניים</span>
                <span>{totalPrice} ₪</span>
              </div>

              <div className="mb-3 flex flex-column gap-2">
                <div className="font-bold mb-2">משלוח</div>

                <div className="flex align-items-center mb-2 gap-2">
                  <RadioButton
                    inputId="delivery"
                    name="shipping"
                    value="delivery"
                    onChange={(e) => setShipping(e.value)}
                    checked={shipping === 'delivery'}
                  />
                  <label htmlFor="delivery" className="ml-2">
                    שליח עד הבית ({deliveryCost} ₪)
                  </label>
                </div>

                <div className="flex align-items-center gap-2">
                  <RadioButton inputId="pickup" name="shipping" value="pickup" onChange={(e) => setShipping(e.value)} checked={shipping === 'pickup'} />
                  <label htmlFor="pickup" className="ml-2"> איסוף עצמי מאשדוד</label>
                </div>
                <p className="text-xs text-color-secondary mt-2" > המשלוח יתעדכן בסיום ההזמנה. </p>
              </div>

              <div className="flex justify-content-between font-bold text-lg mb-4">
                <span>סה״כ</span>
                <span>{totalWithShipping} ₪</span>
              </div>

              <Button label="המשך לתשלום" className="w-full mt-auto" />
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShoppingCart;