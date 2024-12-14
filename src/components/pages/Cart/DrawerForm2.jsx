import React from "react";
import {
  Drawer,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { DrawerForm } from "./DrawerForm";

export function DrawerForm2({addresses, setCurrentAddress}) {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const onClickHandler = (address) => {
    setCurrentAddress(address);
    closeDrawer();
  }
  
  return (
    <React.Fragment>
      <button onClick={openDrawer} className="text-blue-900">Change Address</button>
      <Drawer open={open} onClose={closeDrawer} placement="right" className="overflow-y-auto">
        <div className="flex items-center justify-between px-4 pb-2">
          <Typography variant="h5" color="blue-gray">
            Change Address
          </Typography>
         
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <div>
       <div className="float-right mr-2">
       <DrawerForm />
       </div>
            {addresses.map((address, index) => (
                <Button key={index} className="bg-transparent w-full shadow-none text-left mt-4 p-10" onClick={() => onClickHandler(address)}>
                <div className="text-[13px] text-gray-600 ml-3" >
              <p className="text-[14px] text-black">{address.Name}</p>
              <p>
                {address.Flat}, {address.Locality}
              </p>
              <p>
                {address.District}, {address.State}
              </p>
              <p>India - {address.Pincode}</p>
              <span>
                Phone:{" "}
                <p className="font-semibold inline">{address.Mobile}</p>
              </span>
            </div>
                </Button>
            ))}
        </div>
      </Drawer>
    </React.Fragment>
  );
}