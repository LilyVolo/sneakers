import { useState, useEffect } from 'react'
import '../App.scss'
import '../index.scss'
import axios from 'axios'
import Card from '../components/Card/Card'
import Header from '../components/Header'
import Drawer from '../components/Drawer/Drawer'
const API_URL = 'https://react-sneakers-node.onrender.com/api';
import Footer from '../components/Footer'
import { AppContext } from "../components/AppProvider"
import { useContext } from 'react'


function Favourites () {
  const [items, setItems] = useState([])
  const {cartitems, setCartItems} = useContext(AppContext);
  const { cartOpened, setCartOpened } = useContext(AppContext);

  const [favItems, setFavItems] = useState([])
  
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


    const onDeleteFronCart = async (obj) =>  {
      console.log('cartitem', cartitems)
      console.log('object1', obj)
      try {
        const existingCartItem = cartitems.find((item) => item.item === obj.item);
        console.log(existingCartItem, 'v del prov exist');
        if (existingCartItem) {
          // Если элемент уже есть в корзине, удаляем его по полю "item"
          axios.delete(`${API_URL}/drawer`, { data: { item: obj.item } }).then(() => {
            console.log("Item successfully deleted from cart");
            setCartItems((prev) => prev.filter((item) => item.item !== obj.item));
          });
        } else {
       
            console.log("Item is not there");
       
          }
        }
       catch (error) {
        console.error("Error while handling the action", error);
        alert("Не удалось обработать действие");
      }
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
<Footer/>
    </div>
    
    </>
  )
}

export default Favourites
