import { Button } from "@material-tailwind/react";

export default function OrderDetail({ammount, bagTotal, text, progress, SetProgress}) {
    return (
        <div className="w-full  mt-6 md:mt-0">
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
                 <Button className="w-full bg-ajio-gold rounded-none py-5 my-8" onClick={() => SetProgress(progress)}>
                   {text}
                 </Button>
               </div>
             </div>
    )
}