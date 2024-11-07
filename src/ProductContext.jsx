import { createContext, useState, useContext } from 'react';
import { productsData } from './data.js';

// Create the context
const ProductContext = createContext();

// Custom hook for easier usage
export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData);
  const [favorite, setFavorite] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Add to Favorites
  const addToFavorite = (product) => {
    setFavorite((prev) => {
      const isFavorite = prev.some((item) => item.id === product.id);
      if (isFavorite) return prev;
      return [...prev, product];
    });
  };

  // Add to Cart with Quantity
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

  return (
    <ProductContext.Provider
      value={{ products, favorite, cartItems, addToFavorite, addToCart }}
    >
      {children}
    </ProductContext.Provider>
  );
};
