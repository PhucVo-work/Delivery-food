import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    window.history.scrollRestoration = 'manual'; // Đảm bảo không cuộn lại vị trí cũ
    // Đặt vị trí trang ở đầu mỗi khi đường dẫn thay đổi
    // document.documentElement.scrollTop = 0; // Đối với tất cả các trình duyệt
    // document.body.scrollTop = 0; // Đối với Safari
  }, [pathname]);

  return children;
};

export default ScrollToTop;