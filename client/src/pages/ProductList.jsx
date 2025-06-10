import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './ProductList.css';

/**
 * Custom hook to manage product filtering and sorting
 * @param {Array} initialProducts - Initial list of products
 * @returns {Object} Filtered products, filter state, and handlers
 */
const useProductFilter = (initialProducts) => {
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: 0,
    maxPrice: 2000000,
    statuses: [],
    sortBy: '',
    activeFilters: [],
  });

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter(product => {
        const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
        const priceMatch = product.price >= filters.minPrice && product.price <= filters.maxPrice;
        const statusMatch = filters.statuses.length === 0 || filters.statuses.includes(product.status);
        return categoryMatch && priceMatch && statusMatch;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'newest': return b.id - a.id;
          case 'priceAsc': return a.price - b.price;
          case 'priceDesc': return b.price - a.price;
          default: return 0;
        }
      });
  }, [initialProducts, filters]);

  const handleCategoryChange = useCallback((e) => {
    const { value, checked } = e.target;
    setFilters(prev => {
      const updatedCategories = checked
        ? [...prev.categories, value]
        : prev.categories.filter(cat => cat !== value);
      const activeFilters = updatedCategories.length > 0
        ? [...new Set([...prev.activeFilters, `Danh mục: ${updatedCategories.join(', ')}`])]
        : prev.activeFilters.filter(f => !f.startsWith('Danh mục:'));
      return { ...prev, categories: updatedCategories, activeFilters };
    });
  }, []);

  const handleStatusChange = useCallback((e) => {
    const { value, checked } = e.target;
    setFilters(prev => {
      const updatedStatuses = checked
        ? [...prev.statuses, value]
        : prev.statuses.filter(stat => stat !== value);
      const activeFilters = updatedStatuses.length > 0
        ? [...new Set([...prev.activeFilters, `Tình trạng: ${updatedStatuses.join(', ')}`])]
        : prev.activeFilters.filter(f => !f.startsWith('Tình trạng:'));
      return { ...prev, statuses: updatedStatuses, activeFilters };
    });
  }, []);

  const handleSortChange = useCallback((e) => {
    const value = e.target.value;
    setFilters(prev => {
      const activeFilters = value
        ? [...new Set([...prev.activeFilters, `Sắp xếp: ${value === 'default' ? 'Mặc định' : value === 'newest' ? 'Mới nhất' : value === 'priceAsc' ? 'Giá: Tăng dần' : 'Giá: Giảm dần'}`])]
        : prev.activeFilters.filter(f => !f.startsWith('Sắp xếp:'));
      return { ...prev, sortBy: value, activeFilters };
    });
  }, []);

  const handlePriceRangeChange = useCallback((value) => {
    const [min, max] = value;
    setFilters(prev => {
      const activeFilters = min !== 0 || max !== 2000000
        ? [...new Set([...prev.activeFilters, `Giá: ${min.toLocaleString()}đ - ${max.toLocaleString()}đ`])]
        : prev.activeFilters.filter(f => !f.startsWith('Giá:'));
      return { ...prev, minPrice: min, maxPrice: max, activeFilters };
    });
  }, []);

  const resetPriceRange = useCallback(() => {
    setFilters(prev => ({
      ...prev,
      minPrice: 0,
      maxPrice: 2000000,
      activeFilters: prev.activeFilters.filter(f => !f.startsWith('Giá:')),
    }));
  }, []);

  const removeFilter = useCallback((filter) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (filter.startsWith('Danh mục:')) newFilters.categories = [];
      if (filter.startsWith('Tình trạng:')) newFilters.statuses = [];
      if (filter.startsWith('Sắp xếp:')) newFilters.sortBy = '';
      if (filter.startsWith('Giá:')) {
        newFilters.minPrice = 0;
        newFilters.maxPrice = 2000000;
      }
      newFilters.activeFilters = prev.activeFilters.filter(f => f !== filter);
      return newFilters;
    });
  }, []);

  return {
    filteredProducts,
    filters,
    handleCategoryChange,
    handleStatusChange,
    handleSortChange,
    handlePriceRangeChange,
    resetPriceRange,
    removeFilter,
  };
};

