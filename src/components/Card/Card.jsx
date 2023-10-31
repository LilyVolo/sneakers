import { useState } from 'react';
import styles from './Card.module.scss';


function Card({title, imageUrl, price, addtoTheCart, id, onFavorite}) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

function putToTheCart(){
  addtoTheCart({title, imageUrl, price, id})
setIsAdded(!isAdded)
}
function onFavorite () {
  setIsFavorite(!isFavorite)
}
  return (
    <div className={styles.card}>
      <div className={styles.favorites}>
        <img className={styles.plus} 
        src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} 
        alt="Unliked" 
        onClick={onFavorite} />

      </div>
        <img width={133} height={122} src={imageUrl} alt="sneakers" />
        <h5>{title}</h5>
        <div className='d-flex justify-between align-center'>
          <div className='d-flex flex-column'>
          <span>Цена:</span>
          <b>{price}</b>  
          </div>
          <img className={styles.plus} onClick={putToTheCart} 
            src={isAdded ? "/img/btn-checked.svg": "/img/btn-plus.svg"} alt="plus" />
        </div>
      </div>
  );
}

export default Card;
