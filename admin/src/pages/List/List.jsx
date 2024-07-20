import React, { useCallback, useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Lỗi");
    }
  };

  const removeFood = async (foodId) => {
    console.log(foodId);
    const response = await axios.post(`${url}/api/food/remove`, {id:foodId})
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error("Lỗi không xóa được món ăn")
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p className="header-list" >Danh sách tất cả món ăn</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Ảnh</p>
          <p>Tên</p>
          <p>Loại</p>
          <p>Thời gian nấu</p>
          <p>Khẩu phần</p>
          <p>Giá</p>
          <p>Thao tác</p>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.time}</p>
              <p>{item.amount}</p>
              <p>{item.price}.000₫</p>
              <div>
                <RiDeleteBin6Line onClick={() => removeFood(item._id)} className="delete-icon icon" />
                <LiaUserEditSolid className="edit-icon icon" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
