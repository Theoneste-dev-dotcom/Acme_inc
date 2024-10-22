"use client";
import React from "react";
import { createContext } from "react";

import { useState, useContext } from "react";

interface LoginContextType {
  isLoggedIn: boolean;
  setLogin: (status: boolean) => void;
}
interface BillingContextType {
  isEnabled: boolean;
  setBilling: (status: boolean) => void;
}

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
const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setLogin] = useState<boolean>(false);
  const [isEnabled, setBilling] = useState<boolean>(false);
  return (
    <html>
      <body>
        <LoginContext.Provider value={{ isLoggedIn, setLogin }}>
         <BillingContext.Provider value={{isEnabled, setBilling}}>
         {children}
         </BillingContext.Provider>
        </LoginContext.Provider>
      </body>
    </html>
  );
};

export default AppWrapper;
