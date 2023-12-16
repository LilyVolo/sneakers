import React from 'react';
import axios from 'axios';
import Card from '../components/Card/Card';
import Header from '../components/Header';
import Drawer from '../components/Drawer/Drawer'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react';
const API_URL = 'https://react-sneakers-node.onrender.com/api';
import { AppContext } from "../components/AppProvider"
import { useContext } from 'react'

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderIsCompleted, setOrder] = useState(false);
  const { cartOpened, setCartOpened } = useContext(AppContext);
  const {cartitems, setCartItems} = useContext(AppContext);


  const onDeleteFronCart = async (obj) =>  {
    console.log('cartitem', cartitems)
    console.log('object1', obj)
    try {
      const existingCartItem = cartitems.find((item) => item.item === obj.item);
      console.log(existingCartItem, 'v del prov exist');
      if (existingCartItem) {
        // Если элемент уже есть в корзине, удаляем его по полю "item"
        axios.delete(`${API_URL}/drawer`, { data: { item: obj.item } }).then(() => {
          console.log("Item successfully deleted from cart");
          setCartItems((prev) => prev.filter((item) => item.item !== obj.item));
        });
      } else {
     
          console.log("Item is not there");
     
        }
      }
     catch (error) {
      console.error("Error while handling the action", error);
      alert("Не удалось обработать действие");
    }
    }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/orders`);
        setOrders(data.map((obj) => obj.items));
     
        
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);


  return (
    <div className="wrapper clear">
      <Header onClickCart={()=> setCartOpened(true)}/>
      <Drawer 
       onDelete={onDeleteFronCart}
   items={cartitems} 
   onCloseCart={()=>setCartOpened(false)}/> 
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1> My orders </h1>
        </div>

        <div className="d-flex flex-wrap">
          {isLoading
            ? [...Array(8)]
            : orders.map((order, orderIndex) => (
                <div key={orderIndex} className="order-container">
                  <h2>Order №{orderIndex + 1}</h2>
                  {orders ? (
                    order.map((item, itemIndex) => (
                      <Card
                        key={itemIndex}
                        loading={isLoading}
                        hideButtons={true}
                        {...item}
                      />
                    ))
                  ) : (
                    <p>No orders</p>
                  )}
                </div>
              ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Orders;