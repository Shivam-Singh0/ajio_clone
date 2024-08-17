import { useSelector } from "react-redux";
import { CartCard } from "./CartCard";
import { Button } from "@material-tailwind/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Bag = () => {
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });

  const ammount = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  const bagTotal = Object.keys(cart).reduce((acc, key) => {
    return acc + cart[key].price * cart[key].qty;
  }, 0);

  if (!Object.keys(cart).length) {
    return (
      <h1 className="text-black text-3xl text-center mt-5">Bag is Empty</h1>
    );
  }

  return (
    <div className="text-black p-5 sm:p-10 md:p-20 flex flex-col md:flex-row gap-4 w-full">
      <div className="w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-2xl md:text-3xl">My Bag</h1>
        {Object.keys(cart).map((key) => (
          <div className="mt-4" key={key}>
            <CartCard {...cart[key]} />
          </div>
        ))}
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4 mt-6 md:mt-0">
        <div className="bg-[#fafafa] h-auto border border-[#eee] p-5">
          <p className="font-bold">Order Details</p>
          <div className="flex justify-between mt-5">
            <p className="text-sm">Bag Total</p>
            <p>&#8377;{ammount(bagTotal)}</p>
          </div>
          <div className="flex justify-between my-2">
            <p className="text-sm">Delivery Fee</p>
            <p>&#8377;99</p>
          </div>
          <div className="flex justify-between font-bold">
            <p className="text-sm">Order Total</p>
            <p>&#8377;{ammount(bagTotal + 99)}</p>
          </div>
          <Button className="w-full bg-ajio-gold rounded-none py-5 my-8">
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Bag;
