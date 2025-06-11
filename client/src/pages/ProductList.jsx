// src/pages/ProductList.jsx
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
    mainCategory: null, // 'nam', 'nữ'
    subCategories: [], // e.g., 'áo sơ mi', 'váy'
    minPrice: 0,
    maxPrice: 2000000,
    statuses: [],
    sortBy: '',
  });

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter(product => {
        // Lọc theo danh mục chính
        const mainCategoryMatch = !filters.mainCategory || product.gender === filters.mainCategory;

        // Lọc theo danh mục con (subCategory)
        const subCategoryMatch = filters.subCategories.length === 0 || filters.subCategories.includes(product.subCategory);

        const priceMatch = product.price >= filters.minPrice && product.price <= filters.maxPrice;

        // Lọc theo trạng thái
        let statusMatch = true;
        if (filters.statuses.length > 0) {
          statusMatch = filters.statuses.includes(product.status);
        }

        return mainCategoryMatch && subCategoryMatch && priceMatch && statusMatch;
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

  const handleMainCategoryChange = useCallback((category) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      mainCategory: prevFilters.mainCategory === category ? null : category, // Toggle main category
      subCategories: [], // Reset subcategories when main category changes
    }));
  }, []);

  const handleSubCategoryChange = useCallback((subCategory) => {
    setFilters(prevFilters => {
      const newSubCategories = prevFilters.subCategories.includes(subCategory)
        ? prevFilters.subCategories.filter(c => c !== subCategory)
        : [...prevFilters.subCategories, subCategory];
      return { ...prevFilters, subCategories: newSubCategories };
    });
  }, []);

  const handlePriceChange = useCallback((value) => {
    setFilters(prevFilters => ({ ...prevFilters, minPrice: value[0], maxPrice: value[1] }));
  }, []);

  const handleStatusChange = useCallback((status) => {
    setFilters(prevFilters => {
      const newStatuses = prevFilters.statuses.includes(status)
        ? prevFilters.statuses.filter(s => s !== status)
        : [...prevFilters.statuses, status];
      return { ...prevFilters, statuses: newStatuses };
    });
  }, []);

  const handleSortChange = useCallback((e) => {
    setFilters(prevFilters => ({ ...prevFilters, sortBy: e.target.value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      mainCategory: null,
      subCategories: [],
      minPrice: 0,
      maxPrice: 2000000,
      statuses: [],
      sortBy: '',
    });
  }, []);

  return {
    filteredProducts,
    filters,
    handleMainCategoryChange,
    handleSubCategoryChange,
    handlePriceChange,
    handleStatusChange,
    handleSortChange,
    resetFilters,
  };
};

