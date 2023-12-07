import React from 'react';
import axios from 'axios';
import Card from '../components/Card/Card';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
const API_URL = 'http://localhost:5005/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



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
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои заказы</h1>
        </div>

        <div className="d-flex flex-wrap">
          {isLoading
            ? [...Array(8)]
            : orders.map((order, orderIndex) => (
                <div key={orderIndex} className="order-container">
                  <h2>Заказ №{orderIndex + 1}</h2>
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
                    <p>Нет товаров в этом заказе</p>
                  )}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;