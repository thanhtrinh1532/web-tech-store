import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import './Home.css'

const Home = () => {
  // Dữ liệu sản phẩm mẫu
  const [products] = useState([
    {
      id: 1,
      name: 'Áo thun BEST LOVE',
      price: 29.99,
      image: '/placeholder.svg?height=250&width=220',
      isHot: false,
      isNew: true,
      discount: 30
    },
    {
      id: 2,
      name: 'Áo thun xanh rêu',
      price: 34.99,
      image: '/placeholder.svg?height=250&width=220',
      isHot: false,
      isNew: true,
      discount: 0,
      limitedStock: true
    },
    {
      id: 3,
      name: 'Áo khoác vàng',
      price: 59.99,
      image: '/placeholder.svg?height=250&width=220',
      isHot: true,
      isNew: true,
      discount: 0
    },
    {
      id: 4,
      name: 'Áo sơ mi xanh nhạt',
      price: 45.99,
      image: '/placeholder.svg?height=250&width=220',
      isHot: true,
      isNew: true,
      discount: 0
    },
    {
      id: 5,
      name: 'Áo thun hồng',
      price: 32.99,
      image: '/placeholder.svg?height=250&width=220',
      isHot: false,
      isNew: true,
      discount: 0
    }
  ])

  return (
    <div className="home-container">
      <h1>Sản phẩm khuyến cáo</h1>

      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home