const ProductList = () => {
  const allProducts = useMemo(() => [
    // Nữ
    { id: 1, name: "Váy maxi nữ", price: 800000, image: "https://via.placeholder.com/300/FFC0CB", category: "nữ", gender: "nữ", subCategory: "váy", status: "có sẵn" },
    { id: 2, name: "Đầm suông", price: 700000, image: "https://via.placeholder.com/300/FF69B4", category: "nữ", gender: "nữ", subCategory: "đầm", status: "có sẵn" },
    { id: 3, name: "Túi xách da", price: 1100000, image: "https://via.placeholder.com/300/DAA520", category: "phụ kiện", gender: "nữ", subCategory: "túi xách", status: "có sẵn" },
    { id: 4, name: "Váy hoa Vintage", price: 600000, image: "https://via.placeholder.com/300/BA55D3", category: "nữ", gender: "nữ", subCategory: "váy", status: "có sẵn" },
    { id: 5, name: "Đầm dạ hội", price: 1500000, image: "https://via.placeholder.com/300/C71585", category: "nữ", gender: "nữ", subCategory: "đầm", status: "có sẵn" },
    { id: 6, name: "Túi clutch dự tiệc", price: 400000, image: "https://via.placeholder.com/300/FFDAB9", category: "phụ kiện", gender: "nữ", subCategory: "túi xách", status: "hết hàng" },
    { id: 7, name: "Váy bút chì", price: 550000, image: "https://via.placeholder.com/300/ADD8E6", category: "nữ", gender: "nữ", subCategory: "váy", status: "có sẵn" },
    { id: 8, name: "Đầm công sở", price: 850000, image: "https://via.placeholder.com/300/DDA0DD", category: "nữ", gender: "nữ", subCategory: "đầm", status: "có sẵn" },
    { id: 9, name: "Túi đeo chéo", price: 700000, image: "https://via.placeholder.com/300/90EE90", category: "phụ kiện", gender: "nữ", subCategory: "túi xách", status: "có sẵn" },
    { id: 10, name: "Váy A-line", price: 480000, image: "https://via.placeholder.com/300/FFB6C1", category: "nữ", gender: "nữ", subCategory: "váy", status: "có sẵn" },

    // Nam
    { id: 11, name: "Áo sơ mi nam công sở", price: 450000, image: "https://via.placeholder.com/300/4682B4", category: "nam", gender: "nam", subCategory: "áo sơ mi", status: "có sẵn" },
    { id: 12, name: "Giày da nam", price: 900000, image: "https://via.placeholder.com/300/A52A2A", category: "nam", gender: "nam", subCategory: "giày", status: "có sẵn" },
    { id: 13, name: "Quần jean slim fit", price: 600000, image: "https://via.placeholder.com/300/5F9EA0", category: "nam", gender: "nam", subCategory: "quần jeans", status: "có sẵn" },
    { id: 14, name: "Quần short kaki", price: 300000, image: "https://via.placeholder.com/300/8B4513", category: "nam", gender: "nam", subCategory: "quần short", status: "có sẵn" },
    { id: 15, name: "Áo thun cotton", price: 250000, image: "https://via.placeholder.com/300/2F4F4F", category: "nam", gender: "nam", subCategory: "áo thun", status: "có sẵn" },
    { id: 16, name: "Áo sơ mi denim", price: 500000, image: "https://via.placeholder.com/300/6A5ACD", category: "nam", gender: "nam", subCategory: "áo sơ mi", status: "có sẵn" },
    { id: 17, name: "Giày thể thao nam", price: 1200000, image: "https://via.placeholder.com/300/48D1CC", category: "nam", gender: "nam", subCategory: "giày", status: "có sẵn" },
    { id: 18, name: "Quần jean rách", price: 650000, image: "https://via.placeholder.com/300/778899", category: "nam", gender: "nam", subCategory: "quần jeans", status: "có sẵn" },
    { id: 19, name: "Quần short jean", price: 320000, image: "https://via.placeholder.com/300/696969", category: "nam", gender: "nam", subCategory: "quần short", status: "có sẵn" },
    { id: 20, name: "Áo thun polo", price: 350000, image: "https://via.placeholder.com/300/D2B48C", category: "nam", gender: "nam", subCategory: "áo thun", status: "hết hàng" },
    { id: 21, name: "Áo khoác bomber", price: 950000, image: "https://via.placeholder.com/300/808080", category: "nam", gender: "nam", subCategory: "áo khoác", status: "có sẵn" },
    { id: 22, name: "Giày boot nam", price: 1500000, image: "https://via.placeholder.com/300/CD853F", category: "nam", gender: "nam", subCategory: "giày", status: "có sẵn" },
  ], []);

  const {
    filteredProducts,
    filters,
    handleMainCategoryChange,
    handleSubCategoryChange,
    handlePriceChange,
    handleStatusChange,
    handleSortChange,
    resetFilters,
  } = useProductFilter(allProducts);

  const [isAdding, setIsAdding] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20; // 5 cột * 4 hàng = 20 sản phẩm mỗi trang
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAddToCart = useCallback((productId) => {
    setIsAdding(productId);
    setTimeout(() => {
      setIsAdding(null);
      alert(`Sản phẩm ${productId} đã được thêm vào giỏ hàng!`);
    }, 1000);
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(prevPage => Math.max(1, prevPage - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(prevPage => Math.min(totalPages, prevPage + 1));
  }, [totalPages]);

  // Ensure page is reset if filters change significantly
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // Logic để hiển thị một số nút phân trang xung quanh trang hiện tại
  const renderPaginationButtons = useCallback(() => {
    const pageButtons = [];
    const maxButtons = 5; // Số lượng nút phân trang tối đa hiển thị
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    return pageButtons;
  }, [totalPages, currentPage, handlePageChange]);

  const maleSubCategories = useMemo(() => ["áo sơ mi", "giày", "quần jeans", "quần short", "áo thun"], []);
  const femaleSubCategories = useMemo(() => ["váy", "đầm", "túi xách"], []);

  return (
    <div className="home">
      <Header />
      <div className="product-list-page">
        <h1>Sản phẩm</h1>
        <div className="filter-sort-container">
          {/* Filters Section (Left Sidebar) */}
          <div className="filters-section">
            <h3>Bộ lọc</h3>
            <div className="filter-group">
              <h4>Danh mục</h4>
              <div className="main-category-options">
                <button
                  className={`main-category-button ${filters.mainCategory === 'nam' ? 'active' : ''}`}
                  onClick={() => handleMainCategoryChange('nam')}
                >
                  Nam
                </button>
                <button
                  className={`main-category-button ${filters.mainCategory === 'nữ' ? 'active' : ''}`}
                  onClick={() => handleMainCategoryChange('nữ')}
                >
                  Nữ
                </button>
              </div>

              {/* Sub-categories for Male */}
              {filters.mainCategory === 'nam' && (
                <div className="sub-category-options">
                  {maleSubCategories.map(subCat => (
                    <label key={subCat}>
                      <input
                        type="checkbox"
                        value={subCat}
                        checked={filters.subCategories.includes(subCat)}
                        onChange={() => handleSubCategoryChange(subCat)}
                      /> {subCat.charAt(0).toUpperCase() + subCat.slice(1)}
                    </label>
                  ))}
                </div>
              )}

              {/* Sub-categories for Female */}
              {filters.mainCategory === 'nữ' && (
                <div className="sub-category-options">
                  {femaleSubCategories.map(subCat => (
                    <label key={subCat}>
                      <input
                        type="checkbox"
                        value={subCat}
                        checked={filters.subCategories.includes(subCat)}
                        onChange={() => handleSubCategoryChange(subCat)}
                      /> {subCat.charAt(0).toUpperCase() + subCat.slice(1)}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-group">
              <h4>Giá</h4>
              <Slider
                range
                min={0}
                max={2000000}
                step={50000}
                value={[filters.minPrice, filters.maxPrice]}
                onChange={handlePriceChange}
                tipFormatter={value => `${value.toLocaleString()}đ`}
              />
              <div className="price-range">
                <span>{filters.minPrice.toLocaleString()}đ</span> - <span>{filters.maxPrice.toLocaleString()}đ</span>
              </div>
            </div>

            <div className="filter-group">
              <h4>Tình trạng</h4>
              <label>
                <input
                  type="checkbox"
                  value="có sẵn"
                  checked={filters.statuses.includes('có sẵn')}
                  onChange={() => handleStatusChange('có sẵn')}
                /> Có sẵn
              </label>
              <label>
                <input
                  type="checkbox"
                  value="hết hàng"
                  checked={filters.statuses.includes('hết hàng')}
                  onChange={() => handleStatusChange('hết hàng')}
                /> Hết hàng
              </label>
            </div>
            <button onClick={resetFilters} className="reset-filters-button">Đặt lại bộ lọc</button>
          </div>

          {/* Products Content (Main area) */}
          <div className="products-content">
            <div className="sort-by-dropdown-container" onClick={toggleDropdown}>
              <button className="dropdown-button">
                Sắp xếp theo: {
                  filters.sortBy === 'newest' ? 'Mới nhất' :
                    filters.sortBy === 'priceAsc' ? 'Giá tăng dần' :
                      filters.sortBy === 'priceDesc' ? 'Giá giảm dần' : 'Mặc định'
                }
              </button>
              {isDropdownOpen && (
                <div className="dropdown-content" onClick={e => e.stopPropagation()}> {/* Prevent closing when clicking inside */}
                  <label><input type="radio" name="sort" value="" checked={filters.sortBy === ''} onChange={handleSortChange} /> Mặc định</label>
                  <label><input type="radio" name="sort" value="newest" checked={filters.sortBy === 'newest'} onChange={handleSortChange} /> Mới nhất</label>
                  <label><input type="radio" name="sort" value="priceAsc" checked={filters.sortBy === 'priceAsc'} onChange={handleSortChange} /> Giá tăng dần</label>
                  <label><input type="radio" name="sort" value="priceDesc" checked={filters.sortBy === 'priceDesc'} onChange={handleSortChange} /> Giá giảm dần</label>
                </div>
              )}
            </div>
            <div className="products-grid-container">
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
                {renderPaginationButtons()}
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;