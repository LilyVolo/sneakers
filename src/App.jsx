import { useState } from 'react'

import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="wrapper">
    <header>
      <div className="headerLeft">
      <img src="/img/logo.png" alt="" />
      <div className='headerInfo'>
      <h3>React Sneakers</h3>
      <p>Магазин лучших кросовок</p>
      </div>
      </div>
      <ul className='headerRight'>
        <li>
          <svg/>
          <span>120 euro</span>
        </li>
      </ul>
    </header>
    <div className="content">
      <h1>все кроссовки</h1>
    </div>
    </div>
    </>
  )
}

export default App
