import { useState, useEffect } from 'react'
import '../App.scss'
import '../index.scss'
import axios from 'axios'
import Card from '../components/Card/Card'
import Header from '../components/Header'
import Drawer from '../components/Drawer/Drawer'
const API_URL = 'http://localhost:5005/api'



function Favourites () {
  const [items, setItems] = useState([])
  const [cartitems, setCartItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [favItems, setFavItems] = useState([])
  
  
  // const [isAdded, setIsAdded] = useState(false);

  function loadFromBackFav (){
    axios.get(`${API_URL}/favourites`).then((res) => {
      
      setFavItems(res.data)
    
    });
    axios.get(`${API_URL}/drawer`).then((res) => {
      setCartItems(res.data)
      console.log(cartitems, 'check')
    })
    
  }

  function handleAddedtoCart(obj) {
    axios.post(`${API_URL}/drawer/addToDrawer`, obj) 
    setCartItems([...cartitems, obj])

    }
  
    // function handleAddedtoFav(obj){
    //   axios.post(`${API_URL}/favourites/addToFav`, obj)
    //   setFavItems([...favItems, obj])
    //   console.log('aded', favItems)
    // }

  function onDeleteFronCart (itemToRemove) {
    console.log(itemToRemove)
    axios.delete(`${API_URL}/drawer/${itemToRemove}`) 
   let  updatedItems = cartitems.filter(item => item._id !== itemToRemove);
   setCartItems(updatedItems)
    console.log(cartitems)
    }

    const handleAddedtoFav = async (obj) => {
      
     
       axios.delete(`${API_URL}/favourites/${obj._id}`) 
      
        let  updatedItems = favItems.filter(item => item._id !== obj._id);
          setFavItems(updatedItems)
      }
     
    

  useEffect(() => {
    loadFromBackFav ()

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

   

<div className='d-flex flex-wrap'>
  {favItems
  .map((el) => (
     
      <Card key={el._id}
      id={el._id}
      title={el.title} 
      price={el.price} 
      imageUrl={el.imageUrl}
      addtoTheCart={(el)=>  handleAddedtoCart(el)}
      onFavorite = {() => handleAddedtoFav(el)}
      favorited = {true}
      />
      
    ))
  }
    

</div>
    </div>
    
    </>
  )
}

export default Favourites
