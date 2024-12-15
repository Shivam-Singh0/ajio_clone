import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetOrdersQuery } from '../../../redux/apis/cartApiSlice';
import { Spinner } from '@material-tailwind/react';
import CartCard2 from '../Cart/CartCard2';

const Orders = () => {
   const navigate = useNavigate();
       const [token, setToken] = useState('');
       
       useEffect(() => {
         const auth = getAuth();
         const unsubscribe = onAuthStateChanged(auth, async (user) => {
           if (!user) {
             navigate("/");
           } else {
             const token = await user.getIdToken();
             setToken(token);
           }
         });
       
         return () => unsubscribe(); // Clean up the listener
       }, [navigate]);

       const {data, isLoading} = useGetOrdersQuery(token, {skip: !token});

       if (isLoading) {
        return (
            <Spinner className="h-16 w-16 text-gray-900/50 mx-auto mt-5"/>
        )
       }
  return (
    <div className='flex flex-col h-screen mt-6'>
    {data?.map((order, index) => (
        <div key={order._id} className='mx-auto my-4'>
            <span >Order ID: {order._id} <p className='inline float-right'>Order Status : {order.deliverd ? 'Delivered' : 'Shipped'}</p></span>
            <div className='shadow-xl p-10 w-[700px]'>
                {order.products.map((product, i) => (
                   <CartCard2 key={i} product={product} />
                ))}
            </div>
        </div>
    ))}
</div>
  )
}

export default Orders