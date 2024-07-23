import { createContext, useEffect, useState } from "react";
import axios from "axios";
// import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:5000/api";
  const [token,setToken] = useState("");
  const [food_list,setFoodList] = useState([]);

  //fetches data from db and stores it in food_list state
  async function fetchData(){
    try {
      const response = await axios.get(`${url}/food/list`);
      console.log(response.data.data);
      setFoodList(response.data.data);
    } catch (error) {
      console.log(error);
    }
   }

  //function to get cartData stored in db
   const getCartItems = async(token) =>{
    const response = await axios.get(`${url}/cart/get`,{headers:{token}});
    console.log(response.data);
    setCartItems(response.data.cartData);
  }

  //saving the token which is stored in localstorage to the state variable ,so that it will not logout until the token is removed from localstorage.
  //also calling fetchData asynchronously 
  useEffect(()=>{
    async function loadData(){
      await fetchData();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await getCartItems(localStorage.getItem("token"));
      }
    } 
    loadData();
  },[])


  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(`${url}/cart/add`,{itemId},{headers:{token}});
    }
  };

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]); 

  const getCartTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
 
  const removeFromCart = async(itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(`${url}/cart/remove`,{itemId},{headers:{token}});
    }
  };



  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getCartTotalAmount,
    url,
    token,
    setToken
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
 