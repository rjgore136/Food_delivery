import React, { useEffect, useState } from "react";
import "./List.css";
import { toast } from "react-toastify";
import axios from "axios";

const List = () => {
  const url = "http://localhost:5000";
  const [list, setList] = useState([]);

  //fetch function
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Failed to fetch food items!!");
    }
  };

  //remove fuction
  const removeItem = async (foodId) =>{
    // console.log(foodId);
    const response = await axios.post(`${url}/api/food/del`,{id:foodId});
    console.log(response.data);
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }

  }

  useEffect(() => {
    fetchList();
    // console.log(list);
  }, []);
  return <div className="list add flex-col">
    <p>All food item's list</p>  
    <div className="list-table">
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {list.map((item,index)=>{
        return (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/`+item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p className="cursor" onClick={()=>removeItem(item._id)}>x</p>
          </div>
        )
      })}
    </div>
  </div>;
};

export default List;
