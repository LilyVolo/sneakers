import { Routes, Route, Link} from "react-router-dom";
import { AppContext } from "../components/AppProvider"
import { useContext } from 'react'

function Header({onClickCart, hideButtons=false}) {

  const {cartitems, setCartItems} = useContext(AppContext);
  
  const total = cartitems.reduce((sum, obj) => obj.price + sum, 0)


  return (
    <header className='d-flex justify-between align-center p-40 '>
   
   <Link to='/'>
   <div className="d-flex align-center">
    <img  width={40} height={40} src="/img/logo.png" alt="" />
    <div className='headerInfo'>
    <h3 className='text-uppercase'>React Sneakers</h3> 
    <p>The best sneakers store</p>
    </div>
    </div>
   </Link>
    <ul className='d-flex headerRight'>
      <li  className='mr-30'>
      <Link to='/orders'>
        <img 
        width={18} height={18} src="/img/user.svg" alt="" />
        </Link>
        <span>{total}  </span>
      </li>
      <li>
        <img 
        onClick={onClickCart}
         width={18} height={18} src="/img/cart.svg" alt="" />
      </li>

      <Link to='/favourites'>
        <img width={18} height={18} src="/img/heart.svg" alt="favorits" />
      </Link>
    </ul>
  </header>
  )
}

export default Header

