import { useState, useEffect } from 'react'
import './App.scss'
import axios from 'axios'
import Card from './components/Card/Card'
import Header from './components/Header'
import Drawer from './components/Drawer/Drawer'


function App() {
  const [items, setItems] = useState([])
  const [cartitems, setCartItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')


  function loadFromBack (){
    axios.get('https://65397c28e3b530c8d9e872ae.mockapi.io/items').then((res) => {
      setItems(res.data)
    });
    axios.get('https://65397c28e3b530c8d9e872ae.mockapi.io/cart').then((res) => {
      setCartItems(res.data)
    })
    
  }

  function handleAddedtoCart(obj) {
    axios.post('https://65397c28e3b530c8d9e872ae.mockapi.io/cart', obj) 
    setCartItems([...cartitems, obj])
    }
    // const objExistsInCart = cartitems.some(item => item.id === obj.id);
    
    // if (!objExistsInCart)
    // {
    //   setCartItems([...cartitems, obj])
    
    // }
    // else {
    //   const updatedCart = cartitems.filter(el => el.id !== obj.id);
    //   setCartItems(updatedCart);
    // }
  //}
  function onDeleteFronCart (itemToRemove) {
    axios.delete(`https://65397c28e3b530c8d9e872ae.mockapi.io/cart/${itemToRemove}`) 
   let  updatedItems = cartitems.filter(item => item.id !== itemToRemove);
   setCartItems(updatedItems)
    console.log(cartitems)
    }
  

  // function handleRemove (itemToRemove)  {
  //   const updatedItems = cartitems.filter(item => item.id !== itemToRemove);
  //   setCartItems(updatedItems);
  // }

  function onSearch (e) {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    loadFromBack ()
  }, []);

  return (
    <>
    <div className="wrapper clear">
   <Header onClickCart={()=> setCartOpened(true)}/>
   {cartOpened ? <Drawer 
   items={cartitems} 
  //  onDeleteFromCart={(itemToRemove)=> handleRemove(itemToRemove)}
   onDelete={onDeleteFronCart}
   onCloseCart={()=>setCartOpened(false)}/> : null}

    <div className="content p-40 ">
      <div className='mb-40 d-flex align-center justify-between'>

      <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кросовки'}
      </h1> 
      </div>
      <div className="search-block">
        <img src="img/search.svg" alt="Search" />

        {searchValue && 
        <img
        onClick={()=> setSearchValue('')}
        className="clear cu-p" 
        src="/img/btn-remove.svg" 
        alt="Close" />}

        <input 
        onChange={onSearch}
        value={searchValue} 
        type="text" 
        placeholder='Search' />
      </div>

<div className='d-flex flex-wrap'>
  {items
  .filter((el) => el.title.toLowerCase().includes(searchValue))
  .map((el) => (
     
      <Card key={el.id}
      id={el.id}
      title={el.title} 
      price={el.price} 
      imageUrl={el.imageUrl}
      addtoTheCart={(el)=>  handleAddedtoCart(el)}
      onFavorite = {() =>  console.log(el)}
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
