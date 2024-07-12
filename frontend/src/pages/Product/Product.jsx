import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useParams } from 'react-router-dom'
import Breadcrums from '../../components/Breadcrums/Breadcrums'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import DetailProduct from '../../components/DetailProduct/DetailProduct'
import './Product.css'

const Product = () => {
    const { food_list, cartItems } = useContext(StoreContext)
    const { id } = useParams();
    const product = food_list.find((e) => e._id === id)
    console.log(product);
  return (
    <div>
      <Breadcrums product={product} />
      <DetailProduct product={product} />
      <FoodDisplay category={product.category}  />
    </div>
  )
}

export default Product
