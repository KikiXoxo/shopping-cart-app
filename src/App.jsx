import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CartContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PlantDetails from './pages/PlantDetails';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/plant/:id' element={<PlantDetails />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
        <ToastContainer position='top-right' autoClose={2000} />
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
