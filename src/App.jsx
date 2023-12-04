import './App.scss'
import { Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import Favourites from './pages/Favourites';
import { AppProvider } from './components/AppProvider';

function App() {


  return (
    <AppProvider>
    <div>
      <Routes>
				
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='favourites' element={<Favourites/>}> </Route>

			</Routes>

  </div>
  </AppProvider>
  )
}

export default App