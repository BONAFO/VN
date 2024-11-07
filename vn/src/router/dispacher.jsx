import { useState } from "react";

export default function Dispacher(){
    const [module, setModule]= useState("");
    const change_module =()=>{}

    return <>
    {module}
    </>
}