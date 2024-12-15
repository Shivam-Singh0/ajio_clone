import {
    Popover,
    PopoverHandler,
    PopoverContent,
  
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
   
  export function PopOver({text, link}) {
    return (
    <Popover>
        <PopoverHandler>
          <button className="m-0 p-0 text-ajio-1 hover:text-ajio-2">{text}</button>
        </PopoverHandler>
        <PopoverContent className="bg-white shadow-lg border-2 border-ajio-gold ">
          <Link to={'/'+link}>{link}</Link>
        </PopoverContent>
      </Popover>
    );
  }