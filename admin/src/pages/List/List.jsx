import React, { useCallback, useEffect, useState,  useContext} from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import {  useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const List = ({ url }) => {
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

  const navigate = useNavigate();
  const { updateAction } = useContext(StoreContext)

  return (
    <div className="list add flex-col">
      <p className="header-list" >Danh sách tất cả món ăn</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Ảnh</p>
          <p>Tên</p>
          <p>Loại</p>
          <p>Khẩu phần</p>
          <p>Thời gian nấu</p>
          <p>Giá</p>
          <p>Thao tác</p>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.amount}</p>
              <p>{item.time}</p>
              <p>{item.price}.000₫</p>
              <div>
                <LiaUserEditSolid onClick={() => updateAction(item)} className="edit-icon icon" />
                <RiDeleteBin6Line onClick={() => removeFood(item._id)} className="delete-icon icon" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
