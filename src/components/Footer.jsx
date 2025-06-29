import { Link } from 'react-router-dom';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className='w-full bg-teal-950 pt-2 pb-4 text-teal-100  text-center'>
      <div className='max-w-[80%] mx-auto flex flex-col items-center'>
        <p className='text-sm '>
          &copy; 2025 PotStop | All Copyrights Reserved
        </p>

        <div className='flex gap-5 mt-4 md:mt-6'>
          <Link to='#'>
            <FaInstagram className='text-xl md:text-2xl hover:text-white' />
          </Link>
          <Link to='#'>
            <FaXTwitter className='text-xl md:text-2xl hover:text-white' />
          </Link>
          <Link to='#'>
            <MdOutlineMarkEmailUnread className='text-xl md:text-2xl hover:text-white' />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
