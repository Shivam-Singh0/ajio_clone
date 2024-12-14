import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
 

} from "@material-tailwind/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddAddressMutation } from "../../../redux/apis/addressApiSlice";

export function DrawerForm() {
  const [open, setOpen] = React.useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [pinError, setPinError] = useState("");
  const [token, setToken] = useState("");
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const navigate = useNavigate();

  const FormItems = [{ type: "text", label: "Name", required: true, name: "Name" }, { type: "phone", label: "Mobile", required: true , name: "Mobile"}, { type: "text", label: "Pincode", required: true , name: "Pincode"}, { type: "text", label: "Locality/Area/Street", required: true , name: "Locality"}, { type: "text", label: "Flat Number/Building Name", required: true, name: "Flat" },
  { type: "text", label: "Landmark", required: false, name: "Landmark" }, { type: "text", label: "District/City", required: true, name:"District" }, { type: "text", label: "State", required: true, name: "State" }
  ]
  const [formData, setFormData] = React.useState({Name: "", Mobile: "", Pincode: "", Locality: "", Flat: "", Landmark: "", District: "", State: ""});
  const [addAdress, {isLoading}] = useAddAddressMutation();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (!user) {
        navigate("/")
      }else{
        const token = await user.getIdToken();
        setToken(token);
      }
    })
    return () => unsubscribe();
  }, [navigate])


  const submitHandler = (e) => {
    e.preventDefault();
    
    if (!/^\d{10}$/.test(formData.Mobile)) {
      setPhoneError("Phone number must be 10 digits and can only contain numbers.");
    }else{
      setPhoneError("")
    }
    if (!/^\d{6}$/.test(formData.Pincode)) {
      setPinError("Pin  must be 6 digits and can only contain numbers.");
    }else{
      setPinError("")
    } 

    if (!phoneError && !pinError && token) {
     
      addAdress({token, data: formData}).unwrap();
      toast.success("address added");
      setFormData({Name: "", Mobile: "", Pincode: "", Locality: "", Flat: "", Landmark: "", District: "", State: ""});
      closeDrawer()
    }
  };

  
  
  return (
    <React.Fragment>
      <button onClick={openDrawer} className="text-blue-900">Add an address</button>
      <Drawer open={open} onClose={closeDrawer} placement="right">
        <div className="flex items-center justify-between px-4 pb-2">
          <Typography variant="h5" color="blue-gray">
            Add new address
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

        <form className="flex flex-col gap-6 p-4" onSubmit={submitHandler}>
          {FormItems.map((item, index) => (
            
             <React.Fragment key={index}>
              <Input onChange={(e) => setFormData({...formData, [item.name]: e.target.value})}  variant="standard" label={item.label} placeholder={item.label} color="amber" required={item.required} value={formData[item.name] || ""} 
             
             />
             {(item.label === "Mobile" && phoneError) &&  <p className="text-[10px] mt-[-17px] text-red-900">{phoneError}</p>}
             {(item.label === "Pincode" && pinError) &&  <p className="text-[10px] mt-[-17px] text-red-900">{pinError}</p>}
             </React.Fragment>
            
          
          ))}
          <Button type="submit" className="bg-ajio-2" loading={isLoading}>Save</Button> 
        </form>
      </Drawer>
    </React.Fragment>
  );
}