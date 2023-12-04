import { useState } from "react";
import Info from "../Info"; 
import styles from './Drawer.module.scss';
import { useContext } from "react";
import { AppContext } from "../AppProvider"
import axios from 'axios';
const API_URL = 'http://localhost:5005/api'

function Drawer({onCloseCart, items = [], onDeleteFromCart,  onDelete}) {

const {cartitems, setCartItems} = useContext(AppContext);
const [orderIsCompleted, setOrder] = useState(false);

const [orderId, setOrderid] = useState(null);

const onClickOrder = async () => {
  try {
    const {data} = await axios.post(`${API_URL}/orders/addTheOrder`, {items: cartitems})
    setOrder(true)
    console.log(cartitems, 'check1')
    await axios.put(`${API_URL}/drawer/clearDrawer`)
    console.log('Drawer cleared successfully:');
    setOrderid(data._id)

    setCartItems([])
  }
  catch (error) {
    alert ('Нихрена не работает, идиот! заказ не проходит')
  }
}


    return (
        <div  className={styles.overlay}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">
                    Корзина <img onClick={onCloseCart} className="cu-p" src="/img/btn-remove.svg" alt="Remove" />
                </h2>

                <div className="items">
                    
                {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div key={obj._id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  {/* {console.log(obj)} */}
                  <img
                    onClick={() => onDelete(obj)}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  {/* <b>{totalPrice} руб. </b> */}
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  {/* <b>{(totalPrice / 100) * 5} руб. </b> */}
                </li>
              </ul>
              <button 
            //   disabled={isLoading}
             onClick={onClickOrder}
               className="greenButton">
                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : 
            <>
          <p>Корзина пуста</p>
           
          <Info
           title={orderIsCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
         description={
          orderIsCompleted
             ? `Ваш заказ  скоро будет передан курьерской доставке`
               : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
           }
         image={orderIsCompleted ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
          />
        
             </>
          /* <Info title='Корзина пуста' description='Добавить товар' image='img/empty-cart.jpg'/> */
         
        //   <Info
        //     title={orderIsCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
        //     description={
        //       orderIsCompleted
        //         ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
        //         : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
        //     }
        //     image=orderIsCompleted ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
        //   />
        
        }
              </div>
            </div>
        </div>
    );
}

export default Drawer;
