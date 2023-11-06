import './App.scss'
import { Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import Favourites from './pages/Favourites';

function App() {


  return (
    <div>
      <Routes>
				
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='favourites' element={<Favourites/>}> </Route>

			</Routes>
  </div>
  )
}

export default App
