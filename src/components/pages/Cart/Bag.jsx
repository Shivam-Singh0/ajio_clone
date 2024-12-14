
import { CartCard } from "./CartCard";
import { Button, Spinner } from "@material-tailwind/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {  useNavigate } from "react-router-dom";
import { useGetCartQuery } from "../../../redux/apis/cartApiSlice";
import {  useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { MdOutlineLocationOn } from "react-icons/md";
import { DrawerForm } from "./DrawerForm";
import { useGetAddressQuery } from "../../../redux/apis/addressApiSlice";
import { DrawerForm2 } from "./DrawerForm2";
import { LuPackage } from "react-icons/lu";
import CartCard2 from "./CartCard2";
import OrderDetail from "./OrderDetail";
import { loadStripe } from "@stripe/stripe-js";


const Bag = () => {

  const [progress, SetProgress] = useState('bag');
  const [token, setToken] = useState('');
  const [currentAddress, setCurrentAddress] = useState(null);
  const navigate = useNavigate();
  
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

  const {data: userAddress, isLoading: isLoadingAddress, isFetching: isFetchingAddress} = useGetAddressQuery(token, {skip: !token});

  const { data,  isLoading, refetch, isFetching} = useGetCartQuery(token, {skip: !token});

  useEffect(() => {
    if (!isLoadingAddress && !isFetchingAddress && userAddress) {
      setCurrentAddress(userAddress[0]);
    }
  }, [isFetchingAddress, isLoadingAddress, userAddress]);

  if (isLoading || isFetching || isLoadingAddress || isFetchingAddress) {
    return(
      <Spinner className="h-16 w-16 text-gray-900/50 mx-auto mt-5"/>
        
    )
  }
  if (!data || !data.products.length) {
    return (
      <h1 className="text-black text-3xl text-center mt-5">Bag is Empty</h1>
    );
  }





  const ammount = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  const bagTotal = data.products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const paymtentHandler = async() => {
    const stripe = await loadStripe("pk_test_51QVpAaGWM6KXQfOKqqFXP5a06nmwoxzBiNqmlIqrY0LiopAxZJdkopeuJ1dN6lNSZCPtGcabU0RT34tNoH9eFmQN00NGf0xat3");
    const body = {
      products: data.products
    }
    const response = await fetch("https://ajio-api.onrender.com/api/cart/checkout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const session = await response.json();

    await stripe.redirectToCheckout({ sessionId: session.id });
  }
 
 

  return (
    <>
    <ProgressBar progress={progress} SetProgress={SetProgress} />
   {progress === "bag" ? (
     <div className="text-black p-5 sm:p-10 md:p-20 flex flex-col md:flex-row gap-4 w-full">
      
     <div className="w-full md:w-2/3 lg:w-1/2">
       <h1 className="text-2xl md:text-3xl">My Bag</h1>
       {data.products.map((product, index) => (
         <div className="mt-4" key={index}>
         <CartCard {...product} token={token} refetch={refetch} />
       </div>
       )) 
         
       }
     </div>
     <div className="w-full md:w-1/3 lg:w-1/4 mt-6 md:mt-0">
      <OrderDetail ammount={ammount} bagTotal={bagTotal} text={"Proceed to Shipping"} progress={"location"} SetProgress={SetProgress} />
     </div>
   </div>
   ): progress === "location" ? (
    <div className="flex justify-between px-20 w-full">
    <div className="w-full lg:w-2/3">
    <div className="font-bold">
      <div className="flex items-center gap-2">
        <MdOutlineLocationOn size={40} className="shrink-0 m-0 p-0" />
        <div>
        <h1>Delivery Address</h1>
        <p className="font-thin text-gray-600 ">
        We will deliver your order to this address
        </p>
        </div>
      </div>
      
    </div>
          
          {currentAddress && (
            <div className="text-[13px] text-gray-600 mt-4">
              <p className="text-[14px] text-black">{currentAddress.Name}</p>
              <p>
                {currentAddress.Flat}, {currentAddress.Locality}
              </p>
              <p>
                {currentAddress.District}, {currentAddress.State}
              </p>
              <p>India - {currentAddress.Pincode}</p>
              <span>
                Phone:{" "}
                <p className="font-semibold inline">{currentAddress.Mobile}</p>
              </span>
            </div>
          )}
       
      <div className="mt-4">
        {currentAddress ? (
          <DrawerForm2 addresses = {userAddress} setCurrentAddress={setCurrentAddress} />
        ): (<DrawerForm  />)}
      </div>
      <div className="h-[1px] w-full bg-gray-300 mt-10"></div>
      <div className="flex items-center gap-2 mt-4">
        <LuPackage size={40} className="shrink-0 m-0 p-0" />
        <div>
        <h1>Expected Delivery</h1>
        <p className="font-thin text-gray-600 ">
        Estimated delivery dates for your order
        </p>
        </div>
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2 ">
       {data.products.map((product, index) => (
         <div className="mt-4" key={index}>
          <CartCard2 product={product} />
       </div>
       )) 
         
       }
     </div>
    </div>
    <div className="w-full lg:w-1/3 mt-4" >
    <OrderDetail ammount={ammount} bagTotal={bagTotal} text={"Proceed to Payment"} progress={"payment"} SetProgress={paymtentHandler} />
    </div>
  </div>
   ): ""}
    </>
  );
};

export default Bag;
