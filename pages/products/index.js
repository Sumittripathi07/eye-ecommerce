import { CartContext } from "@/lib/CartContext";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

// Utility function to format price with a comma for thousands
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Products({ allProducts }) {
  const { addProduct } = useContext(CartContext);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const filterProducts = () => {
    if (searchQuery === "") {
      setFilteredProducts(allProducts);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [searchQuery]);

  return (
    <div className="flex justify-center w-full min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center w-full min-h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="w-full px-4 mt-14 md:mt-6 md:p-0">
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg" // Increased the input size
          />

          {filteredProducts.length === 0 ? ( // Display a message when no matching searches
            <p className="text-center text-gray-600">
              No matching products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
              {filteredProducts.map((product, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col w-full max-w-xs m-10 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md"
                >
                  <Link
                    href={"/products/" + product._id}
                    className="relative flex mx-3 mt-3 overflow-hidden h-60 rounded-xl"
                  >
                    <img
                      className="object-cover"
                      src={product.images[0]}
                      alt="product image"
                    />
                    <span className="absolute top-0 left-0 px-2 m-2 text-sm font-medium text-center text-white bg-black rounded-full">
                      39% OFF
                    </span>
                  </Link>
                  <div className="px-5 pb-5 mt-4">
                    <a href="#">
                      <h5 className="text-xl tracking-tight text-slate-900">
                        {product.title}
                      </h5>
                    </a>
                    <div className="flex items-center justify-between mt-2 mb-5">
                      <p>
                        <span className="text-3xl font-bold text-slate-900">
                          ₹{product.price}
                        </span>
                        <span className="text-sm line-through text-slate-900">
                          ₹
                          {(product.price + (product.price * 39) / 100).toFixed(
                            2
                          )}
                        </span>
                      </p>
                      <div className="flex items-center">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                          5.0
                        </span>
                      </div>
                    </div>
                    <a
                      onClick={() => {
                        addProduct(product._id);
                        toast.success("Item added to cart!!");
                      }}
                      className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to cart
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const allProducts = await Product.find({}, null, { sort: { _id: 1 } });

  return {
    props: {
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    },
  };
}

// initial code
// import { CartContext } from "@/lib/CartContext";
// import { mongooseConnect } from "@/lib/mongoose";
// import { Product } from "@/models/Product";
// import Link from "next/link";
// import { useContext, useEffect, useState } from "react";
// import Spinner from "../components/Spinner";
// import toast from "react-hot-toast";

// // Utility function to format price with a comma for thousands
// const formatPrice = (price) => {
//   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

// export default function Products({ allProducts }) {
//   const { addProduct } = useContext(CartContext)

//   const [loading, setLoading] = useState(true); // Step 1: Initialize loading state

//   useEffect(() => {
//     // Simulate loading effect with a delay (you can replace this with your API fetch)
//     setTimeout(() => {
//       setLoading(false); // Step 3: Set loading to false after fetching data (replace with your data fetching logic)
//     }, 2000); // Delay for 2 seconds (adjust as needed)
//   }, []); // Empty dependency array to run once on component mount
//   return (
//     <div className="flex items-center justify-center w-full min-h-screen">
//       {loading ? (
//         <Spinner />
//       ) : (
//         <div className="grid grid-cols-2 px-2 mt-14 md:mt-6 gap-x-3 md:gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 xl:gap-x-8">
//           {allProducts.map((product) => (
//             <div key={product._id}>
//               <div className="block overflow-hidden border group border-accent rounded-xl border-opacity-10">
//                 <div className="">
//                   <div className="relative md:h-[300px] h-[200px]">
//                     <img
//                       src={product.images[0]}
//                       alt=""
//                       className="absolute inset-0 object-contain w-full h-full opacity-100 group-hover:opacity-0"
//                     />
//                     <img
//                       src={product.images[1]}
//                       alt=""
//                       className="absolute inset-0 object-contain w-full h-full opacity-0 group-hover:opacity-100"
//                     />
//                   </div>

//                   <div className="relative p-3 border-t">
//                     <Link href={'/products/'+ product._id}>
//                       <h3 className="text-gray-700 truncate text-md group-hover:underline group-hover:underline-offset-4">
//                         {product.title}
//                       </h3>
//                     </Link>

//                     <div className="mt-1.5 flex flex-col   items-center justify-between text-text">
//                       <p className="text-sm tracking-wide text-primary md:text-md">ksh. {formatPrice(product.price)}</p>

//                       <div className="w-full col-span-12 mt-3 text-center">
//                         <button
//                           onClick={() => {addProduct(product._id); toast.success('Item added to cart!')}}
//                           className="block w-full px-5 py-3 transition rounded disabled bg-secondary text-md text-text hover:bg-purple-300"
//                         >
//                           Add to cart
//                         </button>
//                       </div>

//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

// }

// export async function getServerSideProps() {
//   await mongooseConnect();
//   const allProducts = await Product.find({}, null, { sort: { '_id': 1 } })

//   return {
//     props: {
//       allProducts: JSON.parse(JSON.stringify(allProducts))
//     },
//   };
// }
