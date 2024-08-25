import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../../lib/CartContext";

export default function Hero({ product }) {
  const { addProduct } = useContext(CartContext);
  function addItemToCart() {
    addProduct(product._id);
  }
  return (
    // <div className="relative overflow-hidden bg-background my-14 md:my-10">
    //   <div className="lg:py-40 min-h-[650px]">
    //     <div className="relative mx-auto sm:static sm:px-6 lg:px-8">
    //       <div className="sm:max-w-xl text-start">
    //         <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-5xl lg:hidden max-md:mb-6 text-primary">
    //           At <span className="text-accent">50%</span> Off
    //         </h1>
    //         <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-5xl text-text">
    //           {/* {product.title} */}
    //         </h1>
    //         <p className="mt-4 text-lg text-gray-500 line-clamp-3 sm:text-xl lg:text-2xl">
    //           {/* {product.description} */}
    //         </p>

    //         <div className="flex flex-col mt-10 max-sm:items-center max-sm:justify-center">
    //           {/* Decorative image grid */}
    //           <div className="relative lg:hidden ">
    //             <div className="grid grid-cols-1 gap-6">
    //               <div className="overflow-hidden transition-transform duration-300 ease-in-out transform translate-x-4 border rounded-lg w-72 h-80 border-secondary rotate-3 hover:-rotate-6 hover:translate-x-8">
    //                 <img
    //                   // src={product.images[0]}
    //                   alt=""
    //                   className="object-cover object-center w-full h-full"
    //                 />
    //               </div>
    //               <div className="overflow-hidden transition-transform duration-300 ease-in-out transform translate-x-2 border rounded-lg w-72 h-80 border-secondary -rotate-2 hover:rotate-4 hover:translate-x-4">
    //                 <img
    //                   // src={product.images[1]}
    //                   alt=""
    //                   className="object-cover object-center w-full h-full"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //           <div className="flex items-center gap-4 max-sm:justify-center max-sm:mt-6">
    //             <button
    //               className="inline-block px-6 py-3 mt-6 font-medium text-center text-white border border-transparent rounded-md bg-primary hover:text-accent"
    //               onClick={addItemToCart}
    //             >
    //               Add to cart
    //             </button>
    //             <Link
    //               href="/products"
    //               className="inline-block px-6 py-3 mt-6 font-medium text-center bg-transparent border rounded-md border-accent text-accent hover:text-primary hover:border-primary"
    //             >
    //               All Products
    //             </Link>
    //           </div>
    //         </div>
    //         <div className="absolute hidden transform lg:block sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
    //           <div className="flex items-center space-x-6 lg:space-x-8">
    //             <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
    //               <div className="overflow-hidden transition-transform duration-300 ease-in-out transform translate-x-4 border rounded-lg w-72 h-80 border-secondary rotate-3 hover:-rotate-6 hover:translate-x-8">
    //                 <img
    //                   // src={product.images[0]}
    //                   alt=""
    //                   className="object-cover object-center w-full h-full"
    //                 />
    //               </div>
    //               <div className="overflow-hidden transition-transform duration-300 ease-in-out transform translate-x-2 border rounded-lg w-72 h-80 border-secondary -rotate-2 hover:rotate-4 hover:translate-x-4">
    //                 <img
    //                   // src={product.images[1]}
    //                   alt=""
    //                   className="object-cover object-center w-full h-full"
    //                 />
    //               </div>
    //             </div>
    //             <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
    //               <div className="overflow-hidden transition-transform duration-300 ease-in-out transform translate-x-3 border rounded-lg w-72 h-80 border-secondary rotate-1 hover:-rotate-2 hover:translate-x-4">
    //                 <img
    //                   // src={product.images[2]}
    //                   alt=""
    //                   className="object-cover object-center w-full h-full"
    //                 />
    //               </div>
    //               <div className="overflow-hidden transition-transform duration-300 ease-in-out transform translate-x-2 border rounded-lg w-72 h-80 border-secondary -rotate-4 hover:rotate-8 hover:translate-x-3">
    //                 <img
    //                   // src={product.images[3]}
    //                   alt=""
    //                   className="object-cover object-center w-full h-full"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div class="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
      <div class="container mx-auto px-6 flex relative py-16">
        <div class="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
          <span class="w-20 h-2 bg-gray-800 dark:bg-white mb-12"></span>
          <h1 class="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
            Wear the
            <span class="text-5xl sm:text-7xl">Best</span>
          </h1>
          <p class="text-sm sm:text-base text-gray-700 dark:text-white">
            We deliver the best Glasses of all types. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum is
            simply dummy text of the printing and typesetting industry.
          </p>
          <div class="flex mt-8">
            <Link
              href="/products"
              class="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400"
            >
              All Products
            </Link>
            <Link
              href="/cart"
              class="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md"
            >
              Cart
            </Link>
          </div>
        </div>
        <div class="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
          <img
            src="https://png.pngtree.com/background/20230516/original/pngtree-an-older-asian-man-with-sunglasses-outside-of-the-city-picture-image_2610389.jpg"
            class="max-w-xs md:max-w-sm m-auto"
          />
        </div>
      </div>
    </div>
  );

  return null;
}
