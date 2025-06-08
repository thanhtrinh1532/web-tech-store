import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ProductList.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdding, setIsAdding] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: 0,
    maxPrice: 2000000,
    statuses: [],
    sortBy: '',
    activeFilters: [],
  });
  const [showFilters, setShowFilters] = useState({
    category: false,
    price: false,
    status: false,
    sort: false,
  });

  const filteredProducts = products.filter(product => {
    const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
    const priceMatch = product.price >= filters.minPrice && product.price <= filters.maxPrice;
    const statusMatch = filters.statuses.length === 0 || filters.statuses.includes(product.status);
    return categoryMatch && priceMatch && statusMatch;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'newest':
        return b.id - a.id;
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const productsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleAddToCart = (productId) => {
    setIsAdding(productId);
    setTimeout(() => {
      setIsAdding(null);
      alert(`Đã thêm ${products.find(p => p.id === productId).name} vào giỏ hàng thành công!`);
    }, 1000);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const updatedCategories = checked
      ? [...filters.categories, value]
      : filters.categories.filter(cat => cat !== value);
    let updatedFilters = { ...filters, categories: updatedCategories };
    if (updatedCategories.length > 0) {
      updatedFilters.activeFilters = [...new Set([...filters.activeFilters, `Danh mục: ${updatedCategories.join(', ')}`])];
    } else {
      updatedFilters.activeFilters = filters.activeFilters.filter(f => !f.startsWith('Danh mục:'));
    }
    setFilters(updatedFilters);
    setShowFilters({ category: false, price: false, status: false, sort: false });
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    const { value, checked } = e.target;
    const updatedStatuses = checked
      ? [...filters.statuses, value]
      : filters.statuses.filter(stat => stat !== value);
    let updatedFilters = { ...filters, statuses: updatedStatuses };
    if (updatedStatuses.length > 0) {
      updatedFilters.activeFilters = [...new Set([...filters.activeFilters, `Tình trạng: ${updatedStatuses.join(', ')}`])];
    } else {
      updatedFilters.activeFilters = filters.activeFilters.filter(f => !f.startsWith('Tình trạng:'));
    }
    setFilters(updatedFilters);
    setShowFilters({ category: false, price: false, status: false, sort: false });
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    let updatedFilters = { ...filters, sortBy: value };
    if (value) {
      updatedFilters.activeFilters = [...new Set([...filters.activeFilters, `Sắp xếp: ${value === 'default' ? 'Mặc định' : value === 'newest' ? 'Mới nhất' : value === 'priceAsc' ? 'Giá: Tăng dần' : 'Giá: Giảm dần'}`])];
    } else {
      updatedFilters.activeFilters = filters.activeFilters.filter(f => !f.startsWith('Sắp xếp:'));
    }
    setFilters(updatedFilters);
    setShowFilters({ category: false, price: false, status: false, sort: false });
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (value) => {
    const [min, max] = value;
    let updatedFilters = { ...filters, minPrice: min, maxPrice: max };
    if (min !== 0 || max !== 2000000) {
      updatedFilters.activeFilters = [...new Set([...filters.activeFilters, `Giá: ${min.toLocaleString()}đ - ${max.toLocaleString()}đ`])];
    } else {
      updatedFilters.activeFilters = filters.activeFilters.filter(f => !f.startsWith('Giá:'));
    }
    setFilters(updatedFilters);
    setShowFilters({ category: false, price: false, status: false, sort: false });
    setCurrentPage(1);
  };

  const resetPriceRange = () => {
    setFilters(prev => ({
      ...prev,
      minPrice: 0,
      maxPrice: 2000000,
      activeFilters: prev.activeFilters.filter(f => !f.startsWith('Giá:')),
    }));
    setShowFilters({ category: false, price: false, status: false, sort: false });
    setCurrentPage(1);
  };

  const removeFilter = (filter) => {
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
    setCurrentPage(1);
  };

  const toggleFilter = (filterName) => {
    setShowFilters(prev => {
      const newShowFilters = { category: false, price: false, status: false, sort: false };
      return { ...newShowFilters, [filterName]: !prev[filterName] };
    });
  };

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
                    <label><input type="checkbox" value="tất cả" checked={filters.statuses.length === 0} onChange={(e) => { if (e.target.checked) setFilters(prev => ({ ...prev, statuses: [] })); }} /> Tất cả</label>
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
                Sắp xếp: Mặc định <span className="arrow">▼</span>
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
            <div className="filter-group view">
              <span>||| ||| |||</span>
            </div>
          </div>
          <div className="products-section">
            <div className="products">
              {currentProducts.map(product => (
                <div key={product.id} className="product-item">
                  <div className="product-image">
                    {!imageLoaded[product.id] && <div className="spinner"></div>}
                    <img
                      src={product.image}
                      alt={product.name}
                      onLoad={() => setImageLoaded(prev => ({ ...prev, [product.id]: true }))}
                      onError={() => setImageLoaded(prev => ({ ...prev, [product.id]: true }))}
                      style={{ display: imageLoaded[product.id] ? 'block' : 'none' }}
                    />
                  </div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>{product.price.toLocaleString()}đ</p>
                    <p>Tình trạng: {product.status}</p>
                    <button
                      className="add-to-cart"
                      onClick={() => !isAdding && handleAddToCart(product.id)}
                      disabled={isAdding === product.id}
                    >
                      {isAdding === product.id ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
                    </button>
                  </div>
                </div>
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