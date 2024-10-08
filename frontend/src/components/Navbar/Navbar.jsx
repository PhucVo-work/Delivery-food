import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { RiLoginCircleFill } from "react-icons/ri";
import { FaBagShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { BsQrCodeScan } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";
// làm active khi bấm vào item nào trong navbar thì item phải được active
const Navbar = ({ setShowLogin }) => {
  const [hasShadow, setHasShadow] = useState(false);
  const { getTotalCartAmount, menu, setMenu, token, setToken, clearProductLocalStorage } = useContext(StoreContext);

  const navigate = useNavigate();
  const logout =  () => {
    localStorage.removeItem("token");
    setToken("");
    clearProductLocalStorage();
    navigate("/")
  }

  const handleScroll = () => {
    if (window.scrollY > 82) {
      setHasShadow(true);
    } else {
      setHasShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigate = (menu) => {
    setMenu(`${menu}`)
    clearProductLocalStorage();
  }

  return (
    <div className={`container ${hasShadow ? "shadow" : ""}`}>
      <div className="navbar">
        <Link to="/" onClick={() => handleNavigate("home")}>
          <img src={assets.logo} alt="" className="logo" />
        </Link>
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => handleNavigate("home")}
            className={menu === "home" ? "active" : ""}
          >
            Trang chủ
          </Link>
          {["home", "menu", "mobile-app", "contact-us"].includes(menu) && (
            <>
              <a
                href="#explore-menu"
                onClick={() => handleNavigate("menu")}
                className={menu === "menu" ? "active" : ""}
              >
                Thực đơn
              </a>
              <a
                href="#app-download"
                onClick={() => handleNavigate("mobile-app")}
                className={menu === "mobile-app" ? "active" : ""}
              >
                Mobile-app
              </a>
              <a
                href="#footer"
                onClick={() => handleNavigate("contact-us")}
                className={menu === "contact-us" ? "active" : ""}
              >
                Liên hệ
              </a>
            </>
          )}
        </ul>
        <div className="navbar-right">
          <div className="header-qr">
            <BsQrCodeScan className="Icon-30 qr-icon" />
            <div className="qr-des">
              <img src={assets.qrcode} className="img-qr" alt="" />
              <p className="header-qr-text">Quét mã để nhận thưởng</p>
            </div>
          </div>
          {/* xử lý font awesomeIcon khi active basket thì đổi màu cần phải link trực tiếp*/}
          <div className="navbar-search-icon">
            <Link to="/cart" onClick={() => handleNavigate("Cart")}>
              <FaBagShopping
                className={
                  menu === "Cart"
                    ? "Icon-30 basket-icon clicked"
                    : "Icon-30 basket-icon"
                }
              />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>
              Đăng nhập
              <RiLoginCircleFill className="login-icon" />
            </button>
          ) : (
            <div className="navbar-profile">
              <FaUserCircle className="icon-user" />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}>
                  <FiShoppingBag className="icon"/>
                  <p className="nav-profileLink">Đơn của bạn</p>
                </li>
                <span />
                <li>
                  <VscSignOut className="icon" />
                  <p className="nav-profileLink" onClick={()=>logout()}>Đăng xuất</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
