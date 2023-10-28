import styles from './Drawer.module.scss'

function Drawer({onCloseCart, items = [], onDeleteFromCart}) {



    return (
        <div  className={styles.overlay}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">
                    Корзина <img onClick={onCloseCart} className="cu-p" src="/img/btn-remove.svg" alt="Remove" />
                </h2>

                <div className="items">
                    
                  
                 {items.map((el) => {
                 return (

                    <div key={el.id} className="cartItem d-flex align-center mb-20">
                    <div 
                        style={{ backgroundImage: `url(${el.imageUrl})` }}
                        className="cartItemImg"></div>

                    <div className="mr-20 flex">
                        <p className="mb-5">{el.title}</p>
                        <b>{el.price}</b>
                 </div>
                 <img className="removeBtn" onClick={()=>onDeleteFromCart(el.id)}
                 src="/img/btn-remove.svg" alt="Remove" />
             </div>
                )

                })} 
                </div>

                <div className="cartTotalBlock">
                    <ul>
                        <li>
                            <span>Итого:</span>
                            <div></div>
                            <b>21 498 руб. </b>
                        </li>
                        <li>
                            <span>Налог 5%:</span>
                            <div></div>
                            <b>1074 руб. </b>
                        </li>
                    </ul>
                    <button className="greenButton">
                        Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Drawer;
