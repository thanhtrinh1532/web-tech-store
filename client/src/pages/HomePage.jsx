import ProductRecommendations from "../components/ProductRecommendations"
import "./HomePage.css"

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Chào mừng đến với HUNIVA Fashion</h1>
        <p>Khám phá bộ sưu tập thời trang mới nhất</p>
      </div>
      <ProductRecommendations />
    </div>
  )
}

export default HomePage
