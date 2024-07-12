import React, { useState } from 'react'
import'./Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExpoloreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownLoad from '../../components/AppDownLoad/AppDownLoad'

const Home = () => {

  const [category, setCategory] = useState('All')

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}  />
      <FoodDisplay category={category} />
      <AppDownLoad/>
    </div>
  )
}

export default Home
