import { Link } from 'react-router-dom';
import {
  MdOutlineShoppingCart,
  MdOutlineMarkEmailUnread,
} from 'react-icons/md';

const Navbar = () => {
  return (
    <nav className='w-full bg-teal-900'>
      <div className='max-w-[80%] mx-auto py-4 flex text-white justify-between items-center'>
        <Link to='/'>
          <h1 className='font-logo text-5xl'>PotStop</h1>
        </Link>

        <div className='flex gap-4'>
          <Link to='/cart'>
            <MdOutlineShoppingCart className='text-3xl hover:text-teal-100' />
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
