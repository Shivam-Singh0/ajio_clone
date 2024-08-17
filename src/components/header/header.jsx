import { useEffect, useState } from "react";
import {
    Navbar,
    Typography,
    IconButton,
    Collapse,
} from "@material-tailwind/react";
import { MdFavoriteBorder } from "react-icons/md";
import { PiBag } from "react-icons/pi";

import logo from './logo.jpg'
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SearchBox from "./SearchBox";
import { IoMdLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/features/Cart";
import  { resetWishList } from "../../redux/features/wishList";
export function Header() {
    const [openNav, setOpenNav] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const paths = [
        { name: "Home", path: "/" },
        { name: "Men", path: "/men" },
        { name: "Women", path: "/women" },
        { name: "Electronics", path: "/electronics" },
        { name: "Jewelery", path: "/jewelery" },

    ]

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]);

    const logOutHandler = async () => {
        await auth.signOut();
        setAuthenticated(false);
        dispatch(resetCart());
        dispatch(resetWishList())
        navigate('')
        toast.success('Logged out successfully')
    }


    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {
                paths.map((path, index) => (
                    <Typography
                        key={index}
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <Link to={path.path} className="flex items-center hover:text-ajio-2 hover:font-bold">
                            {path.name}
                        </Link>
                    </Typography>
                ))
            }

        </ul>
    );



    return (
        <div className=" w-full bg-white">
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none bg-white px-4 py-2 lg:px-8 lg:py-4 shadow-lg">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <img src={logo} height={70} width={70} />
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <SearchBox />
                        <div className="flex items-center gap-x-4">
                            {authenticated ? (
                                <>
                                    <Link to={"/wishlist"} className="rounded-full bg-ajio-1 hover:bg-ajio-2 text-white p-2">
                                        <MdFavoriteBorder size={25} />
                                    </Link>
                                    <Link to={"/bag"} className=" rounded-full bg-ajio-1 hover:bg-ajio-2 text-white p-2">
                                        <PiBag size={25} />
                                    </Link>
                                    <IconButton className="rounded-full bg-ajio-1 hover:bg-ajio-2 text-white " >
                                        <IoMdLogOut size={25} onClick={logOutHandler} />
                                    </IconButton>
                                </>
                            ) : (
                                <Link className="p-2 bg-ajio-1 hover:bg-ajio-2 text-white rounded-lg hidden lg:block" to={"/login"}>
                                    Login
                                </Link>
                            )}
                        </div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div >
                </div >
                <Collapse open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Link className="p-2 bg-ajio-1 hover:bg-ajio-2 text-white rounded-lg w-full text-center" to={"/login"}>
                            Login
                        </Link>
                    </div>
                </Collapse>
            </Navbar >
        </div >
    );
}