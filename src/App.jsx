import { useState } from 'react'
import './App.scss'
import Card from './components/Card/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="wrapper clear">
    <header className='d-flex justify-between align-center p-40 '>
      <div className="d-flex align-center">
      <img width={40} height={40} src="/img/logo.png" alt="" />
      <div className='headerInfo'>
      <h3 className='text-uppercase'>React Sneakers</h3> 
      <p>Магазин лучших кросовок</p>
      </div>
      </div>
      <ul className='headerRight'>
        <li className='mr-30'>
          <img width={18} height={18} src="/img/user.svg" alt="" />
          <span>120 euro</span>
        </li>
        <li>
          <img width={18} height={18} src="/img/cart.svg" alt="" />
        </li>
      </ul>
    </header>
    <div className="content p-40">
      <h1 className='mb-40'>все кроссовки</h1> 
      <div className="search-block">
        <img src="img/search.svg" alt="Search" />
        <input type="text" placeholder='Search' />
      </div>
<div className='d-flex'>
     <Card/>
     <Card/>
     <Card/>
     <Card/> 
     <Card/>

</div>
    </div>
    </div>
    </>
  )
}

export default App
