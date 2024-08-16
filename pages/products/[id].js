import { CartContext } from "@/lib/CartContext";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Link from "next/link";
import { useContext } from "react";
import toast from "react-hot-toast";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  if (product) {
    return (
      <div class="bg-gray-100 dark:bg-gray-800 py-8">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
              <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  class="w-full h-full object-cover"
                  src={product.images[0]}
                  alt="Product Image"
                />
              </div>
              <div class="flex -mx-2 mb-4">
                <div class="w-1/2 px-2">
                  <button
                    class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                    onClick={() => {
                      addProduct(product._id);
                      toast.success("Item added to cart!!");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
                <div class="w-1/2 px-2">
                  <Link href="/products">
                    <button class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                      All products
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div class="md:flex-1 px-4">
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {product.title}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {product.description}
              </p>
              <div class="flex mb-4">
                <div class="mr-4">
                  <span class="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span class="text-gray-600 dark:text-gray-300">
                    ${product.price}
                  </span>
                </div>
                <div>
                  <span class="font-bold text-gray-700 dark:text-gray-300">
                    Availability:
                  </span>
                  <span class="text-gray-600 dark:text-gray-300">In Stock</span>
                </div>
              </div>
              <div class="mb-4">
                <span class="font-bold text-gray-700 dark:text-gray-300">
                  Select Color:
                </span>
                <div class="flex items-center mt-2">
                  <button class="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                  <button class="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                  <button class="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                  <button class="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                </div>
              </div>
              {/* <div class="mb-4">
                    <span class="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                    <div class="flex items-center mt-2">
                        <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                        <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">M</button>
                        <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">L</button>
                        <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XL</button>
                        <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button>
                    </div>
                </div> */}

              <div>
                <span class="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {product.details}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      /* <section className="mt-20 md:mt-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:aspect-h-2 lg:aspect-w-2 lg:rounded-lg overflow-hidden px-4 md:px-2">
            <img
              src={product.images[0]}
              alt={product.images[0]}
              className="w-full h-full md:h-[90vh] object-cover object-center border border-primary rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid lg:grid-cols-1 lg:gap-y-4 px-2 gap-2 md:gap-0 md:px-2">
            {product.images.slice(1, 3).map((image, index) => (
              <div
                key={index}
                className="lg:aspect-h-2 lg:aspect-w-3 lg:overflow-hidden lg:rounded-lg "
              >
                <img
                  src={image}
                  alt={image}
                  className="w-full h-full md:h-[44vh] object-cover object-center border rounded-lg border-secondary p-4"
                />
              </div>
            ))}
          </div>

          <div className="p-4 lg:p-8 border">
            <h1 className="text-3xl font-semibold text-gray-900">
              {product.title}
            </h1>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Description
              </h2>
              <p className="mt-2 text-gray-700">{product.description}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Details</h2>
              <p className="mt-2 text-gray-700 list-disc list-inside">
                {product?.details}
              </p>
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 my-3">
              <div>
                <label className="text-text font-semibold">Brand</label>
                <p className="mt-2 text-accent list-disc list-inside">
                  {product?.brand}
                </p>
              </div>

              <div>
                <label className="text-text font-semibold">Gender</label>
                <p className="mt-2 text-accent list-disc list-inside">
                  {product?.gender}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 my-3">
              <div>
                <label className="text-text font-semibold">Sizes</label>
                <p className="mt-2 text-accent list-disc list-inside">
                  {product?.sizes}
                </p>
              </div>

              <div>
                <label className="text-text font-semibold">Colors</label>
                <p className="mt-2 text-accent list-disc list-inside">
                  {product?.colors}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Price</h2>
              <p className="mt-2 text-primary font-semibold text-lg">
                Ksh {formatPrice(product.price)}
              </p>
            </div>
            <div className="w-full">
              <button
                className="bg-primary text-white py-2 px-4 mt-4 rounded-md hover:bg-primary-dark w-full"
                onClick={() => {
                  addProduct(product._id);
                  toast.success("Item added to cart!!");
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section> */
    );
  }

  return <p>Product not found.</p>;
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
