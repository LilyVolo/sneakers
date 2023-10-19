import { useState } from 'react'
import './App.scss'
import Card from './components/Card/Card'
import Header from './components/Header'
import Drawer from './components/Drawer/Drawer'
const arr = [
{
  title: "Мужские кросовки найк Блэйзер", 
  price: 120,
  imageUrl: '/img/sneakers/1.jpg'
},
{
  title: "Мужские кросовки найк Эйер", 
  price: 155,
  imageUrl: '/img/sneakers/2.jpg'
},
{
  title: "Мужские кросовки найк Kaka", 
  price: 77,
  imageUrl: '/img/sneakers/3.jpg'
},
{
  title: "Мужские кросовки найк Vop", 
  price: 100,
  imageUrl: '/img/sneakers/4.jpg'
},
]
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="wrapper clear">
   <Header/>
   <Drawer/>

    <div className="content p-40">
      <h1 className='mb-40'>все кроссовки</h1> 
      <div className="search-block">
        <img src="img/search.svg" alt="Search" />
        <input type="text" placeholder='Search' />
      </div>

<div className='d-flex'>
  {
    arr.map((el) => (
      <Card title={el.title} price={el.price} imageUrl={el.imageUrl}/>
    ))
  }
    

</div>
    </div>
    </div>
    </>
  )
}

export default App
