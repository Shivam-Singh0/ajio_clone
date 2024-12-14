import { Button, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { MdFavoriteBorder } from "react-icons/md";
import { PiBag } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useMemo, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { toast } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAddToCartMutation, useGetCartQuery, useRemoveFromCartMutation } from "../../../redux/apis/cartApiSlice";
import { useAddToWishlistMutation, useIsWishListedMutation, useRemoveFromWishlistMutation } from "../../../redux/apis/wishlistApiSlice";


const Product = () => {
    const { state } = useLocation();
    const { product } = state;
    const [wishlisted, setWishlisted] = useState(false);
    const [addedToBag, setAddedToBag] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    const [addToCart, { isLoading : addingToCart }] = useAddToCartMutation();

    
   const {id} = useParams()
 
    
    const auth = getAuth();
    const navigate = useNavigate();
    
   const [addToWishList] = useAddToWishlistMutation();
   const [isWishListed, { isLoading : isWishLoading}] = useIsWishListedMutation();

   const [removeFromWishList, {isLoading : removing}] = useRemoveFromWishlistMutation();

   
    const {  refetch} = useGetCartQuery(token, {skip: !token});



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
            setAuthenticated(!!user);
            // Get the token asynchronously
            const token = await user.getIdToken();
            setToken(token);

        });
        return () => unsubscribe();

       
    }, [auth]);

    useEffect(() => {
        const checkIfWishlisted = async () => {
            if (token) {
                try {
                    const result = await isWishListed({ token, productId: id }).unwrap();
                    setWishlisted(result); // Directly set the result from the backend
                } catch (error) {
                    console.error("Error checking wishlist status:", error);
                    setWishlisted(false); // Default to false on error
                }
            }
        };
    
        checkIfWishlisted(); // Call the function inside the effect
    }, [token, id, isWishListed]); // Removed `isWishListedStatus` to avoid unnecessary loops


    
    let { price } = product;
    price = Math.round(price * 83.93);
    const priceBeforeDiscount = 100 * (price / 67);

    const handleWish = (action) => {
        if (!authenticated) {
            navigate("/login");
            return;
        }
        if (action === "add") {
            addToWishList({ token, data : {productId: id, title: product.title, image: product.image, price, rating : product.rating} }).unwrap();
            setWishlisted(true);
            toast.success("Added to wishlist");
        } else {
            removeFromWishList({ token, productId: id }).unwrap();
            setWishlisted(false);
          
            toast.success("Removed from wishlist");
        }
    };

    const handleAddToBag = async() => {
        
        if (!authenticated) {
            navigate("/login");
            return;
        }
        try {
            await addToCart({ token, data: { id, price, title: product.title, image: product.image} }).unwrap();
            setAddedToBag(true);
            toast.success("Added to bag");
            refetch();
        } catch (error) {
            console.log(error)
        }
       
        
    };

    return (
        <div className="grid md:grid-cols-2  md:ml-[10%] mt-10 mb-5 gap-5 md:gap-0">
            <div>
                <img src={product.image} alt={product.title} className="md:max-w-[90%] md:max-h-[85%] w-full h-auto object-fit" />
            </div>
            <div className="text-black">
                <div className="text-center">
                    <Typography className=" mt-4 mb-7">{product.title}</Typography>
                    <Typography className="font-medium bg-green-600 text-white rounded inline p-2 ">
                        {product.rating.rate}&#9733; | {product.rating.count}K
                    </Typography>
                    <Typography color="blue-gray" className="font-bold text-2xl mt-6">
                        &#8377;{Math.round(price)}
                    </Typography>
                    <span className="text-sm text-ajio-gold">
                        <Typography className="text-decoration-line: line-through inline">
                            &#8377;{Math.round(priceBeforeDiscount)}{" "}
                        </Typography>
                        <Typography className="font-semibold inline ml-1 text-sm">(33% OFF)</Typography>
                    </span>
                    <Typography className="text-gray-700 text-xs">Price inclusive of all taxes</Typography>
                </div>
                {!addedToBag ? (
                    <Button
                        className="flex justify-center  gap-3 w-[50%] bg-ajio-gold mx-auto text-white mt-6 rounded-none"
                        onClick={handleAddToBag}
                        loading={addingToCart}
                    >
                        <PiBag size={26} />
                        <p className="text-base font-light">Add To Bag</p>
                    </Button>
                ) : (
                    <Button
                        className="flex justify-center  gap-3 w-[50%] bg-ajio-gold mx-auto text-white mt-6 rounded-none"
                        onClick={() => navigate("/bag")}
                    >
                        <PiBag size={26} />
                        <p className="text-base font-light">Go To Bag</p>
                    </Button>
                )}
                {!wishlisted ? (
                    <Button
                        variant="outlined"
                        className="flex justify-center text-ajio-gold border-ajio-gold gap-3 w-[50%] mx-auto  
                mt-6 rounded-none"
                        onClick={() => handleWish("add")}
                        loading={isWishLoading}
                    >
                        <MdFavoriteBorder size={26} />
                        <p className="text-base font-light">Save To Wishlist</p>
                    </Button>
                ) : (
                    <Button
                        variant="outlined"
                        className="flex justify-center text-ajio-gold border-ajio-gold gap-3 w-[50%] mx-auto  
                mt-6 rounded-none"
                        onClick={() => handleWish("remove")}
                        loading={removing}
                    >
                        <MdFavorite size={26} />
                        <p className="text-base font-light">Remove From Wishlist</p>
                    </Button>
                )}
                <div className="ml-[25%] mr-5">
                    <p className=" mt-10 text-ajio-1 font-bold">Details</p>
                    <p className="mt-2 text-black text-sm">{product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Product;