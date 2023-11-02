import styles from './Drawer.module.scss'

function Drawer({onCloseCart, items = [], onDeleteFromCart,  onDelete}) {



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
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onDelete(obj._id)}
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
            //   disabled={isLoading} onClick={onClickOrder}
               className="greenButton">
                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : 
            <>
            <p>Корзина пуста</p>
            <img src="img/empty-cart.jpg" alt="" />
             </>

         
        //   <Info
        //     title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
        //     description={
        //       isOrderComplete
        //         ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
        //         : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
        //     }
        //     image={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
        //   />
        
        }
              </div>
            </div>
        </div>
    );
}

export default Drawer;
