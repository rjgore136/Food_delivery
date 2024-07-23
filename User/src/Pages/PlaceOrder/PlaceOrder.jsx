import React, { useCallback, useContext, useEffect, useState } from "react";
import "./placeorder.css";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getCartTotalAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getCartTotalAmount() + 2,
    };
    let response = await axios.post(`${url}/order/place`, orderData, {
      headers: { token },
    });
    console.log(response.data);
    if (response.data.success) {
      const { orderId } = response.data;
      const options = {
        key: "rzp_test_aK0W4s9q5BHdVb", // Replace with your Razorpay key ID
        amount: (getCartTotalAmount() + 2) * 100 * 56.27, // Amount in paise
        currency: "INR",
        name: "FoodDel",
        description: "Test Transaction",
        order_id: orderId,
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },
        notes: {
          address: `${data.street}, ${data.city}, ${data.state}, ${data.zipCode}, ${data.country}`,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.log(response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={placeOrder} method="post" className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First Name"
            />
            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last Name"
            />
          </div>
          <input
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email address"
          />
          <input
            required
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
          />
          <div className="multi-fields">
            <input
              required
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
            />
            <input
              required
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
            />
          </div>
          <div className="multi-fields">
            <input
              required
              name="zipCode"
              onChange={onChangeHandler}
              value={data.zipCode}
              type="text"
              placeholder="Zip-code"
            />
            <input
              required
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="phone"
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getCartTotalAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getCartTotalAmount() + 2}</b>
              </div>
              <hr />
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (
      document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      )
    ) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default PlaceOrder;
