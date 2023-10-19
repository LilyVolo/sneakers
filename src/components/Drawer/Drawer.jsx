import React from 'react';

import styles from './Drawer.module.scss';



function Drawer() {

  return (
  <div>
 <div className={styles.overlay}>
  <div className={styles.drawer}>
    <h2 className="d-flex justify-between mb-30">
          Корзина <img  className="cu-p" src="img/btn-remove.svg" alt="Close" />
        </h2>

   
              <button className="greenButton">
               Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
            </button>
            </div>
         </div>
      
  </div>

      
  );
}

export default Drawer;
