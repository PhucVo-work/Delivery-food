import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
const LoginPopup = ({setShowLogin}) => {

    const [currState, setCurrState] = useState("Đăng nhập")

  return (
    <div className='login-popup'>
        <form action="" className="login-popup-container">
            {/* kiểm tra xem giá trị hiện tại là gì và hiển thị ra*/}
            <div className="login-popup-title">
                <h2>{currState}</h2>
                {/* set giá trị hiện tại false để ẩn cho nút close */}
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className="login-popup-inputs">
                {
                    currState==="Đăng nhập"
                    ? <></> 
                    : <input type='text' placeholder='Tên của bạn' required/> 
                }
                <input type="email" placeholder='Email của bạn' required />
                <input type="password" name="" id="Password" placeholder='Nhập mật khẩu' required />
            </div>

            <button>{currState==="Sign Up" ? "Tạo tài khoản" : "Đăng nhập"}</button>
             
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>Để tiếp tục, bạn phải chấp nhận các Điều khoản Dịch vụ và Chính sách Bảo mật của chúng tôi.</p>
            </div>
                {
                    currState==='Đăng nhập'
                    ?   <p>Tạo tài khoản mới? <span onClick={() => setCurrState("Đăng ký")} >Ở đây!</span></p>
                    :   <p>Đã có tài khoản? <span onClick={() => setCurrState("Đăng nhập")} >Đăng nhập!</span></p>
                }
        </form>
    </div>
  )
}

export default LoginPopup
