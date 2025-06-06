import { CartProvider } from "./context/CartContext"
import Header from "./components/Header"
import CartPage from "./pages/CartPage"
import ProductRecommendations from "./components/ProductRecommendations"
import "./App.css"

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <main>
          <CartPage />
          <ProductRecommendations />
        </main>
      </div>
    </CartProvider>
  )
}

export default App
