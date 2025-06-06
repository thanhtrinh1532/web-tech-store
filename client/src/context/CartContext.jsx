import { createContext, useContext, useReducer } from "react"

// Tạo Context
const CartContext = createContext()

// Reducer để quản lý state của giỏ hàng
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Kiểm tra sản phẩm đã có trong giỏ chưa
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        // Nếu có rồi thì tăng số lượng
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          ),
        }
      }
      // Nếu chưa có thì thêm mới với quantity = 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }

    case "REMOVE_FROM_CART":
      // Xóa sản phẩm khỏi giỏ hàng
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case "UPDATE_QUANTITY":
      // Cập nhật số lượng sản phẩm
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id 
              ? { ...item, quantity: Math.max(0, action.payload.quantity) } 
              : item
          )
          .filter((item) => item.quantity > 0), // Loại bỏ sản phẩm có quantity = 0
      }

    case "CLEAR_CART":
      // Xóa toàn bộ giỏ hàng
      return {
        ...state,
        items: [],
      }

    default:
      return state
  }
}

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Các function để tương tác với giỏ hàng
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  // Tính tổng tiền giỏ hàng
  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Tính tổng số lượng sản phẩm
  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook để sử dụng CartContext
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}