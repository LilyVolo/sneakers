import React from 'react';
import styles from './Card.module.scss';

function Card(props) {
function addtoTheCart(){
alert('aka')
}

  return (
    <div className="card">
        <img width={133} height={122} src={props.imageUrl} alt="sneakers" />
        <h5>М{props.title}</h5>
        <div className='d-flex justify-between align-center'>
          <div className='d-flex flex-column'>
          <span>Цена:</span>
          <b>{props.price}</b>
  
          <button className='button'onClick={addtoTheCart}>
            <img width={11} height={11} src="/img/plus.svg" alt="plus" />
          </button>
          </div>
        </div>
      </div>
  );
}

export default Card;
