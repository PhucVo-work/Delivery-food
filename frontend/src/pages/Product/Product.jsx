import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Breadcrums from "../../components/Breadcrums/Breadcrums";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import DetailProduct from "../../components/DetailProduct/DetailProduct";
import "./Product.css";

const Product = () => {
  const { food_list } = useContext(StoreContext);
  const { id } = useParams();
  const location = useLocation();
  const [currentProductId, setCurrentProductId] = useState(null);

  const productFromList = food_list.find((e) => e._id === id);
  const storedProduct = localStorage.getItem(`product_${id}`);
  const product = storedProduct ? JSON.parse(storedProduct) : productFromList;

  useEffect(() => {
    // Lưu sản phẩm hiện tại vào localStorage
    if (product) {
      localStorage.setItem(`product_${id}`, JSON.stringify(product));
      setCurrentProductId(id);
    }

    // Xóa dữ liệu cũ khi `id` thay đổi hoặc khi người dùng rời khỏi trang
    return () => {
      if (currentProductId && currentProductId !== id) {
        localStorage.removeItem(`product_${currentProductId}`);
      }
    };
  }, [id, product, currentProductId, location]);

  useEffect(() => {
    // Xóa dữ liệu khi URL thay đổi
    const handleLocationChange = () => {
      if (currentProductId && currentProductId !== id) {
        localStorage.removeItem(`product_${currentProductId}`);
      }
    };

    // Theo dõi sự thay đổi của location
    handleLocationChange();
  }, [location, currentProductId, id]);

  return (
    <div>
      <Breadcrums product={product} />
      <DetailProduct product={product} />
      <FoodDisplay category={product.category} />
    </div>
  );
};

export default Product;
