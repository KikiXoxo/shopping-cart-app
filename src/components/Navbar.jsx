import { Link } from 'react-router-dom';
import {
  MdOutlineShoppingCart,
  MdOutlineMarkEmailUnread,
} from 'react-icons/md';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.length;

  return (
    <nav className='fixed top-0 left-0 z-50 w-full bg-teal-900'>
      <div className='max-w-[80%] mx-auto py-4 flex text-white justify-between items-center'>
        <Link to='/'>
          <h1 className='font-logo text-5xl'>PotStop</h1>
        </Link>

        <div className='flex gap-4'>
          <Link to='/cart' className='relative'>
            <MdOutlineShoppingCart className='text-3xl hover:text-teal-100' />
            {totalItems > 0 && (
              <span className='absolute -top-2 -right-2 bg-gray-200 text-teal-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                {totalItems}
              </span>
            )}
          </Link>
          <a
            href='https://github.com/KikiXoxo'
            target='_blank'
            rel='noopener noreferrer'
          >
            <MdOutlineMarkEmailUnread className='text-3xl hover:text-teal-100' />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
