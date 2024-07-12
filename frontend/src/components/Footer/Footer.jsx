import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { FaMapLocation, FaPhone, FaBuildingShield} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
const Footer = () => {
  return (
    <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Với sứ mệnh mang lại trải nghiệm giao đồ ăn nhanh chóng, chất lượng và tiện lợi, trang web của chúng tôi cung cấp đa dạng các món ăn từ nhiều nhà hàng nổi tiếng. Khách hàng có thể dễ dàng đặt món qua giao diện thân thiện và bảo mật. Chúng tôi cam kết mang đến dịch vụ xuất sắc và luôn đảm bảo hài lòng tuyệt đối.</p>
            </div>
            <div className="footer-content-right">
                <h2>Liên lạc</h2>
                <ul className='contact-list'>
                    <li className='contact-item'>
                        <FaPhone className='icon'  alt="" />
                        +767-742-630
                    </li>
                    <li className='contact-item'>
                        <MdEmail className='icon'  alt="" />
                        contact@tomato.com
                    </li>
                </ul>
                <div className="footer-social-icon">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Thông tin</h2>
                <ul className='contact-list' >
                    <li className='contact-item' >
                        <FaMapLocation className='icon'/>
                        613 Âu cơ, Phú Trung, Tân Phú, TP. Hồ Chí Minh
                    </li>
                    <li className='contact-item' >
                        <FaBuildingShield className='icon'/>
                        Chính sách của chúng tôi
                    </li>
                </ul>
                <div className='delivery'>
                    <h2>Đơn vị vận chuyển</h2>
                    <ul className='list-delivery'>
                        <img src={assets.baemin} alt="" className="delivery-png" />
                        <img src={assets.gojeck} alt="" className="delivery-png" />
                        <img src={assets.grab} alt="" className="delivery-png" />
                        <img src={assets.be} alt="" className="delivery-png" />
                    </ul>
                </div>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 © Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
