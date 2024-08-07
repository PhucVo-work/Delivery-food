import React, { useCallback, useEffect, useState, useContext } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { StoreContext } from "../../context/StoreContext";
import Swal from "sweetalert2";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

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

  const confirmDelete = (foodId) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Bạn sẽ không thể khôi phục lại món ăn này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, xóa nó!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFood(foodId);
      }
    });
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Lỗi không xóa được món ăn");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    tippy(".edit-icon", {
      content: "Sửa",
      animation: "fade",
      duration: [400, 100],
    });
    tippy(".delete-icon", {
      content: "Xóa",
      animation: "fade",
      duration: [400, 100],
    });
  }, [list]);

  const { updateAction } = useContext(StoreContext);

  return (
    <div className="list add flex-col">
      <p className="header-list">Danh sách tất cả món ăn</p>
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
              <div className="icon-container">
                <LiaUserEditSolid
                  onClick={() => updateAction(item)}
                  className="edit-icon icon"
                />
                <RiDeleteBin6Line
                  onClick={() => confirmDelete(item._id)}
                  className="delete-icon icon"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
