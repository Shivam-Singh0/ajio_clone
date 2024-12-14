import { memo } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";

import { MdOutlineLocationOn } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";

  const ProgressBar = memo(function ProgressBar( {progress, SetProgress}) {
    const Items = [{path: "bag", tittle: "Bag", icon: <MdOutlineShoppingBag className="text-3xl" />, }, {path: "location", tittle: "Delivery Details", icon: <MdOutlineLocationOn className="text-3xl" />}, {tittle: "Payment",path :"payment", icon: <MdCurrencyRupee className="text-3xl" />}];
    let currentIndex = Items.findIndex(item => item.path === progress);
    return (
       <ul className="flex justify-center mt-5">
        {Items.map((item, index) => (
            <li key={index}  className="flex ">
                <div className= {` self-center h-[2px] w-[100px] ${index === 0 ? "hidden" : ""} ${index > currentIndex ? "bg-gray-200" : "bg-ajio-2"}`}></div> 
                <button className={` rounded-full p-2 text-white ${index > currentIndex ? "bg-gray-200" : "bg-ajio-2"}`} disabled={currentIndex < index} onClick={() => SetProgress(item.path)}>{item.icon}
                </button> 
                </li>
        ))}
       </ul>
    )
  })
export default ProgressBar;