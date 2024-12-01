import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

// import { productsData } from './data.js';

import productsData from './products.json';

import i18next from './i18n';

const ProductContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData.products);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Search and LocalStorage States
  const [searchQuery, setSearchQuery] = useState(() => {
    try {
      const savedSearch = localStorage.getItem('searchQuery');
      return savedSearch ? JSON.parse(savedSearch) : '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
  }, [searchQuery]);

  // Firebase Authentication Functions
  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.error('Error:', error.code, error.message);
      throw error;
    }
  };

  const logIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error('Error:', error.code, error.message);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error:', error.code, error.message);
      throw error;
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Handle Product, Favorite, and Cart State (existing functionality)
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

  const modifyCartItemQuantity = (product, delta) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev
          .map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + delta }
              : item
          )
          .filter((item) => item.quantity > 0);
      }
      if (delta > 0) {
        return [...prev, { ...product, quantity: delta }];
      }
      return prev;
    });
  };

  const addToCart = (product, quantity = 1) =>
    modifyCartItemQuantity(product, quantity);

  const handleIncrease = (product) => modifyCartItemQuantity(product, 1);

  const handleDecrease = (product) => modifyCartItemQuantity(product, -1);

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

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };
  const clearCart = () => {
    setCartItems([]);
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

  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    const updateDirection = () => {
      const currentLang = i18next.language;
      setDirection(currentLang === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    };

    updateDirection(); // Set direction initially
    i18next.on('languageChanged', updateDirection); // Update direction on language change

    return () => {
      i18next.off('languageChanged', updateDirection); // Cleanup
    };
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        // User Authentication
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
        signUp,
        logIn,
        logOut,

        // Product, Favorite, and Cart Functions (existing functionality)
        favorite,
        setFavorite,
        cartItems,
        setCartItems,
        addToFavorite,
        removeFromFavorite,
        addToCart,
        addToBag,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        handleIncrease,
        handleDecrease,
        // Search Query
        searchQuery,
        setSearchQuery,
        // Translation
        direction,
        setDirection,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
