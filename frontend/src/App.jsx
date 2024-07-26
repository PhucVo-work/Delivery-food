import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Product from './pages/Product/Product'
import ScrollToTop from './components/ScrollToTop'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <div>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
        <Navbar setShowLogin={setShowLogin} />

        <div className='app'>
            <ScrollToTop>
              <Routes>
                < Route path='/' element={<Home/>} />
                < Route path='/cart' element={<Cart/>} />
                < Route path='/order' element={<PlaceOrder/>} />
                < Route path='/product' element={<Product/>}>
                  < Route path=':id' element={<Product/>}/>
                </Route>
                <Route path='/verify' element={<Verify/>}/>
                <Route path='/myorders' element={<MyOrders/>}/>  
              </Routes>
            </ScrollToTop>
        </div>
        
      <Footer/>
    </div>
  )
}

export default App
