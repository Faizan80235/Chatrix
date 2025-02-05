import { toast } from "react-toastify";

export const handelSucees=(msg)=>{
    toast.success(msg,{
        position:"top-right",
 
    });
}

export const handelerror=(msg)=>{
    toast.error(msg,{
        position:"top-left"
    });
}