'use client';

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageName: string;
};

type CartItem = Product & {
  qty: number;
};

const ProductSearch: React.FC = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  // PAYMENT FORM
  const [showPayment, setShowPayment] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const products: Product[] = [
    {
      id: 1,
      name: "bags",
      price: 20,
      description: "unisex designer bags",
      imageName: "sexycute.jpg",
    },
    {
      id: 2,
      name: "shoes",
      description: "unisex shoes",
      price: 12,
      imageName: "sandal.PNG",
    },
    {
      id: 3,
      name: "jewelry",
      description: "silver and gold best of all kind",
      price: 45,
      imageName: "telya.JPG",
    },
    {
      id: 4,
      name: "T-shirt",
      description: "best quality",
      price: 2,
      imageName: "SASQ5018.JPG",
    },
    {
      id: 5,
      name: "jeans",
      description: "unisex jeans",
      price: 10,
      imageName: "jean.JPG",
    },
    {
      id: 6,
      name: "short",
      description: "best quality with affordable price",
      price: 1,
      imageName: "blackshort.PNG",
    },
    {
      id: 7,
      name: "phones",
      description: "best quality with affordable price",
      price: 97.522,
      imageName: "iphone16.JPG",
    },
    {
      id: 8,
      name: "laptop",
      description: "best quality with affordable price",
      price: 100.35,
      imageName: "laptop.JPG",
    },
  ];

  // =========================
  // SEARCH PRODUCTS
  // =========================

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // =========================
  // ADD PRODUCT TO CART
  // =========================

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          qty: 1,
        },
      ];
    });
  };

  // =========================
  // REMOVE ONE ITEM
  // =========================

  const decreaseQuantity = (productId: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                qty: item.qty - 1,
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // =========================
  // REMOVE PRODUCT COMPLETELY
  // =========================

  const removeFromCart = (productId: number) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  };

  // =========================
  // TOTAL NUMBER OF ITEMS
  // =========================

  const totalCartItems = cart.reduce(
    (total, item) => total + item.qty,
    0
  );

  // =========================
  // TOTAL PRICE
  // =========================

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // =========================
  // OPEN PAYMENT FORM
  // =========================

  const handlePurchase = () => {
    if (cart.length === 0) {
      alert("Cart is empty. Add items first.");
      return;
    }

    setShowPayment(true);
  };

  // =========================
  // PROCESS PAYMENT
  // =========================

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !cardNumber ||
      !cardName ||
      !expiryDate ||
      !cvv
    ) {
      alert("Please fill in all card information.");
      return;
    }

    if (cardNumber.length < 12) {
      alert("Please enter a valid card number.");
      return;
    }

    if (cvv.length < 3) {
      alert("Please enter a valid CVV.");
      return;
    }

    alert(
      `Payment successful!\n\nAmount Paid: $${totalPrice.toFixed(2)}`
    );

    // Clear cart
    setCart([]);

    // Close payment form
    setShowPayment(false);

    // Clear card fields
    setCardNumber("");
    setCardName("");
    setExpiryDate("");
    setCvv("");
  };

  return (
    <div className="min-h-screen w-full bg-white">

      {/* =========================
          NAVIGATION / SEARCH BAR
      ========================== */}

      <div
        className="
          fixed
          left-0
          top-0
          z-50
          flex
          min-h-20
          w-full
          flex-col
          items-center
          justify-center
          gap-3
          bg-white
          px-4
          py-3
          shadow-xl
          sm:flex-row
        "
      >

        {/* SEARCH */}

        <div className="relative w-full max-w-md">

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              h-11
              w-full
              rounded-lg
              border
              border-gray-300
              px-3
              pr-12
              text-black
              outline-none
              focus:border-blue-500
            "
            placeholder="Search for your product here"
          />

          <FontAwesomeIcon
            icon={faSearch}
            className="
              absolute
              right-4
              top-3.5
              text-gray-500
            "
          />

        </div>

        {/* CART COUNT */}

        <div
          className="
            rounded-lg
            bg-blue-700
            px-5
            py-2
            font-bold
            text-white
          "
        >
          Cart: {totalCartItems}
        </div>

      </div>


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <div
        className="
          mx-auto
          flex
          w-full
          max-w-7xl
          flex-col
          items-center
          px-5
          pt-36
        "
      >
       <h1 className="font-bold text-6xl text-black ml-4"> Veemama Store</h1>
        <h1 className="mb-8 text-3xl font-bold text-black">
          Our Products
        </h1>


        {/* =========================
            PRODUCT GRID
        ========================== */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            justify-items-center
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {filteredProducts.map((product) => (

            <div
              key={product.id}
              className="
                flex
                min-h-107.5
                w-full
                max-w-sm
                flex-col
                items-center
                justify-center
                gap-4
                rounded-2xl
                bg-white
                p-5
                shadow-lg
              "
            >

              {/* PRODUCT IMAGE */}

              <div
                className="
                  flex
                  h-52
                  w-52
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  bg-gray-100
                  shadow
                "
              >

                <img
                  src={`/images/${product.imageName}`}
                  className="h-full w-full object-cover"
                  alt={product.name}
                />

              </div>


              {/* PRODUCT NAME */}

              <h2 className="text-xl font-bold capitalize text-black">
                {product.name}
              </h2>


              {/* DESCRIPTION */}

              <p className="text-center text-gray-600">
                {product.description}
              </p>


              {/* PRICE */}

              <p className="text-xl font-bold text-black">
                ${product.price.toFixed(2)}
              </p>


              {/* BUTTONS */}

              <div className="flex flex-wrap justify-center gap-3">

                <button
                  onClick={() => addToCart(product)}
                  className="
                    rounded-lg
                    bg-blue-700
                    px-4
                    py-2
                    font-semibold
                    text-white
                    shadow
                    hover:bg-blue-800
                  "
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => {
                    addToCart(product);
                  }}
                  className="
                    rounded-lg
                    bg-green-600
                    px-4
                    py-2
                    font-semibold
                    text-white
                    shadow
                    hover:bg-green-700
                  "
                >
                  Add & Purchase
                </button>

              </div>

            </div>

          ))}

        </div>


        {/*NO SEARCH RESULT */}

        {filteredProducts.length === 0 && (

          <div className="mt-10 text-center">

            <p className="text-xl font-semibold text-gray-700">
              No products found.
            </p>

            <p className="mt-2 text-gray-500">
              Try searching for another product.
            </p>

          </div>

        )}


        {/* =========================
            SHOPPING CART
        ========================== */}

        <div
          className="
            mb-10
            mt-16
            w-full
            max-w-4xl
            rounded-2xl
            bg-gray-100
            p-4
            sm:p-6
          "
        >

          <h2 className="mb-6 text-2xl font-bold text-black">
            Shopping Cart
          </h2>


          {cart.length === 0 ? (

            <p className="text-gray-600">
              Your cart is empty.
            </p>

          ) : (

            <div className="flex flex-col gap-4">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="
                    flex
                    flex-col
                    items-center
                    justify-between
                    gap-4
                    rounded-xl
                    bg-white
                    p-4
                    shadow
                    md:flex-row
                  "
                >

                  {/* PRODUCT INFORMATION */}

                  <div className="text-center md:text-left">

                    <h3 className="font-bold capitalize text-black">
                      {item.name}
                    </h3>

                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} each
                    </p>

                    <p className="font-semibold text-black">
                      Subtotal: $
                      {(item.price * item.qty).toFixed(2)}
                    </p>

                  </div>


                  {/* QUANTITY CONTROLS */}

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="
                        h-9
                        w-9
                        rounded
                        bg-gray-300
                        font-bold
                        text-black
                        hover:bg-gray-400
                      "
                    >
                      -
                    </button>

                    <span className="font-bold text-black">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => addToCart(item)}
                      className="
                        h-9
                        w-9
                        rounded
                        bg-blue-600
                        font-bold
                        text-white
                        hover:bg-blue-700
                      "
                    >
                      +
                    </button>

                  </div>


                  {/* REMOVE */}

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="
                      rounded
                      bg-red-600
                      px-4
                      py-2
                      text-white
                      hover:bg-red-700
                    "
                  >
                    Remove
                  </button>

                </div>

              ))}


              {/* =========================
                  CART SUMMARY
              ========================== */}

              <div
                className="
                  mt-4
                  rounded-xl
                  bg-white
                  p-5
                  shadow
                "
              >

                <div className="flex justify-between text-gray-700">

                  <span>
                    Total Items
                  </span>

                  <span className="font-bold">
                    {totalCartItems}
                  </span>

                </div>


                <div className="mt-3 flex justify-between text-xl font-bold text-black">

                  <span>
                    Total Price
                  </span>

                  <span className="text-green-600">
                    ${totalPrice.toFixed(2)}
                  </span>

                </div>


                {/* PURCHASE CART */}

                <button
                  onClick={handlePurchase}
                  className="
                    mt-5
                    w-full
                    rounded-lg
                    bg-green-600
                    py-3
                    font-bold
                    text-white
                    hover:bg-green-700
                  "
                >
                  Purchase Cart ({totalCartItems} items)
                </button>

              </div>

            </div>

          )}

        </div>

      </div>


      {/* =========================
          PAYMENT MODAL
      ========================== */}

      {showPayment && (

        <div
          className="
            fixed
            inset-0
            z-100
            flex
            items-center
            justify-center
            bg-black/60
            px-4
          "
        >

          <div
            className="
              max-h-[90vh]
              w-full
              max-w-md
              overflow-y-auto
              rounded-2xl
              bg-white
              p-6
              shadow-2xl
            "
          >

            {/* PAYMENT HEADER */}

            <div className="mb-6">

              <h2 className="text-2xl font-bold text-black">
                Payment
              </h2>

              <p className="mt-2 text-gray-600">
                Enter your card information to complete your purchase.
              </p>

            </div>


            {/* TOTAL */}

            <div
              className="
                mb-6
                rounded-xl
                bg-gray-100
                p-4
              "
            >

              <p className="text-sm text-gray-500">
                Amount to Pay
              </p>

              <p className="text-3xl font-bold text-green-600">
                ${totalPrice.toFixed(2)}
              </p>

            </div>


            {/* PAYMENT FORM */}

            <form
              onSubmit={handlePayment}
              className="flex flex-col gap-4"
            >

              {/* CARD HOLDER */}

              <div>

                <label className="mb-1 block font-semibold text-black">
                  Card Holder Name
                </label>

                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Enter name on card"
                  className="
                    h-12
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-3
                    text-black
                    outline-none
                    focus:border-blue-500
                  "
                />

              </div>


              {/* CARD NUMBER */}

              <div>

                <label className="mb-1 block font-semibold text-black">
                  Card Number
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="1234567890123456"
                  className="
                    h-12
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-3
                    text-black
                    outline-none
                    focus:border-blue-500
                  "
                />

              </div>


              {/* EXPIRY + CVV */}

              <div className="flex gap-3">

                <div className="w-1/2">

                  <label className="mb-1 block font-semibold text-black">
                    Expiry Date
                  </label>

                  <input
                    type="text"
                    maxLength={5}
                    value={expiryDate}
                    onChange={(e) =>
                      setExpiryDate(e.target.value)
                    }
                    placeholder="MM/YY"
                    className="
                      h-12
                      w-full
                      rounded-lg
                      border
                      border-gray-300
                      px-3
                      text-black
                      outline-none
                      focus:border-blue-500
                    "
                  />

                </div>


                <div className="w-1/2">

                  <label className="mb-1 block font-semibold text-black">
                    CVV
                  </label>

                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) =>
                      setCvv(
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder="123"
                    className="
                      h-12
                      w-full
                      rounded-lg
                      border
                      border-gray-300
                      px-3
                      text-black
                      outline-none
                      focus:border-blue-500
                    "
                  />

                </div>

              </div>


              {/* PAYMENT BUTTON */}

              <button
                type="submit"
                className="
                  mt-3
                  w-full
                  rounded-lg
                  bg-green-600
                  py-3
                  font-bold
                  text-white
                  transition
                  hover:bg-green-700
                "
              >
                Pay ${totalPrice.toFixed(2)}
              </button>


              {/* CANCEL */}

              <button
                type="button"
                onClick={() => setShowPayment(false)}
                className="
                  w-full
                  rounded-lg
                  bg-gray-200
                  py-3
                  font-semibold
                  text-black
                  hover:bg-gray-300
                "
              >
                Cancel
              </button>

            </form>

          </div>

        </div>

      )}


      {/* =========================
          FOOTER
      ========================== */}

      <footer
        className="
          flex
          items-center
          justify-center
          p-4
          text-center
          text-sm
          text-black
          sm:text-base
        "
      >
        Cotcee 2026 @ LanHub ass by Vera Lar
      </footer>

    </div>
  );
};

export default ProductSearch;




