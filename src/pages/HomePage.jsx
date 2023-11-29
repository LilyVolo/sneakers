import { useState, useEffect } from 'react'
import '../App.scss'
import '../index.scss'
import axios from 'axios'
import Card from '../components/Card/Card'
import Header from '../components/Header'
import Drawer from '../components/Drawer/Drawer'
const API_URL = 'http://localhost:5005/api'

// S

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
    
    })
    // So what is going on ?) Ok i will be back
  }

  const handleAddedtoCart = async (obj) => {
    try {
      // console.log( cartitems,  obj._id,  'first')
      const existingCartItem = cartitems.find((item) => item.item === obj._id);
      if (existingCartItem) {
        console.log( cartitems, 'check del')
        // Если элемент уже есть в корзине, удаляем его по полю "item"
        axios.delete(`${API_URL}/drawer`, { data: { item: obj._id } }).then(() => {
          console.log("Item successfully deleted from cart");
          setCartItems((prev) => prev.filter((item) => item.item !== obj._id));
        });
      } else {
        // Если элемент отсутствует в корзине, добавляем его
        const newItem = { ...obj, item: obj._id };
        axios.post(`${API_URL}/drawer/addToDrawer`, newItem).then(() => {
          console.log("Item successfully added to cart");
          setCartItems([...cartitems, newItem]);
        });
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

  const onDeleteFronCart = async (obj) =>  {
    try {
      const existingCartItem = cartitems.find((item) => item.item === obj._id);
      console.log(existingCartItem, 'v del prov exist');
      if (existingCartItem) {
        // Если элемент уже есть в корзине, удаляем его по полю "item"
        axios.delete(`${API_URL}/drawer`, { data: { item: obj._id } }).then(() => {
          console.log("Item successfully deleted from cart");
          setCartItems((prev) => prev.filter((item) => item.item !== obj._id));
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


  function onSearch (e) {
    setSearchValue(e.target.value)
  }


  useEffect(() =>  {
    async function fetchData() {
      
      const {data} = await axios.get(`${API_URL}/items`);
      const datDrawer = await axios.get(`${API_URL}/drawer`).then(res => {return res.data});
  
      const datFav = await axios.get(`${API_URL}/favourites`).then(res => {return res.data});
      
      setItems(data);
      setCartItems(datDrawer);
      setFavItems(datFav);
    }
    fetchData();
    // loadFromBack ()

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
      loading={false}
      
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
