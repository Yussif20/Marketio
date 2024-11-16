import { createContext, useState, useContext, useEffect } from 'react';
import { productsData } from './data.js';
import { auth, db } from './firebase'; // Import Firestore
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore'; // Firestore functions

// Create a global AppContext
const ProductContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData);

  // User Authentication States
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // User-specific Data States
  const [userData, setUserData] = useState(null);

  // Search and LocalStorage States
  const [searchQuery, setSearchQuery] = useState(() => {
    const savedSearch = localStorage.getItem('searchQuery');
    return savedSearch ? JSON.parse(savedSearch) : '';
  });
  useEffect(() => {
    localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
  }, [searchQuery]);

  // Listen for auth state changes and fetch Firestore data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        // Fetch user data from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribeUserData = onSnapshot(userDocRef, (snapshot) => {
          setUserData(snapshot.exists() ? snapshot.data() : null);
        });

        return () => unsubscribeUserData();
      } else {
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  // Firebase Authentication Functions
  const signUp = async (email, password, additionalData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save additional user data to Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { email: user.email, ...additionalData });

      return user;
    } catch (error) {
      console.error('Error signing up:', error);
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
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

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

  const clearFavorites = () => setFavorite([]);
  const clearCart = () => setCartItems([]);

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

  const handleIncrease = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleDecrease = (product) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        // User Authentication
        currentUser,
        loading,
        signUp,
        logIn,
        logOut,
        // User Data
        userData,
        setUserData,
        // Product, Favorite, and Cart Functions (existing functionality)
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
        handleIncrease,
        handleDecrease,
        // Search Query
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
