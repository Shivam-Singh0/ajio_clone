import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../../redux/features/Cart";


export function CartCard({ id, title, image, price, qty }) {

    const dispatch = useDispatch();

    price = price * qty;
    price = new Intl.NumberFormat('en-IN').format(price)
    const [quantity, setQuantity] = useState(qty);
    const increment = () => {
        setQuantity(quantity + 1);
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const updateHandler = () => {   
        dispatch(updateQuantity({id, qty: quantity}))
    }
    const removeHandler = () => {
        dispatch(removeFromCart(id))
    }

    return (

        <Card className="w-full max-w-[60rem] max-h-[200px]  flex-row">
            <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
                <img
                    src={image}
                    alt="card-image"
                    className="object-fill h-full w-full"
                />
            </CardHeader>
            <CardBody className="w-full flex flex-col ">
                <div className="flex gap-4 mb-2">
                    <Typography variant="h6" color="blue-gray" className=" font-light">
                        {title}
                    </Typography>
                  
                    <Popover placement="bottom">
                        <PopoverHandler>
                            <Button className="flex items-center bg-transparent p-0 text-black shadow-none gap-1"><p className="text-gray-700 font-light ">Qty</p> {qty}<IoIosArrowDown /></Button>
                        </PopoverHandler>
                        <PopoverContent>
                            <p className="font-bold text-black my-4">Select Quantity</p>
                            <div className="flex items-center justify-center gap-2 ">
                                
                                <Button onClick={decrement} className="text-2xl bg-transparent p-0 text-black">-</Button>
                                <p className=" text-center border rounded-full border-black p-1 w-8 h-8">{quantity}</p>
                                <Button onClick={increment} className="text-2xl bg-transparent p-0 text-black shadow-none">+</Button>
                            </div>
                            <Button className="bg-ajio-gold   p-2 text-white text-center mt-3 w-full" onClick={updateHandler}>Update</Button>
                        </PopoverContent>
                    </Popover>
                </div>


                <Typography variant="h6" color="blue-gray" className=" mb-2 font-bold ms-auto bg-[#e1ecf1] text-[14px] px-3 border-l-4 border-[#176c93]">
                    RS. {price}
                </Typography>



                <button className="p-0 m-0 w-0 text-blue-800" onClick={removeHandler}>remove</button>
            </CardBody>
        </Card>

    );
}