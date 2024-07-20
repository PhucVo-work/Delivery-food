import React from "react";
import { createContext } from "react";
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  return (
    <StoreContext.Provider value={{}}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
