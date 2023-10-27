import { useState, useEffect } from 'react'
import './App.scss'
import Card from './components/Card/Card'
import Header from './components/Header'
import Drawer from './components/Drawer/Drawer'


function App() {
  const [items, setItems] = useState([])
  const [cartitems, setCartItems] = useState([{
    "title": "Мужские кросовки найк Vop", 
    "price": 100,
    "imageUrl": "/img/sneakers/9.jpg"
  }
  ])
  const [cartOpened, setCartOpened] = useState(false)

  function loadFromBack (){
    fetch ('https://65397c28e3b530c8d9e872ae.mockapi.io/items')
    .then((res) => {
      return res.json();
    })
    .then ((json) => {
      setItems(json )
    })
  }

  useEffect(() => {
    loadFromBack ()
  }, []);

  return (
    <>
    <div className="wrapper clear">
   <Header onClickCart={()=> setCartOpened(true)}/>
   {cartOpened ? <Drawer items={cartitems} onCloseCart={()=>setCartOpened(false)}/> : null}

    <div className="content p-40">
      <h1 className='mb-40'>все кроссовки</h1> 
      <div className="search-block">
        <img src="img/search.svg" alt="Search" />
        <input type="text" placeholder='Search' />
      </div>

<div className='d-flex flex-wrap'>
  { 
    items.map((el) => (
      <Card 
      title={el.title} 
      price={el.price} 
      imageUrl={el.imageUrl}
      // addtoTheCart={()=> console.log('Добавили в закладки')}
      // onFavorite = {() => console.log ('Нажали плюс')}
      />
      
    ))
  }
    

</div>
    </div>
    </div>
    </>
  )
}

export default App
