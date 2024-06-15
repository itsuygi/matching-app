import "./index.css"
//import { useState } from "react"

export default function Checkbox({checked, onChecked}) {
    //const [isChecked, setIsChecked] = useState(false)

    return (
        <input 
            type="checkbox" 
            role="switch" 
            class="toggle" 

            onChange={onChecked}
            checked={checked}
        />
    );
};