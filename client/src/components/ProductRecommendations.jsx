import { useCart } from "../context/CartContext"
import "./ProductRecommendations.css"

const ProductRecommendations = () => {
  const { addToCart } = useCart()

  // Dữ liệu sản phẩm mẫu
  const recommendedProducts = [
    {
      id: 1,
      name: "Áo thun BESTLOVE",
      price: 299000,
      originalPrice: 399000,
      image: "/placeholder.svg?height=300&width=300",
      badge: "PHỔ BIẾN",
      discount: "-25%",
      color: "Đen",
      size: "M",
    },
    {
      id: 2,
      name: "Áo thun basic",
      price: 199000,
      originalPrice: 299000,
      image: "/placeholder.svg?height=300&width=300",
      badge: "PHỔ BIẾN",
      discount: "CÓ LƯỢNG LỚN",
      color: "Xanh rêu",
      size: "L",
    },
    {
      id: 3,
      name: "Áo hoodie vàng",
      price: 599000,
      image: "/placeholder.svg?height=300&width=300",
      badge: "HOT",
      color: "Vàng",
      size: "M",
    },
    {
      id: 4,
      name: "Áo sơ mi xanh",
      price: 399000,
      image: "/placeholder.svg?height=300&width=300",
      badge: "HOT",
      color: "Xanh dương",
      size: "L",
    },
    {
      id: 5,
      name: "Áo thun hồng",
      price: 249000,
      image: "/placeholder.svg?height=300&width=300",
      badge: "PHỔ BIẾN",
      color: "Hồng",
      size: "S",
    },
  ]

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = (product) => {
    addToCart(product)
    // Hiển thị thông báo
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`)
  }

  // Xử lý thêm vào wishlist
  const handleAddToWishlist = (product) => {
    console.log("Thêm vào wishlist:", product.name)
    alert(`Đã thêm "${product.name}" vào danh sách yêu thích!`)
  }

  return (
    <div className="product-recommendations">
      <div className="container">
        <h2>Sản phẩm khuyến cáo</h2>

        <div className="products-grid">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img 
                  src={product.image || "/placeholder.svg"} 
                  alt={product.name}
                  loading="lazy"
                />
                
                {/* Badges */}
                <div className="product-badges">
                  <span className={`badge ${product.badge === "HOT" ? "hot" : "popular"}`}>
                    {product.badge}
                  </span>
                  {product.discount && (
                    <span className="discount-badge">{product.discount}</span>
                  )}
                </div>
                
                {/* Nút wishlist */}
                <button 
                  className="wishlist-btn"
                  onClick={() => handleAddToWishlist(product)}
                  title="Thêm vào yêu thích"
                >
                  ♡
                </button>

                {/* Overlay khi hover */}
                <div className="product-overlay">
                  <button 
                    className="quick-add-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Thêm nhanh
                  </button>
                </div>
              </div>

              <div className="product-info">
                <h4>{product.name}</h4>
                <div className="product-attributes">
                  <span>Màu: {product.color}</span>
                  <span>Size: {product.size}</span>
                </div>
                <div className="product-price">
                  <span className="current-price">
                    {product.price.toLocaleString("vi-VN")}₫
                  </span>
                  {product.originalPrice && (
                    <span className="original-price">
                      {product.originalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  )}
                </div>
                <button 
                  className="add-to-cart-btn" 
                  onClick={() => handleAddToCart(product)}
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductRecommendations