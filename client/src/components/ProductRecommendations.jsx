import { useCart } from "../context/CartContext"
import "./ProductRecommendations.css"

const ProductRecommendations = () => {
  const { addToCart } = useCart()

  const recommendedProducts = [
    {
      id: 1,
      name: "Áo thun BESTLOVE",
      price: 299000,
      originalPrice: 599000,
      image: "/placeholder.svg?height=200&width=200",
      badge: "PHỔ BIẾN",
      discount: "-50%",
      sku: "SP001",
    },
    {
      id: 2,
      name: "Áo thun cổ tròn",
      price: 199000,
      image: "/placeholder.svg?height=200&width=200",
      badge: "PHỔ BIẾN",
      soldOut: "SỐ LƯỢNG HẠN CHẾ",
      sku: "SP002",
    },
    {
      id: 3,
      name: "Áo hoodie vàng",
      price: 399000,
      image: "/placeholder.svg?height=200&width=200",
      badge: "HOT",
      popular: "PHỔ BIẾN",
      sku: "SP003",
    },
    {
      id: 4,
      name: "Áo sơ mi xanh",
      price: 349000,
      image: "/placeholder.svg?height=200&width=200",
      badge: "HOT",
      popular: "PHỔ BIẾN",
      sku: "SP004",
    },
    {
      id: 5,
      name: "Áo thun hồng",
      price: 249000,
      image: "/placeholder.svg?height=200&width=200",
      badge: "PHỔ BIẾN",
      sku: "SP005",
    },
  ]

  const handleAddToCart = (product) => {
    addToCart(product)
    alert(`Đã thêm ${product.name} vào giỏ hàng!`)
  }

  return (
    <div className="product-recommendations">
      <h2>Sản phẩm khuyến cáo</h2>

      <div className="products-grid">
        {recommendedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image || "/placeholder.svg"} alt={product.name} />
              <div className="product-badges">
                {product.badge && (
                  <span className={`badge ${product.badge === "HOT" ? "hot" : "popular"}`}>{product.badge}</span>
                )}
                {product.discount && <span className="badge discount">{product.discount}</span>}
                {product.soldOut && <span className="badge sold-out">{product.soldOut}</span>}
                {product.popular && <span className="badge popular">{product.popular}</span>}
              </div>
              <button className="wishlist-btn">♡</button>
            </div>

            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="product-prices">
                <span className="current-price">{product.price.toLocaleString("vi-VN")}₫</span>
                {product.originalPrice && (
                  <span className="original-price">{product.originalPrice.toLocaleString("vi-VN")}₫</span>
                )}
              </div>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductRecommendations