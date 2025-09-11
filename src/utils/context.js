import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState([]);
  const [abouts, setAbouts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const clearCart = () => setCartItems([]);

  // Load cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const location = useLocation();



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Update cart totals and save to localStorage whenever cartItems change
  useEffect(() => {
    let count = 0;
    let subTotal = 0;

    cartItems.forEach((item) => {
      count += item.quantity;
      subTotal += item.price * item.quantity;
    });

    setCartCount(count);
    setCartSubTotal(subTotal);

    // Save cart in localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

const handleAddToCart = (id, product, quantity) => {
  if (!product || !product.title) {   // ✅ use direct fields
    console.error("Invalid product or missing title:", product);
    return;
  }

  setCartItems(prevItems => {
    const index = prevItems.findIndex(p => p.id === id);
    let newCart;
    if (index !== -1) {
      newCart = [...prevItems];
      newCart[index].quantity += quantity;
    } else {
      newCart = [
        ...prevItems,
        {
          id: id, // Strapi DB ID
          title: product.title,
          price: product.price,
          img: Array.isArray(product.img) ? product.img[0] : product.img,
          quantity,
        },
      ];
    }

    console.log("Updated Cart Items:", newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    return newCart;
  });
};




  const handleRemoveFromCart = (product) => {
    if (!product) return;
    const items = cartItems.filter((p) => p.id !== product.id);
    setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
    if (!product) return;

    let items = [...cartItems];
    const index = items.findIndex((p) => p.id === product.id);
    if (index === -1) return;

    let currentQuantity = items[index].quantity;
    if (type === "inc") items[index].quantity = currentQuantity + 1;
    if (type === "dec" && currentQuantity > 1) items[index].quantity = currentQuantity - 1;

    setCartItems(items);
  };

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        name,
        setName,
        abouts,
        setAbouts,
        contacts,
        setContacts,
        cartItems,
        setCartItems,
        handleAddToCart,
        handleRemoveFromCart,
        handleCartProductQuantity,
        cartCount,
        cartSubTotal,
        showCart,
        setShowCart,
         clearCart, 
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
