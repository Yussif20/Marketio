import { createContext, useState, useContext, useEffect } from 'react';
import { productsData } from './data.js';

const ProductContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData);

  const clearFavorites = () => setFavorite([]);
  const clearCart = () => setCartItems([]);

  const [favorite, setFavorite] = useState(() => {
    const savedFavorites = localStorage.getItem('favorite');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorite', JSON.stringify(favorite));
  }, [favorite]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToFavorite = (product) => {
    setFavorite((prev) => {
      const isFavorite = prev.some((item) => item.id === product.id);
      if (isFavorite) return prev;
      return [...prev, product];
    });
  };

  const removeFromFavorite = (productId) => {
    setFavorite((prev) => prev.filter((item) => item.id !== productId));
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const cartItem = prev.find((item) => item.id === product.id);
      if (cartItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const addToBag = () => {
    setCartItems((prev) => {
      const newCartItems = [...prev];
      favorite.forEach((favItem) => {
        const cartItem = newCartItems.find((item) => item.id === favItem.id);
        if (cartItem) {
          cartItem.quantity += 1;
        } else {
          newCartItems.push({ ...favItem, quantity: 1 });
        }
      });
      return newCartItems;
    });
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        favorite,
        setFavorite,
        cartItems,
        setCartItems,
        addToFavorite,
        removeFromFavorite,
        addToCart,
        addToBag,
        clearFavorites,
        clearCart,
        updateCartItemQuantity,
        removeFromCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
