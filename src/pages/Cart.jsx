import { Link } from 'react-router-dom';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className='py-12'>
        <div className='max-w-[90%] md:max-w-[80%] mx-auto'>
          <h2 className='font-heading font-bold text-3xl text-teal-800 italic text-center mb-4'>
            Shopping Cart
          </h2>
          <hr className='border-teal-600 border-2 rounded mx-auto mb-8 md:mb-10 w-[50px]' />
          <div className='text-center'>
            <FaShoppingCart className='mx-auto text-8xl text-teal-400 mb-4' />
            <h3 className='font-heading text-2xl text-gray-800 mb-4'>
              Your cart is currently empty
            </h3>
            <p className='text-gray-600 mb-6'>
              Browse our collection to find the perfect plants for your space.
            </p>
            <Link
              to='/'
              className='inline-block bg-teal-800 font-semibold text-white uppercase py-2 px-6 rounded hover:bg-teal-700'
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='py-12'>
      <div className='max-w-[90%] md:max-w-[80%] mx-auto'>
        <h2 className='font-heading font-bold text-4xl text-teal-800 italic text-center mb-4'>
          Shopping Cart
        </h2>
        <hr className='border-teal-600 border-2 rounded mx-auto mb-8 md:mb-16 w-[50px]' />
        {/* Desktop/Tablet View */}
        <div className='hidden sm:grid grid-cols-[80px_2fr_1fr_1fr_1fr_50px] gap-4 border-b border-gray-200 pb-2 mb-4'>
          <div className='font-bold text-left'>Plant</div>
          <div></div>
          <div className='font-bold text-left'>Price</div>
          <div className='font-bold text-center'>Quantity</div>
          <div className='font-bold text-left'>Total</div>
          <div></div>
        </div>
        <div className='hidden sm:block'>
          {cart.map(item => (
            <div
              key={item.id}
              className='grid grid-cols-[80px_2fr_1fr_1fr_1fr_50px] gap-4 border-b border-gray-200 py-4'
            >
              <img
                src={item.coverImg}
                alt={item.name}
                className='w-20 h-20 object-cover rounded-lg'
              />
              <div>
                <h3 className='font-heading text-lg text-teal-800 font-semibold italic'>
                  {item.name}
                </h3>
                <p className='text-gray-600 text-sm'>
                  {item.description.substring(0, 20)}...
                </p>
              </div>
              <div className='text-gray-800 my-auto'>
                ${item.price.toFixed(2)}
              </div>
              <div className='flex items-center justify-center'>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className='px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300'
                >
                  -
                </button>
                <span className='px-4'>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className='px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300'
                >
                  +
                </button>
              </div>
              <div className='text-gray-800 my-auto'>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className='text-red-600 hover:text-red-700 cursor-pointer'
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
        {/* Mobile View */}
        <div className='block sm:hidden'>
          {cart.map(item => (
            <div
              key={item.id}
              className='flex flex-col gap-3 border-b border-gray-200 py-4'
            >
              <div className='flex items-center justify-between'>
                <img
                  src={item.coverImg}
                  alt={item.name}
                  className='w-20 h-20 object-cover rounded-lg'
                />
                <div className='flex flex-col gap-1 max-w-[60%]'>
                  <h3 className='font-heading text-lg text-teal-800 font-semibold italic'>
                    {item.name}
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    {item.description.substring(0, 20)}...
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className='text-red-600 hover:text-red-700 cursor-pointer'
                >
                  <FaTimes />
                </button>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-800 font-bold'>Price:</span>
                <span className='text-gray-800'>${item.price.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-800 font-bold'>Qty:</span>
                <div className='flex items-center'>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className='px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300'
                  >
                    -
                  </button>
                  <span className='px-4'>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className='px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300'
                  >
                    +
                  </button>
                </div>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-800 font-bold'>Total:</span>
                <span className='text-gray-800'>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between sm:justify-end mt-4'>
          <div className='flex justify-between sm:justify-center items-center text-lg font-bold text-gray-800 w-full sm:w-auto'>
            <span className='mr-0 sm:mr-32'>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
