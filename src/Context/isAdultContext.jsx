import { Children, createContext, useContext, useState } from "react";


const isAdultContext = createContext();



export default function FilterProvider({ children }){
    const [isAdult, setIsAdult] = useState("sfw")

    return(
        <isAdultContext.Provider value = {{isAdult, setIsAdult}}>
            {children}
        </isAdultContext.Provider>
    )

}



export function useIsAdult(){
    return useContext(isAdultContext)
}