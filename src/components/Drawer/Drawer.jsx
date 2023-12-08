import Info from "../Info"; 
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../AppProvider"
import axios from 'axios';

const API_URL = 'http://localhost:5005/api'
import styles from './Drawer.module.scss';

function Drawer({onCloseCart, items = [], onDeleteFromCart,  onDelete}) {

const {cartitems, setCartItems} = useContext(AppContext);
const [orderIsCompleted, setOrder] = useState(false);

const [orderId, setOrderid] = useState(null);
const { cartOpened, setCartOpened } = useContext(AppContext);
  
const total = cartitems.reduce((sum, obj) => obj.price + sum, 0)

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
    alert ('error with order')
  }
}


    return (
        <div  className={`${styles.overlay} ${cartOpened ? styles.overlayVisible: ''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">
                    Basket <img onClick={onCloseCart} className="cu-p" src="/img/btn-remove.svg" alt="Remove" />
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
                    <b>{obj.price} euros.</b>
                  </div>
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
                  <span> Total: {total} euros </span>
                  <div></div>
           
                </li>
               
              </ul>
              <button 
    
             onClick={onClickOrder}
               className="greenButton">
                Place an order <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : 
            <>
          <p>Cart is empty</p>
           
          <Info
           title={orderIsCompleted ? 'Order placed!' : 'Cart is empty'}
         description={
          orderIsCompleted
          ? `Your order will be delivered soon by our courier service.`
          : 'Add at least one pair of sneakers to place an order.'
           }
         image={orderIsCompleted ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
          />
        
             </>
       
        }
              </div>
            </div>
        </div>
    );
}

export default Drawer;
