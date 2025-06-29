import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import NotFound from './NotFound';
import { useCart } from '../context/CartContext';

const PlantDetails = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await fetch('/plants.json');
        const data = await response.json();
        const foundPlant = data.find(p => p.id === parseInt(id));
        setPlant(foundPlant); // Returns undefined if not found
      } catch (error) {
        console.error('Error fetching plant:', error);
      }
    };
    fetchPlant();
  }, [id]);

  const handlePrevImage = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? plant.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev =>
      prev === plant.images.length - 1 ? 0 : prev + 1
    );
  };

  if (plant === null) return <div>Loading...</div>; // Temporary loading state

  if (plant === undefined) return <NotFound />;

  return (
    <div className='py-12'>
      <div className='max-w-[90%] md:max-w-[80%] mx-auto'>
        <h2 className='font-heading font-bold text-4xl text-teal-800 italic text-center mb-4'>
          {plant.name}
        </h2>
        <hr className='border-teal-600 border-2 rounded mx-auto mb-8 md:mb-16 w-[50px]' />
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='md:w-1/2 relative'>
            <img
              src={plant.images[currentImageIndex]}
              alt={`${plant.name} view ${currentImageIndex + 1}`}
              className='w-full h-120 object-cover rounded-lg'
            />
            <button
              onClick={handlePrevImage}
              className='absolute left-1 top-1/3 transform -translate-y-1/3 text-white rounded-full hover:text-gray-300 text-xl'
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNextImage}
              className='absolute right-1 top-1/3 transform -translate-y-1/3 text-white rounded-full hover:text-gray-300 text-xl'
            >
              <FaChevronRight />
            </button>
            <div className='flex gap-4 mt-4'>
              {plant.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${plant.name} view ${index + 1}`}
                  className={`w-24 h-24 object-cover rounded-lg cursor-pointer hover:brightness-70 ${
                    currentImageIndex === index
                      ? 'border-2 border-teal-600'
                      : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
          <div className='md:w-1/2'>
            <p className='text-gray-600 mb-4'>{plant.description}</p>
            <p className='text-gray-800 font-bold text-lg mb-4'>
              ${plant.price.toFixed(2)}
            </p>
            <div className='flex items-center mb-4'>
              <span className='mr-2'>Color:</span>
              <div className={`w-12 h-6 rounded-sm bg-${plant.color}`}></div>
            </div>
            <button
              onClick={() => addToCart(plant)}
              className='w-full bg-teal-600 font-semibold text-white uppercase py-2 rounded hover:bg-teal-700 cursor-pointer'
            >
              Add To Cart
            </button>
            <Link
              to='/'
              className='mt-4 block text-center text-teal-600 underline text-sm hover:text-teal-700'
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
