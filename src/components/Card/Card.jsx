import { useState } from 'react';
import styles from './Card.module.scss';
console.log(styles)

function Card(props) {
  const [isAdded, setIsAdded] = useState(false);

function addtoTheCart(){
setIsAdded(!isAdded)
}

  return (
    <div className={styles.card}>
      <div className={styles.favorites}>
        <img src="/img/unliked.svg" alt="Unliked" onClick={props.onFavorite} />
      </div>
        <img width={133} height={122} src={props.imageUrl} alt="sneakers" />
        <h5>М{props.title}</h5>
        <div className='d-flex justify-between align-center'>
          <div className='d-flex flex-column'>
          <span>Цена:</span>
          <b>{props.price}</b>  
          </div>
          <img className={styles.plus} onClick={addtoTheCart} 
            src={isAdded ? "/img/btn-checked.svg": "/img/btn-plus.svg"} alt="plus" />
        </div>
      </div>
  );
}

export default Card;
