import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ProductCard } from '../../ProductCard/ProductCard';

import { useNavigate } from 'react-router-dom';
import { useGetWishlistQuery } from '../../../redux/apis/wishlistApiSlice';
import { Spinner } from '@material-tailwind/react';
import { useState } from 'react';
import { CartCard } from '../Cart/CartCard';

const WishList = () => {
    const [token, setToken] = useState('');
    const auth = getAuth();
    onAuthStateChanged(auth, async(user) => {
        if (!user) {
            navigate("/")
        }
        const token = await user.getIdToken();
        setToken(token);
    });

    const navigate = useNavigate();

    const { data, isLoading, isFetching } = useGetWishlistQuery(token, { skip: !token });


    if (isLoading || isFetching) {
        return (
            <Spinner className="h-16 w-16 text-gray-900/50 mx-auto mt-5" />
        )
    }

    if (!data || !data.Products.length) {
        return (
            <h1 className="text-black text-3xl text-center mt-5">Wishlist is Empty</h1>
          );
    }

    return (
        <div className="w-full bg-[aliceblue]  p-10">
           <h1 className="text-2xl md:text-3xl">My Wishlist</h1>
            <div className="flex flex-wrap justify-start ">
            {data.Products.map((product, index) => (
         
                    <ProductCard key={index} product={product} id={product.id} />
          
      
            )) }
             </div>
            
        </div>
    )
}

export default WishList;
