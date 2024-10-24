"use client";
import React from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useState, useContext } from "react";
import axios from "axios";

interface LoginContextType {
  isLoggedIn: boolean;
  setLogin: (status: boolean) => void;
}
interface BillingContextType {
  isEnabled: boolean;
  setBilling: (status: boolean) => void;
}

interface ActiveUserType {
  id:number
}
export const ActiveUserContext = createContext<ActiveUserType>({
  id:0,
})

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  setLogin: () => {},
});
export const BillingContext = createContext<BillingContextType>({
  isEnabled: false,
  setBilling: () => {},
});

export const useLoginContext = () => useContext(LoginContext);
export const useBillingContext = () => useContext(BillingContext)
export const useActiveUserContext = () => useContext(ActiveUserContext)
const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setLogin] = useState<boolean>(false);
  const [isEnabled, setBilling] = useState<boolean>(false);
  const [id, setId] =useState(0)

  useEffect(()=>{
    const getData = async() => {
      const res = await axios.get(
        `http://localhost:8005/users/me`,     
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add the token here
            "Content-Type": "application/json",
          },
        }
      )

      if(res) {
        console.log(res.data.id, "index")
        setId(res.data.id)
      } else {
        console.log("no id got")
      }
    }
    getData();
  }, [])


  return (
    <html>
      <body>
        <LoginContext.Provider value={{ isLoggedIn, setLogin }}>
         <BillingContext.Provider value={{isEnabled, setBilling}}>
        <ActiveUserContext.Provider value={{id}}>
        {children}
        </ActiveUserContext.Provider>
         </BillingContext.Provider>
        </LoginContext.Provider>
      </body>
    </html>
  );
};

export default AppWrapper;
