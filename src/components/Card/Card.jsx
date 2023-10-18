import React from 'react';
import styles from './Card.module.scss';

function Card() {


  return (
    <div className="card">
        <img width={133} height={122} src="/img/sneakers/1.jpg" alt="sneakers" />
        <h5>Мужские кросовки модель кукуха</h5>
        <div className='d-flex justify-between align-center'>
          <div className='d-flex flex-column'>
          <span>Цена:</span>
          <b>120 euro</b>
          <button className='button'>
            <img width={11} height={11} src="/img/plus.svg" alt="plus" />
          </button>
          </div>
        </div>
      </div>
  );
}

export default Card;
