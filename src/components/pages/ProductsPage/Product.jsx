import { Button, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom"
import { MdFavoriteBorder } from "react-icons/md";
import { PiBag } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from "../../../redux/features/wishList";
import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/features/Cart";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Product = () => {

    const { state } = useLocation();
    const { product } = state;

    const { wishList } = useSelector(state => state.wishList)
    // const [adding, setAdding] = useState(false)
    // const [removing, setRemoving] = useState(false)
    const[wishlisted, SetWishlisted] = useState(false)
    const [addedToBag, setAddedToBag] = useState(false)
    const [authenticated, setAuthenticated] = useState(false);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthenticated(true);
        } else {
           setAuthenticated(false);
        }
    });

    const navigate = useNavigate();

    let { price } = product
    price = Math.round(price * 83.93)
    const priceBeforeDiscount = 100 * (price / 67)

    const dispatch = useDispatch();


    const handleWish = (action) => {
        if (!authenticated) {
            navigate("/login")
            return;
        }
        if (action === "add") {
            setAdding(true)
            dispatch(addToWishList(product.id))
            toast.success("Added to wishlist")

        }
        else {
            setRemoving(true)
            dispatch(removeFromWishList(product.id))
            toast.success("Removed from wishlist")

        }

    }

    const handleAddToBag = () => {
        if (!authenticated) {
            navigate("/login")
            return;
        }
        setAddedToBag(true)
        dispatch(addToCart({ 'id': product.id, price, title: product.title, image: product.image }))
    }


    // useEffect(() => {
       
    //     dispatch(inWishList(product.id))
    //     if (adding) {
    //         setAdding(false)
    //     }
    //     if (removing) {
    //         setRemoving(false)
    //     }
    // }, [dispatch, product, adding, removing])


    useEffect(() => {
        if(wishList.includes(product.id)){
            SetWishlisted(true);
        }
    },[])



    return (
        <div className="grid md:grid-cols-2  md:ml-[10%] mt-10 mb-5 gap-5 md:gap-0">
            <div>
                <img src={product.image} alt={product.title} className="md:max-w-[90%] md:max-h-[85%] w-full h-auto  object-fit" />
            </div>
            <div className="text-black ">

                <div className="text-center">
                    <Typography className=" mt-4 mb-7">{product.title}</Typography>

                    <Typography className="font-medium bg-green-600 text-white rounded inline p-2 ">{product.rating.rate}&#9733; | {product.rating.count}K</Typography>

                    <Typography color="blue-gray" className="font-bold text-2xl mt-6">
                        &#8377;{Math.round(price)}
                    </Typography>
                    <span className="text-sm text-ajio-gold">
                        <Typography className="text-decoration-line: line-through inline">&#8377;{Math.round(priceBeforeDiscount)} </Typography>
                        <Typography className="font-semibold inline ml-1 text-sm">(33% OFF)</Typography>
                    </span>
                    <Typography className="text-gray-700 text-xs">Price inclusive of all taxes</Typography>
                </div>



                {
                    !addedToBag ? (
                        <Button className="flex justify-center  gap-3 w-[50%] bg-ajio-gold mx-auto text-white mt-6 rounded-none" onClick={handleAddToBag} loading={addedToBag}>

                            <PiBag size={26} />
                            <p className="text-base font-light">Add To Bag</p>
                        </Button>
                    ) : (
                        <Button className="flex justify-center  gap-3 w-[50%] bg-ajio-gold mx-auto text-white mt-6 rounded-none" onClick={() => navigate('/bag')}>

                            <PiBag size={26} />
                            <p className="text-base font-light">Go To Bag</p>
                        </Button>
                    )
                }
                {
                    !wishlisted ? (
                        <Button variant="outlined" className="flex justify-center text-ajio-gold border-ajio-gold gap-3 w-[50%] mx-auto  
                mt-6 rounded-none" onClick={() => handleWish('add')} >

                            <MdFavoriteBorder size={26} />
                            <p className="text-base font-light">Save To Whishlist</p>
                        </Button>
                    ) :
                        (
                            <Button variant="outlined" className="flex justify-center text-ajio-gold border-ajio-gold gap-3 w-[50%] mx-auto  
                mt-6 rounded-none" onClick={() => handleWish('remove')} >

                                <MdFavorite size={26} />
                                <p className="text-base font-light">Remove From Whishlist</p>
                            </Button>
                        )
                }

                <div className="ml-[25%] mr-5">
                    <p className=" mt-10 text-ajio-1 font-bold">Details</p>
                    <p className="mt-2 text-black text-sm">{product.description}</p>
                </div>

            </div>

        </div>
    )
}

export default Product
