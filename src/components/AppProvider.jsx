import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  // Здесь вы можете определить начальное состояние и любые функции или данные, которые хотите предоставить через контекст
  const [someState, setSomeState] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [cartitems, setCartItems] = useState([])

  return (
    <AppContext.Provider value={{ someState, setSomeState, cartOpened, setCartOpened, cartitems, setCartItems}}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
