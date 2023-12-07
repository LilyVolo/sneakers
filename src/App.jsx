import './App.scss'
import { Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import Favourites from './pages/Favourites';
import { AppProvider } from './components/AppProvider';
import Orders from './pages/Orders';

function App() {


  return (
    <AppProvider>
    <div>
      <Routes>
				
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='favourites' element={<Favourites/>}> </Route>
        <Route path='orders' element={<Orders/>}> </Route>        

			</Routes>

  </div>
  </AppProvider>
  )
}

export default App