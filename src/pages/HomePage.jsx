import { useState, useEffect } from 'react'
import '../App.scss'
import '../index.scss'
import axios from 'axios'
import Card from '../components/Card/Card'
import Header from '../components/Header'
import Drawer from '../components/Drawer/Drawer'
const API_URL = 'http://localhost:5005/api'



function HomePage() {
  const [items, setItems] = useState([])
  const [cartitems, setCartItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [favItems, setFavItems] = useState([])

   const [isAdded, setIsAdded] = useState(false);

  function loadFromBack (){
    axios.get(`${API_URL}/items`).then((res) => {
      
      setItems(res.data)
    
    });
    axios.get(`${API_URL}/drawer`).then((res) => {
      setCartItems(res.data)
      console.log(cartitems, 'check0')
    })
    
  }

  const handleAddedtoCart = async (obj) => {
    try {
      if (cartitems.find((item) => item.item === obj._id)) {
        // Если элемент уже есть в корзине, удаляем его
        const deletedItem = cartitems.find((item) => item.item === obj._id);
        const response = await axios.delete(`${API_URL}/drawer/${deletedItem._id}`);
        if (response.status === 204) {
          setCartItems((prev) => prev.filter((item) => item.item !== obj._id));
          console.log("Item successfully deleted from cart");
        } else {
          console.error("Failed to delete item from cart");
        }
      } else {
        // Если элемент отсутствует в корзине, добавляем его
        const newItem = { ...obj, item: obj._id };
        const response = await axios.post(`${API_URL}/drawer/addToDrawer`, newItem);
        if (response.status === 200) {
          setCartItems([...cartitems, newItem]);
          console.log("Item successfully added to cart");
        } else {
          console.error("Failed to add item to cart");
        }
      }
    } catch (error) {
      console.error("Error while handling the action", error);
      alert("Не удалось обработать действие");
    }
  };
  
 
    const handleAddedtoFav = async (obj) => {
      try {
        if(favItems.find(item=> 
          item.item === obj._id ))
       { favItems.find((item)=> {
         item.item === obj._id 
        axios.delete(`${API_URL}/favourites/${item._id}`) 
       })
 
         let  updatedItems = favItems.filter(item => item.item !== obj._id);
           setFavItems(updatedItems)
       }
       else {
         const newItem = {...obj, item: obj._id};
         const {data} = await axios.post(`${API_URL}/favourites/addToFav`, newItem)
        setFavItems([...favItems, data])
       }  
      }

      catch (error) {
        alert  ('Не удалось добавить в фавориты')
      }

      
    }

  function onDeleteFronCart (itemToRemove) {
    console.log(itemToRemove)
    axios.delete(`${API_URL}/drawer/${itemToRemove}`) 
   let  updatedItems = cartitems.filter(item => item._id !== itemToRemove);
   setCartItems(updatedItems)
    console.log(cartitems)
    }


  function onSearch (e) {
    setSearchValue(e.target.value)
  }


  useEffect(() => {
    loadFromBack ()
    console.log(items)
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
     
      <Card key={el._id}
      id={el._id}
      title={el.title} 
      price={el.price} 
      imageUrl={el.imageUrl}
      addtoTheCart={()=>  handleAddedtoCart(el)}
      onFavorite = {() => handleAddedtoFav(el)}

      
      />
      
    ))
  }
    

</div>
    </div>
    </div>
    </>
  )
}

export default HomePage
