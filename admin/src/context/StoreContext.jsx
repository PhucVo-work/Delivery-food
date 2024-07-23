import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [IsUpdate, setIsUpdate] = useState(false);
  const [productData, setProductData] = useState({});
  const navigate = useNavigate();

  const unIsUpdate = () => {
    setProductData({});
    setIsUpdate(false);
  }

  const backToList = () => {
    unIsUpdate();
    navigate("/List");
  };

  const updateAction = (product) => {
    setProductData(product)
    setIsUpdate(true)
    navigate('/update')
  }

  const contextValue = {
    unIsUpdate,
    IsUpdate,
    setIsUpdate,
    backToList,
    productData,
    updateAction
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
