import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import AddFood from "../../components/AddFood/AddFood";

const Add = ({url}) => {
  return (
    <AddFood url={url} />
  )
};

export default Add;
