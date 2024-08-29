import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../lib/CartContext";
import axios from "axios";
import Link from "next/link";
import Spinner from "../components/Spinner";
import { signIn, signOut, useSession } from "next-auth/react";
import Success from "../components/Success";
import toast from "react-hot-toast";

export default function Cart() {
  const { cartProducts, removeProduct, addProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
        setLoading(false);
      });
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  let subTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    subTotal = total + total / 1000;
  }

  function increaseProduct(id) {
    addProduct(id);
  }

  function decreaseProduct(id) {
    removeProduct(id);
    toast.success("Removed product!!");
  }
  function deleteCart(id) {
    clearCart();
    toast.success("Cart cleared!!");
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  async function stripeCheckout() {
    const response = await axios.post("/api/checkout", {
      email: session.user.email,
      name: session.user.name,
      address,
      country,
      zip,
      city,
      cartProducts,
    });

    if (response) {
      // window.location = response.data.url
      toast.success("Order placed successfully");
      setIsSuccess(true);
      clearCart();
    } else {
      toast.error("An error occured!!");
    }
  }

  if (isSuccess) {
    return (
      <>
        <Success />
      </>
    );
  }

  if (session) {
    return (
      <>
        <section className="flex justify-between space-x-4 max-md:flex-col ">
          <div className="px-4 md:w-2/3">
            <div className="mt-16 md:mt-6">
              <header className="flex justify-between w-full text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Your Cart
                </h1>
              </header>
              {loading ? (
                <div className="flex items-center justify-center h-screen">
                  <Spinner />
                </div>
              ) : !products?.length ? (
                <p className="my-6 text-center ">Your cart is empty</p>
              ) : (
                <>
                  {products?.length > 0 &&
                    products.map((product) => (
                      <div key={product._id} className="mt-8">
                        <ul className="space-y-4">
                          <li className="flex items-center justify-between gap-4">
                            <img
                              src={product.images[0]}
                              alt=""
                              className="object-cover w-16 h-16 rounded"
                            />

                            <div>
                              <h3 className="max-w-md text-md text-text">
                                {product.title}
                              </h3>

                              <dl className="mt-0.5 space-y-px text-[10px] text-text">
                                <p>
                                  ₹. &nbsp;
                                  {cartProducts.filter(
                                    (id) => id === product._id
                                  ).length * product.price}
                                </p>
                              </dl>
                            </div>

                            <div>
                              <label htmlFor="Quantity" className="sr-only">
                                {" "}
                                Quantity{" "}
                              </label>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  className="w-10 h-10 leading-10 transition border text-text hover:opacity-75 "
                                  onClick={() => decreaseProduct(product._id)}
                                >
                                  -
                                </button>

                                <input
                                  type="number"
                                  id="Quantity"
                                  value={
                                    cartProducts.filter(
                                      (id) => id === product._id
                                    ).length
                                  }
                                  className="h-10 w-16 rounded border border-secondary text-primary font-bold text-center [-moz-appearance:_textfield] sm:text-md [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                />

                                <button
                                  type="button"
                                  className="w-10 h-10 leading-10 transition border text-text hover:opacity-75"
                                  onClick={() => increaseProduct(product._id)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <p class="mt-8 text-lg font-medium">Shipping Methods</p>
                      </div>
                    ))}
                  <form class="mt-5 grid gap-6">
                    <div class="relative">
                      <input
                        class="peer hidden"
                        id="radio_1"
                        type="radio"
                        name="radio"
                        checked
                      />
                      <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                      <label
                        class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for="radio_1"
                      >
                        <img
                          class="w-14 object-contain"
                          src="https://1000logos.net/wp-content/uploads/2021/04/Fedex-logo.png"
                          alt=""
                        />
                        <div class="ml-5">
                          <span class="mt-2 font-semibold">Fedex Delivery</span>
                          <p class="text-slate-500 text-sm leading-6">
                            Delivery: 2-4 Days
                          </p>
                        </div>
                      </label>
                    </div>
                    <div class="relative">
                      <input
                        class="peer hidden"
                        id="radio_2"
                        type="radio"
                        name="radio"
                        checked
                      />
                      <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                      <label
                        class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for="radio_2"
                      >
                        <img
                          class="w-14 object-contain"
                          src="https://i.pinimg.com/564x/cc/00/a1/cc00a128f07627f362bdc7cfcd6ee4ef.jpg"
                          alt=""
                        />
                        <div class="ml-5">
                          <span class="mt-2 font-semibold">
                            Logistic Delivery
                          </span>
                          <p class="text-slate-500 text-sm leading-6">
                            Delivery: 3-5 Days
                          </p>
                        </div>
                      </label>
                    </div>
                  </form>
                  <div className="flex justify-end pt-8 mt-8 border-t border-gray-100">
                    <div className="max-w-md space-y-4 ">
                      <dl className="space-y-0.5 text-md text-gray-700">
                        <div className="flex justify-end mb-3 text-red-400 border-b">
                          <button onClick={deleteCart}>Clear Cart</button>
                        </div>
                        <div className="flex justify-between">
                          <dt>Subtotal</dt>
                          <dd>₹. {formatPrice(total)}</dd>
                        </div>

                        <strike className="flex justify-between">
                          <dt>delivery</dt>
                          <dd>₹. {formatPrice(total / 1000)}</dd>
                        </strike>

                        <div className="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>₹. {formatPrice(total)}</dd>
                        </div>
                      </dl>

                      <div className="flex justify-end">
                        <Link
                          class="group flex items-center justify-between gap-4 rounded-lg border border-current px-4 py-2 text-orange-600 transition-colors hover:bg-orange-600 focus:outline-none focus:ring active:bg-orange-500"
                          href="/products"
                        >
                          <span class="font-medium transition-colors group-hover:text-white">
                            Continue shopping
                          </span>

                          <span class="shrink-0 rounded-full border border-orange-600 bg-white p-2 group-active:border-orange-500">
                            <svg
                              class="h-4 w-4 rtl:rotate-180"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {!products.length ? (
            ""
          ) : (
            <div className="mt-16 md:1/3 md:mt-6">
              <header className="flex flex-col w-full text-start">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Shipping details
                </h1>
                <p className="mt-2 text-lg text-text">
                  We use your account details for shipping.
                </p>
              </header>
              <div class="mx-auto max-w-xl p-4 border shadow-xl h-[400px] my-3">
                <div class="space-y-5">
                  <div class="grid grid-cols-12 gap-5">
                    <div class="col-span-6">
                      <label class="mb-1 block text-sm font-medium text-text">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        value={session.user.email}
                        placeholder="Email"
                      />
                    </div>
                    <div class="col-span-6">
                      <label class="mb-1 block text-sm font-medium text-text">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        value={session.user.name}
                        placeholder="Full name"
                      />
                    </div>
                    <div class="col-span-12">
                      <label class="mb-1 block text-sm font-medium text-text">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="1864 Main Street"
                        value={address}
                        onChange={(ev) => setAddress(ev.target.value)}
                        required
                      />
                    </div>
                    <div class="col-span-6">
                      <label class="mb-1 block text-sm font-medium text-text">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder=""
                        value={city}
                        onChange={(ev) => setCity(ev.target.value)}
                        required
                      />
                    </div>
                    <div class="col-span-4">
                      <label class="mb-1 block text-sm font-medium text-text">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder=""
                        value={country}
                        onChange={(ev) => setCountry(ev.target.value)}
                        required
                      />
                    </div>
                    <div class="col-span-2">
                      <label class="mb-1 block text-sm font-medium text-text">
                        Zip
                      </label>
                      <input
                        type="text"
                        name="zip"
                        class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder=""
                        value={zip}
                        onChange={(ev) => setZip(ev.target.value)}
                        required
                      />
                    </div>
                    <div class="col-span-12 text-center w-full">
                      <button
                        onClick={stripeCheckout}
                        className="block w-full px-5 py-3 transition rounded disabled bg-secondary text-md text-text hover:bg-purple-300"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </>
    );
  }

  return (
    <>
      <div className="grid h-screen px-4 bg-white place-content-center">
        <div className="text-center">
          <p className="mt-4 text-2xl text-text">
            You should sign Up to view cart Items
          </p>

          <button
            onClick={() => signIn("google")}
            className="inline-block px-5 py-3 mt-6 text-sm font-medium rounded text-text bg-primary hover:bg-primary focus:outline-none focus:ring"
          >
            Login / Register
          </button>
        </div>
      </div>
    </>
  );
}