/**
 * ProductList component displays a paginated list of products with filters
 */
const ProductList = () => {
  const [products] = useState([
    { id: 1, name: "Áo thun nam đen", price: 250000, image: "https://via.placeholder.com/300", category: "nam", status: "có sẵn" },
    { id: 2, name: "Áo sơ mi nữ trắng", price: 450000, image: "https://via.placeholder.com/300", category: "nữ", status: "sale" },
    { id: 3, name: "Quần jeans nam", price: 600000, image: "https://via.placeholder.com/300", category: "nam", status: "đặt trước" },
    { id: 4, name: "Váy maxi nữ", price: 800000, image: "https://via.placeholder.com/300", category: "nữ", status: "có sẵn" },
    { id: 5, name: "Áo khoác nam", price: 1000000, image: "https://via.placeholder.com/300", category: "nam", status: "sale" },
    { id: 6, name: "Đầm dự tiệc nữ", price: 1200000, image: "https://via.placeholder.com/300", category: "nữ", status: "đặt trước" },
    { id: 7, name: "Áo hoodie nam", price: 350000, image: "https://via.placeholder.com/300", category: "nam", status: "có sẵn" },
    { id: 8, name: "Áo croptop nữ", price: 300000, image: "https://via.placeholder.com/300", category: "nữ", status: "sale" },
    // Thêm dữ liệu giả để kiểm tra phân trang (tổng cộng 50 sản phẩm)
    ...Array.from({ length: 42 }, (_, i) => ({
      id: 9 + i,
      name: `Sản phẩm ${9 + i}`,
      price: 200000 + (i * 10000),
      image: "https://via.placeholder.com/300",
      category: i % 2 === 0 ? "nam" : "nữ",
      status: ["có sẵn", "sale", "đặt trước"][i % 3],
    })),
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isAdding, setIsAdding] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});
  const [showFilters, setShowFilters] = useState({
    category: false,
    price: false,
    status: false,
    sort: false,
  });

  const {
    filteredProducts,
    filters,
    handleCategoryChange,
    handleStatusChange,
    handleSortChange,
    handlePriceRangeChange,
    resetPriceRange,
    removeFilter,
  } = useProductFilter(products);

  const productsPerPage = 48; // 6 cột x 8 hàng
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const handleAddToCart = useCallback((productId) => {
    setIsAdding(productId);
    setTimeout(() => {
      setIsAdding(null);
      alert(`Đã thêm ${products.find(p => p.id === productId).name} vào giỏ hàng thành công!`);
    }, 1000);
  }, [products]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const toggleFilter = useCallback((filterName) => {
    setShowFilters(prev => ({
      category: false,
      price: false,
      status: false,
      sort: false,
      [filterName]: !prev[filterName],
    }));
  }, []);

  useEffect(() => {
    currentProducts.forEach(product => {
      const img = new Image();
      img.src = product.image;
      img.onload = () => setImageLoaded(prev => ({ ...prev, [product.id]: true }));
      img.onerror = () => setImageLoaded(prev => ({ ...prev, [product.id]: true }));
    });
  }, [currentProducts]);

  return (
    <div className="home">
      <Header />
      <div className="product-list">
        <div className="filter-section">
          {filters.activeFilters.length > 0 && (
            <div className="active-filters">
              {filters.activeFilters.map((filter, index) => (
                <span key={index} className="active-filter" onClick={() => removeFilter(filter)}>
                  {filter} <span className="remove">×</span>
                </span>
              ))}
            </div>
          )}
          <div className="filters-horizontal">
            <div className="filter-group">
              <button onClick={() => toggleFilter('category')} className="filter-toggle">
                Danh mục <span className="arrow">▼</span>
              </button>
              {showFilters.category && (
                <div className="filter-panel">
                  <div className="filter-content">
                    <label><input type="checkbox" value="nam" checked={filters.categories.includes('nam')} onChange={handleCategoryChange} /> Nam</label>
                    <label><input type="checkbox" value="nữ" checked={filters.categories.includes('nữ')} onChange={handleCategoryChange} /> Nữ</label>
                  </div>
                </div>
              )}
            </div>
            <div className="filter-group">
              <button onClick={() => toggleFilter('price')} className="filter-toggle">
                Giá <span className="arrow">▼</span>
              </button>
              {showFilters.price && (
                <div className="filter-panel">
                  <div className="filter-content">
                    <Slider
                      range
                      min={0}
                      max={2000000}
                      step={10000}
                      value={[filters.minPrice, filters.maxPrice]}
                      onChange={handlePriceRangeChange}
                      style={{ width: '200px', margin: '10px 0' }}
                    />
                    <div className="price-range-display">
                      <span>Min: {filters.minPrice.toLocaleString()}đ - Max: {filters.maxPrice.toLocaleString()}đ</span>
                    </div>
                    <div className="price-control">
                      <span>Giá: {filters.minPrice.toLocaleString()}đ - {filters.maxPrice.toLocaleString()}đ</span>
                      {(filters.minPrice !== 0 || filters.maxPrice !== 2000000) && (
                        <button onClick={resetPriceRange} className="reset-button">Đặt lại</button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="filter-group">
              <button onClick={() => toggleFilter('status')} className="filter-toggle">
                Tình trạng <span className="arrow">▼</span>
              </button>
              {showFilters.status && (
                <div className="filter-panel">
                  <div className="filter-content">
                    <label><input type="checkbox" value="tất cả" checked={filters.statuses.length === 0} onChange={() => setFilters(prev => ({ ...prev, statuses: [] }))} /> Tất cả</label>
                    <label><input type="checkbox" value="sale" checked={filters.statuses.includes('sale')} onChange={handleStatusChange} /> Sale</label>
                    <label><input type="checkbox" value="có sẵn" checked={filters.statuses.includes('có sẵn')} onChange={handleStatusChange} /> Có sẵn</label>
                    <label><input type="checkbox" value="đặt trước" checked={filters.statuses.includes('đặt trước')} onChange={handleStatusChange} /> Đặt trước</label>
                  </div>
                </div>
              )}
            </div>
            <div className="filter-group result">
              <span>{filteredProducts.length} kết quả</span>
            </div>
            <div className="filter-group">
              <button onClick={() => toggleFilter('sort')} className="filter-toggle">
                Sắp xếp: {filters.sortBy === '' ? 'Mặc định' : filters.sortBy === 'newest' ? 'Mới nhất' : filters.sortBy === 'priceAsc' ? 'Giá: Tăng dần' : 'Giá: Giảm dần'} <span className="arrow">▼</span>
              </button>
              {showFilters.sort && (
                <div className="filter-panel">
                  <div className="filter-content">
                    <label><input type="radio" name="sort" value="" checked={!filters.sortBy} onChange={handleSortChange} /> Mặc định</label>
                    <label><input type="radio" name="sort" value="newest" checked={filters.sortBy === 'newest'} onChange={handleSortChange} /> Mới nhất</label>
                    <label><input type="radio" name="sort" value="priceAsc" checked={filters.sortBy === 'priceAsc'} onChange={handleSortChange} /> Tăng dần</label>
                    <label><input type="radio" name="sort" value="priceDesc" checked={filters.sortBy === 'priceDesc'} onChange={handleSortChange} /> Giảm dần</label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="products-section">
            <div className="products">
              {currentProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdding={isAdding}
                  handleAddToCart={handleAddToCart}
                  imageLoaded={imageLoaded}
                  setImageLoaded={setImageLoaded}
                />
              ))}
            </div>
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Trước
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    <Footer />
    </div>
  );
};

export default ProductList;
