import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [plants, setPlants] = useState([]);
  const scrollRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('/plants.json');
        const data = await response.json();
        setPlants(data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };
    fetchPlants();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth / 3; // Each card
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += scrollWidth;
      if (scrollPosition >= scrollContainer.scrollWidth) {
        scrollPosition = 0; // Reset to start
      }
      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    };

    const interval = setInterval(scroll, 1500);

    return () => clearInterval(interval); // Cleanup
  }, [plants]);

  return (
    <div>
      {/* Hero Section */}
      <div
        className='h-[70vh] lg:h-[calc(100vh-64px)] bg-cover bg-center flex items-center'
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/img/24.jpg')",
        }}
      >
        <div className='w-[90%] lg:w-[80%] mx-auto text-center text-white flex flex-col items-center lg:items-start lg:text-left'>
          <h1 className='font-heading font-bold text-5xl md:text-7xl italic mb-8'>
            Welcome to PotStop
          </h1>
          <p className='text-lg md:text-xl mb-6 md:max-w-lg lg:max-w-2xl'>
            Let's help you discover vibrant potted plants to brighten your space
            and lift your mood.
          </p>
          <a
            href='#shop-section'
            className='inline-block bg-teal-600 text-white text-lg uppercase py-2 px-12 rounded hover:bg-teal-700 transition-transform duration-300 hover:scale-105 font-semibold'
          >
            Shop Now
          </a>
        </div>
      </div>

      {/* Featured Plants */}
      <div className='mx-4 md:mx-12 lg:max-w-[80%] lg:mx-auto pt-12'>
        <h2 className='font-heading text-3xl text-teal-900 font-bold text-center mb-4'>
          Curated Plant Picks
        </h2>
        <hr className='border-teal-600 border-2 rounded mx-auto mb-8 md:mb-16 w-[50px]' />

        <div
          className='flex  overflow-x-auto space-x-6 pb-4 snap-x snap-mandatory hide-scrollbar'
          ref={scrollRef}
        >
          {plants
            .filter(plant => [9, 5, 8].includes(plant.id))
            .sort((a, b) => [9, 5, 8].indexOf(a.id) - [9, 5, 8].indexOf(b.id))
            .map(plant => (
              <div
                key={plant.id}
                className='bg-teal-800 overflow-hidden rounded-lg flex flex-row items-start md:items-center min-w-[300px] md:min-w-[450px] snap-center hover:scale-[1.02] hover:bg-teal-900 transition duration-300'
              >
                <img
                  src={plant.images[1]}
                  alt={plant.name}
                  className='w-2/5 h-48 object-cover md:mr-4'
                />
                <div className='text-white p-4'>
                  <h3 className='font-heading text-xl italic'>{plant.name}</h3>
                  <p className='text-sm mt-2'>
                    {plant.description.substring(0, 50)}...
                  </p>
                </div>
              </div>
            ))}
        </div>

        <p className='text-center'>&lt;&lt; Swipe to see more &gt;&gt;</p>
      </div>

      {/* Plants List */}
      <div
        id='shop-section'
        className='mx-4 md:mx-12 lg:max-w-[80%] lg:mx-auto py-12'
      >
        <h2 className='font-heading text-3xl text-teal-900 font-bold text-center mb-4'>
          Shop Our Plants
        </h2>
        <hr className='border-teal-600 border-2 rounded mx-auto mb-8 md:mb-16 w-[50px]' />

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {plants.map(plant => (
            <div
              key={plant.id}
              className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
            >
              <img
                src={plant.coverImg}
                alt={plant.name}
                className='w-full h-80 object-cover'
              />
              <div className='p-4'>
                <h3 className='font-heading text-xl font-bold text-teal-900 italic'>
                  {plant.name}
                </h3>
                <p className='text-gray-600 text-sm mt-1'>
                  {plant.description.substring(0, 55)}...
                </p>
                <p className='text-gray-800 font-bold mt-2'>
                  ${plant.price.toFixed(2)}
                </p>
                <button
                  onClick={() => addToCart(plant)}
                  className='mt-3 w-full bg-teal-600 text-white font-semibold uppercase py-2 rounded hover:bg-teal-700 cursor-pointer'
                >
                  Add To Cart
                </button>
                <Link
                  to={`/plant/${plant.id}`}
                  className='mt-2 block text-center text-teal-600 underline text-sm hover:text-teal-700'
                >
                  View Plant Info
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
