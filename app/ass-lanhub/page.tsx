'use client';

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  imageName: string;
};

type CartItem = Product & {
  qty: number;
};

const PersonalTry: React.FC = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "bags",
      price: "$20",
      description: "unisex designer bags",
      imageName: 'sexycute.jpg',
    },
    {
      id: 2,
      name: "shoes",
      description: "unisex shoes",
      price: "$12",
      imageName: "sandal.PNG",
    },
    {
      id: 3,
      name: "jewlery",
      description: "silver and gold best of all kind",
      price: "$45",
      imageName: "telya.JPG",
    },
    {
      id: 4,
      name: "T-shirt",
      description: "best quality",
      price: "$2",
      imageName: "SASQ5018.JPG",
    },
    {
      id: 5,
      name: "jeans",
      description: "unisex jeans",
      price: "$10",
      imageName: "jean.JPG",
    },
    {
      id: 6,
      name: "short",
      description: "best quality with affordable price",
      price: "$1",
      imageName: "blackshort.PNG",
    },
    {
      id: 7,
      name: "phones",
      description: "best quality with affordable price",
      price: "$97.522",
      imageName: "iphone16.JPG",
    },
    {
      id: 8,
      name: "laptop",
      description: "best quality with affordable price",
      price: "$100.35",
      imageName: "laptop.JPG",
    },
  ];

 
  // SEARCH PRODUCTS

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

 
  // ADD PRODUCT TO CART

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      // If product already exists,
      // increase its quantity
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

      // If product does not exist,
      // add it with quantity 1
      return [
        ...prev,
        {
          ...product,
          qty: 1,
        },
      ];
    });
  };


  // REMOVE ONE ITEM
 
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


  // REMOVE PRODUCT COMPLETELY

  const removeFromCart = (productId: number) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  };


 
  const handlePurchase = () => {
    if (cart.length === 0) {
      alert("Cart is empty. Add items first.");
      return;
    }

    const totalItems = cart.reduce(
      (total, item) => total + item.qty,
      0
    );

    alert(`Purchase ${totalItems} items!`);

    setCart([]);
  };

 
  // TOTAL NUMBER OF ITEMS

  const totalCartItems = cart.reduce(
    (total, item) => total + item.qty,
    0
  );

  return (
    <div className="min-h-screen w-full bg-white">

  
       //   NAVIGATION / SEARCH BAR
  
      <div className="fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-center gap-8 bg-white shadow-xl">

        {/* Search */}
        <div className="relative">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-80 rounded-lg border border-none px-2 pr-12 text-black outline-none focus:border-blue-500"
            placeholder="Search for your product here"
          />

          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-4 top-3.5 text-gray-500"
          />
        </div>

        {/* Cart count */}
        <div className="rounded-lg bg-blue-700 px-5 py-2 font-bold text-white">
          Cart: {totalCartItems}
        </div>
      </div>


     
        {/*  MAIN CONTENT*/}
  
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 pt-28">

        <h1 className="mb-8 text-3xl font-bold text-black">
          Our Products
        </h1>


       
           {/* PRODUCT GRID */}
      
        <div className="grid w-full grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">

          {filteredProducts.map((product) => (

            <div
              key={product.id}
              className="flex min-h-107.5 w-full max-w-sm flex-col items-center justify-center gap-4 rounded-2xl bg-white p-5 shadow-lg"
            >

              {/* Product image */}
              <div className="flex h-52 w-52 items-center justify-center overflow-hidden rounded-2xl bg-gray-100 shadow">

                <img
                 src={`/images/${product.imageName}`}
                  className="h-full w-full object-cover"
                  alt={product.name} />

              </div>


              {/* Product name */}
              <h2 className="text-xl font-bold capitalize text-black">
                {product.name}
              </h2>


              {/* Product description */}
              <p className="text-center text-gray-600">
                {product.description}
              </p>


              {/* Product price */}
              <p className="text-xl font-bold text-black">
                {product.price}
              </p>


              {/* Buttons */}
              <div className="flex gap-3">

                <button
                  onClick={() => addToCart(product)}
                  className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white shadow hover:bg-blue-800"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handlePurchase}
                  className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-700"
                >
                  Purchase
                </button>

              </div>

            </div>

          ))}

        </div>


       
        {/*  NO SEARCH RESULT */}
    
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


            CART SECTION
      
        <div className="mt-16 mb-10 w-full max-w-4xl rounded-2xl bg-gray-100 p-6">

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
                  className="flex flex-col items-center justify-between gap-4 rounded-xl bg-white p-4 shadow md:flex-row"
                >

                  {/* Product information */}
                  <div>
                    <h3 className="font-bold capitalize text-black">
                      {item.name}
                    </h3>

                    <p className="text-gray-600">
                      {item.price}
                    </p>
                  </div>


                  {/* Quantity controls */}
                  <div className="flex items-center gap-3">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="h-9 w-9 rounded bg-gray-300 font-bold text-black hover:bg-gray-400"
                    >
                      -
                    </button>

                    <span className="font-bold text-black">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => addToCart(item)}
                      className="h-9 w-9 rounded bg-blue-600 font-bold text-white hover:bg-blue-700"
                    >
                      +
                    </button>

                  </div>


                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Remove
                  </button>

                </div>

              ))}


              {/* Purchase cart */}
              <button  onClick={handlePurchase}  className="mt-4 w-full rounded-lg bg-green-600 py-3 font-bold text-white hover:bg-green-700" >
                Purchase Cart ({totalCartItems} items)
              </button>

            </div>

          )}

        </div>

      </div>
     <footer className="p-4 flex justify-center items-center gap-5 text-2xl text-black">cotcee 2026 @ LanHub ass by vera lar</footer>
    </div>
  );
};

export default PersonalTry;
