import React from 'react'
import axios from 'axios';

const CartContext = React.createContext()

function cartReducer(state, action) {
  switch (action.type) {
    case 'addProduct': {
      return addProductToCart(action.product, state);
    }
    case 'removeProduct': {
		return removeProductFromCart(action.product.id, state);
	  }
	  case 'checkout': {
		return checkout(state);
	  }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const checkout =  (state) => {
	
	for(let a=0;a<state.cart.length; a++){
		state.cart[a].stock = state.cart[a].stock - state.cart[a].quantity
		 axios.patch(`http://localhost:3004/grocery/${state.cart[a].id}`, {...state.cart[a] 
		})
	}
	return { ...state, cart: []}
}

const addProductToCart = (product, state) => {
  
    const updatedCart = [...state.cart];
	
	const updatedItemIndex = updatedCart.findIndex(
	item => item.id === product.id
	);

	if (updatedItemIndex < 0 && product.stock > 0) {
	updatedCart.push({ ...product, quantity: 1 });
	} else {
		const updatedItem = {
			...updatedCart[updatedItemIndex]
		};
		updatedItem.quantity++;
		if(updatedItem.quantity <= updatedItem.stock){
			updatedCart[updatedItemIndex] = updatedItem;
		}		
	}
    return { ...state, cart: updatedCart };
  
};

const removeProductFromCart = (productId, state) => {

  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(item => item.id === productId);

  const updatedItem = {
    ...updatedCart[updatedItemIndex]
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

function CartProvider({children}) {
  const [state, dispatch] = React.useReducer(cartReducer, {cart: []})
  const value = {state, dispatch}
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

function useCart() {
  const context = React.useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export {CartProvider, useCart}
