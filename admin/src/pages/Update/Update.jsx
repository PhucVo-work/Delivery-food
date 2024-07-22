import React from "react";
import AddFood from "../../components/AddFood/AddFood";
import "./Update.css";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";

const Update = ({ url }) => {
  const { productData } = useContext(StoreContext);
  console.log(productData);
  return <AddFood product={productData} url={url}/>;
};

export default Update;
