import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ProductCard } from '../../ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WishList = () => {

    const { wishList } = useSelector(state => state.wishList)

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            navigate("/")
        }
    });

    const navigate = useNavigate();


    return (
        <div className="w-full bg-[aliceblue]  p-10">
            <h1 className="text-3xl text-black mb-5 ml-1">My Wishlist</h1>
            <div className="flex flex-wrap justify-start ">
                {
                    wishList.map((id) => (
                        <ProductCard key={id}
                            id={id}
                        />
                    ))

                }
            </div>
        </div>
    )
}

export default WishList;
