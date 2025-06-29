import { Link } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa6';
import { TbHomeShare } from 'react-icons/tb';

const NotFound = () => {
  return (
    <div className='w-[80%] mx-auto text-center py-28 lg:py-12 flex flex-col items-center '>
      <h2 className='font-heading text-3xl md:text-5xl font-bold uppercase text-emerald-950'>
        Page Not Found
      </h2>
      <FaRobot className='w-32 md:w-48 h-32 md:h-48 text-emerald-700' />
      <p className='mt-2'>Sorry, the page you're looking for doesn't exist.</p>
      <Link
        to='/'
        className='bg-emerald-950 px-4 py-2 text-white rounded-lg mt-14 lg:mt-12 flex items-center gap-2'
      >
        <TbHomeShare />
        <span>Return Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
