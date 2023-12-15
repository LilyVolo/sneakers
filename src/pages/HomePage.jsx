import { useState, useEffect } from 'react'
import '../App.scss'
import '../index.scss'
import axios from 'axios'
import Card from '../components/Card/Card'
import Header from '../components/Header'
import Drawer from '../components/Drawer/Drawer'
import Footer from '../components/Footer'
const API_URL = 'https://react-sneakers-node.onrender.com'
import { AppContext } from "../components/AppProvider"
import { useContext } from 'react'

function HomePage() {
  const [items, setItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favItems, setFavItems] = useState([])
  const [added, setAdded] = useState(false);
  const [favorited, setIsFavorite] = useState(false);
  const [isLoading,  setLoading] = useState(true)
  const { cartOpened, setCartOpened } = useContext(AppContext);
  const {cartitems, setCartItems} = useContext(AppContext);
 


  function renderItems () {
    const filtredItems =items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
    )

   
    return ( isLoading  ? [...Array(8)]
        : filtredItems).map((el) => (
          (  
            <Card key={el?._id}
            id={el?._id}
              title={el?.title} 
              price={el?.price} 
              imageUrl={el?.imageUrl}
              addtoTheCart={()=>  handleAddedtoCart(el)}
              onFavorite = {() => handleAddedtoFav(el)}
              loading={isLoading}
              added = {cartitems.some((obj) =>obj.item === el?._id)}
              favorited = {favItems.some((obj) =>obj.item === el?._id)}
              />
            )
          )
    );
  }


  const handleAddedtoCart = async (obj) => {
    console.log('object2', obj)
    try {
   
      const existingCartItem = cartitems.find((item) => item.item === obj._id);
      if (existingCartItem) {
      

        setCartItems((prev) => prev.filter((item) => item.item !== obj._id));
        axios.delete(`${API_URL}/drawer`, { data: { item: obj._id } }).then(() => {
       
        });
      } else {
      
        const newItem = { ...obj, item: obj._id };
        setCartItems([...cartitems, newItem]);
        axios.post(`${API_URL}/drawer/addToDrawer`, newItem).then(() => {
        
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


  function onSearch (e) {
    setSearchValue(e.target.value)
  }

 
  useEffect(() =>  {
    async function fetchData() {
    try {
      const {data} = await axios.get(`${API_URL}/items`);
      const datDrawer = await axios.get(`${API_URL}/drawer`).then(res => {return res.data});
  
      const datFav = await axios.get(`${API_URL}/favourites`).then(res => {return res.data});
      
       setLoading(false)
      setCartItems(datDrawer);
      setFavItems(datFav);
      setItems(data);

    }
  catch (error) {
    alert('Ошибка при запросе данных ;(');
    console.error(error);
  }
}
fetchData();
  }, []);

  return (
    <>
    <div className="wrapper clear">
   <Header onClickCart={()=> setCartOpened(true)}/>
   <Drawer 
   items={cartitems} 

   onDelete={onDeleteFronCart}
   onCloseCart={()=>setCartOpened(false)}/> 

    <div className="content p-40 ">
      <div className='mb-40 d-flex align-center justify-between'>

      <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Our sneaker assortment:'}
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


{renderItems () }

</div>
    </div>
<Footer/>
    </div>
    </>
  )
}

export default HomePage
