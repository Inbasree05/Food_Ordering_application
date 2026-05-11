import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    const savedAddress = localStorage.getItem('shippingAddress');
    const savedPayment = localStorage.getItem('paymentMethod');
    
    if (savedCart) {
      try { setCartItems(JSON.parse(savedCart)); } catch (e) {}
    }
    if (savedAddress) {
      try { setShippingAddress(JSON.parse(savedAddress)); } catch (e) {}
    }
    if (savedPayment) {
      try { setPaymentMethod(JSON.parse(savedPayment)); } catch (e) {}
    }
  }, []);

  // Save to local storage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (food) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === food._id);
      if (existingItem) {
        // If it exists, increase quantity
        return prevItems.map((item) =>
          item._id === food._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        // Add new item with qty 1
        return [...prevItems, { ...food, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, qty: Number(qty) } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const saveShippingAddress = (data) => {
    setShippingAddress(data);
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

  const savePaymentMethod = (data) => {
    setPaymentMethod(data);
    localStorage.setItem('paymentMethod', JSON.stringify(data));
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
      shippingAddress, saveShippingAddress,
      paymentMethod, savePaymentMethod
    }}>
      {children}
    </CartContext.Provider>
  );
};
