import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PlantDetails from './pages/PlantDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/plant/:id' element={<PlantDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
