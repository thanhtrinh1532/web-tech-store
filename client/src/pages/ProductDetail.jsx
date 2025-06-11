// src/pages/ProductDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ProductDetail.css'; // Sử dụng CSS mới

// Giả lập dữ liệu sản phẩm chi tiết
const productsData = [
  {
    id: 1,
    name: "Váy maxi nữ",
    price: 800000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Váy+maxi+nữ+1",
      "https://via.placeholder.com/500x500.png?text=Váy+maxi+nữ+2",
      "https://via.placeholder.com/500x500.png?text=Váy+maxi+nữ+3"
    ],
    description: "Váy maxi nữ tính, chất liệu voan mềm mại, bay bổng, phù hợp cho những buổi dạo phố hoặc đi biển. Thiết kế thanh lịch, màu sắc trang nhã, mang lại vẻ ngoài dịu dàng và cuốn hút. Sản phẩm có nhiều size để lựa chọn.",
    sizes: ["S", "M", "L", "XL"],
    status: "có sẵn"
  },
  {
    id: 2,
    name: "Áo sơ mi nữ",
    price: 450000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Áo+sơ+mi+nữ+1",
      "https://via.placeholder.com/500x500.png?text=Áo+sơ+mi+nữ+2",
      "https://via.placeholder.com/500x500.png?text=Áo+sơ+mi+nữ+3"
    ],
    description: "Áo sơ mi nữ kiểu dáng hiện đại, chất liệu cotton thoáng mát, thấm hút mồ hôi tốt. Phù hợp cho cả đi làm và đi chơi. Dễ dàng phối với quần jeans, chân váy để tạo nên nhiều phong cách khác nhau. Đường may tỉ mỉ, chắc chắn.",
    sizes: ["S", "M", "L"],
    status: "có sẵn"
  },
  {
    id: 3,
    name: "Áo croptop nữ",
    price: 300000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Áo+croptop+nữ+1",
      "https://via.placeholder.com/500x500.png?text=Áo+croptop+nữ+2"
    ],
    description: "Áo croptop năng động, trẻ trung, tôn dáng. Chất liệu thun co giãn, thoải mái khi vận động. Thích hợp cho những bạn gái yêu thích phong cách cá tính, hiện đại. Dễ dàng kết hợp với quần cạp cao hoặc chân váy.",
    sizes: ["S", "M"],
    status: "hết hàng"
  },
  {
    id: 4,
    name: "Quần culottes nữ",
    price: 350000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Quần+culottes+nữ+1",
      "https://via.placeholder.com/500x500.png?text=Quần+culottes+nữ+2"
    ],
    description: "Quần culottes ống rộng thoải mái, chất liệu vải mềm rủ, tạo cảm giác bay bổng khi di chuyển. Thiết kế lưng cao giúp 'hack' dáng hiệu quả. Phù hợp cho đi làm, đi chơi, tạo phong cách thanh lịch nhưng vẫn thời thượng.",
    sizes: ["M", "L", "XL"],
    status: "có sẵn"
  },
  {
    id: 5,
    name: "Áo hoodie nữ",
    price: 1200000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Áo+hoodie+nữ+1",
      "https://via.placeholder.com/500x500.png?text=Áo+hoodie+nữ+2",
      "https://via.placeholder.com/500x500.png?text=Áo+hoodie+nữ+3"
    ],
    description: "Áo hoodie nữ phong cách streetwear, chất liệu nỉ bông dày dặn, giữ ấm tốt. Thiết kế form rộng rãi, thoải mái, có mũ và túi tiện lợi. Thích hợp cho những ngày se lạnh hoặc phong cách cá tính. Nhiều màu sắc trẻ trung.",
    sizes: ["S", "M", "L", "XL"],
    status: "có sẵn"
  },
  {
    id: 6,
    name: "Chân váy denim",
    price: 400000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Chân+váy+denim+1",
      "https://via.placeholder.com/500x500.png?text=Chân+váy+denim+2"
    ],
    description: "Chân váy denim cá tính, dễ phối đồ. Chất liệu jean bền đẹp, không bai xù. Có thể kết hợp với áo thun, áo sơ mi để tạo nên nhiều phong cách khác nhau từ năng động đến thanh lịch. Sản phẩm không lỗi thời.",
    sizes: ["S", "M", "L"],
    status: "có sẵn"
  },
  {
    id: 7,
    name: "Áo polo nam",
    price: 500000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Áo+polo+nam+1",
      "https://via.placeholder.com/500x500.png?text=Áo+polo+nam+2",
      "https://via.placeholder.com/500x500.png?text=Áo+polo+nam+3"
    ],
    description: "Áo polo nam lịch lãm, chất liệu cotton cá sấu cao cấp, thoáng mát. Phù hợp cho đi làm, đi chơi golf, hoặc các sự kiện thường ngày. Thiết kế basic dễ mặc, tôn dáng, mang lại vẻ ngoài trẻ trung và năng động.",
    sizes: ["M", "L", "XL", "XXL"],
    status: "có sẵn"
  },
  {
    id: 8,
    name: "Quần jean nam",
    price: 600000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Quần+jean+nam+1",
      "https://via.placeholder.com/500x500.png?text=Quần+jean+nam+2"
    ],
    description: "Quần jean nam ống đứng, chất liệu denim cao cấp, bền màu. Form dáng chuẩn, tôn lên vẻ nam tính. Dễ dàng kết hợp với áo thun, áo sơ mi, áo khoác các loại. Sản phẩm không thể thiếu trong tủ đồ của phái mạnh.",
    sizes: ["29", "30", "31", "32", "34"],
    status: "có sẵn"
  },
  {
    id: 9,
    name: "Áo khoác da nam",
    price: 1500000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Áo+khoác+da+nam+1",
      "https://via.placeholder.com/500x500.png?text=Áo+khoác+da+nam+2"
    ],
    description: "Áo khoác da nam phong cách bụi bặm, chất liệu da PU cao cấp, bền đẹp theo thời gian. Thiết kế mạnh mẽ, cá tính, phù hợp cho những chuyến đi phượt hoặc phong cách đường phố. Giữ ấm tốt vào mùa đông.",
    sizes: ["M", "L", "XL"],
    status: "có sẵn"
  },
  {
    id: 10,
    name: "Áo thun nam",
    price: 250000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Áo+thun+nam+1",
      "https://via.placeholder.com/500x500.png?text=Áo+thun+nam+2",
      "https://via.placeholder.com/500x500.png?text=Áo+thun+nam+3"
    ],
    description: "Áo thun nam basic, chất liệu cotton 100% thoáng mát, mềm mại. Phù hợp mặc hàng ngày, tập thể thao. Đa dạng màu sắc, dễ dàng phối với mọi loại quần. Món đồ không thể thiếu trong tủ đồ nam giới.",
    sizes: ["S", "M", "L", "XL"],
    status: "có sẵn"
  },
  {
    id: 11,
    name: "Quần short nam",
    price: 300000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Quần+short+nam+1",
      "https://via.placeholder.com/500x500.png?text=Quần+short+nam+2"
    ],
    description: "Quần short nam năng động, chất liệu kaki thoáng mát, thoải mái vận động. Phù hợp cho đi chơi, đi biển, tập thể thao. Thiết kế trẻ trung, nhiều túi tiện lợi. Mang lại sự thoải mái tối đa trong mùa hè.",
    sizes: ["M", "L", "XL"],
    status: "có sẵn"
  },
  {
    id: 12,
    name: "Đầm suông",
    price: 700000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Đầm+suông+1",
      "https://via.placeholder.com/500x500.png?text=Đầm+suông+2"
    ],
    description: "Đầm suông thiết kế đơn giản nhưng tinh tế, che khuyết điểm tốt. Chất liệu linen thoáng mát, phù hợp cho mọi vóc dáng. Dễ dàng mặc đi làm, đi chơi, hoặc dự tiệc nhẹ. Phong cách thanh lịch, thoải mái.",
    sizes: ["S", "M", "L"],
    status: "có sẵn"
  },
  {
    id: 13,
    name: "Giày sneakers",
    price: 900000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Giày+sneakers+1",
      "https://via.placeholder.com/500x500.png?text=Giày+sneakers+2",
      "https://via.placeholder.com/500x500.png?text=Giày+sneakers+3"
    ],
    description: "Giày sneakers thời trang, đế êm ái, thoải mái di chuyển. Phù hợp cho cả nam và nữ. Dễ dàng kết hợp với trang phục năng động, thể thao. Chất liệu cao cấp, bền đẹp theo thời gian.",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    status: "có sẵn"
  },
  {
    id: 14,
    name: "Balo",
    price: 400000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Balo+1",
      "https://via.placeholder.com/500x500.png?text=Balo+2"
    ],
    description: "Balo đa năng, thiết kế hiện đại, nhiều ngăn tiện lợi. Chất liệu chống thấm nước, bền bỉ. Phù hợp cho đi học, đi làm, đi du lịch. Đựng được laptop và nhiều vật dụng cá nhân khác. Nhiều màu sắc trẻ trung.",
    sizes: ["Freesize"],
    status: "có sẵn"
  },
  {
    id: 15,
    name: "Áo blazer nữ",
    price: 950000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Áo+blazer+nữ+1",
      "https://via.placeholder.com/500x500.png?text=Áo+blazer+nữ+2"
    ],
    description: "Áo blazer nữ thanh lịch, form dáng chuẩn, tôn lên vẻ chuyên nghiệp. Chất liệu cao cấp, không nhăn. Dễ dàng phối với quần tây, chân váy hoặc quần jeans. Phù hợp cho môi trường công sở hoặc sự kiện quan trọng.",
    sizes: ["S", "M", "L"],
    status: "có sẵn"
  },
  {
    id: 16,
    name: "Quần tây nam",
    price: 550000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Quần+tây+nam+1",
      "https://via.placeholder.com/500x500.png?text=Quần+tây+nam+2"
    ],
    description: "Quần tây nam công sở, chất liệu vải cao cấp, đứng form. Thiết kế ống côn hiện đại, mang lại vẻ ngoài lịch lãm. Dễ dàng kết hợp với áo sơ mi, blazer. Phù hợp cho đi làm, dự tiệc. Đa dạng màu sắc.",
    sizes: ["29", "30", "31", "32", "33", "34"],
    status: "có sẵn"
  },
  {
    id: 17,
    name: "Túi xách",
    price: 1100000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Túi+xách+1",
      "https://via.placeholder.com/500x500.png?text=Túi+xách+2",
      "https://via.placeholder.com/500x500.png?text=Túi+xách+3"
    ],
    description: "Túi xách nữ thời trang, thiết kế sang trọng, chất liệu da tổng hợp cao cấp. Nhiều ngăn chứa tiện lợi. Phù hợp cho đi làm, đi chơi, dự tiệc. Dễ dàng phối với nhiều trang phục khác nhau. Quai đeo chắc chắn.",
    sizes: ["Freesize"],
    status: "có sẵn"
  },
  {
    id: 18,
    name: "Váy hoa",
    price: 600000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Váy+hoa+1",
      "https://via.placeholder.com/500x500.png?text=Váy+hoa+2"
    ],
    description: "Váy hoa nhí điệu đà, chất liệu voan nhẹ nhàng, thoáng mát. Thiết kế cổ V, tay bồng, tạo điểm nhấn nữ tính. Phù hợp cho những buổi dạo phố, hẹn hò. Họa tiết hoa tinh xảo, màu sắc tươi sáng.",
    sizes: ["S", "M", "L"],
    status: "có sẵn"
  },
  {
    id: 19,
    name: "Áo sơ mi caro nam",
    price: 400000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Áo+sơ+mi+caro+nam+1",
      "https://via.placeholder.com/500x500.png?text=Áo+sơ+mi+caro+nam+2"
    ],
    description: "Áo sơ mi caro nam phong cách trẻ trung, chất liệu cotton mềm mại. Dễ dàng phối với quần jean, quần short. Thích hợp cho đi học, đi chơi. Họa tiết caro không lỗi thời, mang lại vẻ ngoài năng động.",
    sizes: ["M", "L", "XL"],
    status: "có sẵn"
  },
  {
    id: 20,
    name: "Kính râm",
    price: 200000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Kính+râm+1",
      "https://via.placeholder.com/500x500.png?text=Kính+râm+2"
    ],
    description: "Kính râm thời trang, chống tia UV hiệu quả, bảo vệ mắt. Thiết kế gọng đa dạng, phù hợp với nhiều khuôn mặt. Phụ kiện không thể thiếu khi đi ra ngoài, du lịch. Mang lại vẻ ngoài sành điệu, đẳng cấp.",
    sizes: ["Freesize"],
    status: "có sẵn"
  },
  {
    id: 21,
    name: "Áo len nữ",
    price: 500000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Áo+len+nữ+1",
      "https://via.placeholder.com/500x500.png?text=Áo+len+nữ+2"
    ],
    description: "Áo len nữ mềm mại, ấm áp, chất liệu len cao cấp. Thiết kế đa dạng từ cổ tròn, cổ tim đến cổ lọ. Phù hợp cho mùa đông se lạnh. Dễ dàng phối với chân váy, quần jeans. Màu sắc phong phú.",
    sizes: ["S", "M", "L"],
    status: "có sẵn"
  },
  {
    id: 22,
    name: "Quần kaki nam",
    price: 480000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Quần+kaki+nam+1",
      "https://via.placeholder.com/500x500.png?text=Quần+kaki+nam+2"
    ],
    description: "Quần kaki nam năng động, chất liệu kaki dày dặn, bền màu. Form ống đứng hoặc ôm vừa vặn, thoải mái vận động. Phù hợp cho đi làm, đi chơi. Dễ dàng kết hợp với áo thun, áo sơ mi. Nhiều màu sắc cơ bản.",
    sizes: ["29", "30", "31", "32", "33", "34"],
    status: "có sẵn"
  },
  {
    id: 23,
    name: "Giày cao gót",
    price: 750000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Giày+cao+gót+1",
      "https://via.placeholder.com/500x500.png?text=Giày+cao+gót+2"
    ],
    description: "Giày cao gót sang trọng, mũi nhọn tôn dáng, gót chắc chắn. Chất liệu da mềm mại, không gây đau chân. Phù hợp cho đi làm, dự tiệc. Giúp bạn tự tin, quyến rũ hơn. Nhiều màu sắc và độ cao gót khác nhau.",
    sizes: ["35", "36", "37", "38", "39"],
    status: "hết hàng"
  },
  {
    id: 24,
    name: "Đồng hồ",
    price: 2000000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Đồng+hồ+1",
      "https://via.placeholder.com/500x500.png?text=Đồng+hồ+2"
    ],
    description: "Đồng hồ đeo tay cao cấp, thiết kế tinh xảo, mặt kính sapphire chống trầy. Dây đeo da hoặc kim loại bền đẹp. Phù hợp cho cả nam và nữ. Phụ kiện thể hiện đẳng cấp và phong cách của bạn.",
    sizes: ["Freesize"],
    status: "có sẵn"
  },
  {
    id: 25,
    name: "Váy bodycon",
    price: 650000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Váy+bodycon+1",
      "https://via.placeholder.com/500x500.png?text=Váy+bodycon+2"
    ],
    description: "Váy bodycon ôm sát cơ thể, tôn lên đường cong quyến rũ. Chất liệu thun co giãn, thoải mái. Phù hợp cho đi tiệc, sự kiện hoặc hẹn hò. Màu sắc đa dạng, phong cách gợi cảm, tự tin.",
    sizes: ["S", "M", "L"],
    status: "có sẵn"
  },
  {
    id: 26,
    name: "Áo vest nam",
    price: 1800000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Áo+vest+nam+1",
      "https://via.placeholder.com/500x500.png?text=Áo+vest+nam+2"
    ],
    description: "Áo vest nam lịch lãm, form dáng chuẩn, đường may tinh tế. Chất liệu vải cao cấp, đứng form, không nhăn. Phù hợp cho công sở, dự tiệc, sự kiện quan trọng. Kết hợp với quần tây và áo sơ mi để có bộ suit hoàn chỉnh.",
    sizes: ["M", "L", "XL", "XXL"],
    status: "có sẵn"
  },
  {
    id: 27,
    name: "Túi clutch",
    price: 400000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Túi+clutch+1",
      "https://via.placeholder.com/500x500.png?text=Túi+clutch+2"
    ],
    description: "Túi clutch cầm tay nhỏ gọn, thiết kế thanh lịch, sang trọng. Phù hợp cho đi tiệc, sự kiện. Đủ không gian để đựng điện thoại, ví tiền và một vài vật dụng nhỏ. Nhiều mẫu mã, màu sắc đa dạng.",
    sizes: ["Freesize"],
    status: "có sẵn"
  },
  {
    id: 28,
    name: "Mũ lưỡi trai",
    price: 150000,
    images: [
      "https://via.placeholder.com/500x500.png?text=Mũ+lưỡi+trai+1",
      "https://via.placeholder.com/500x500.png?text=Mũ+lưỡi+trai+2"
    ],
    description: "Mũ lưỡi trai năng động, chất liệu cotton thoáng mát, thấm hút mồ hôi. Thiết kế đơn giản, dễ phối đồ. Phù hợp cho các hoạt động ngoài trời, dạo phố. Nhiều màu sắc basic dễ lựa chọn.",
    sizes: ["Freesize"],
    status: "có sẵn"
  },
];

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Tìm sản phẩm trong dữ liệu giả lập
    const foundProduct = productsData.find(p => p.id === parseInt(productId));
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.images[0]); // Đặt ảnh chính là ảnh đầu tiên
      setSelectedSize(foundProduct.sizes[0]); // Chọn size đầu tiên làm mặc định
    } else {
      // Xử lý trường hợp không tìm thấy sản phẩm (ví dụ: chuyển hướng về trang 404 hoặc danh sách sản phẩm)
      console.error("Product not found");
      // navigate('/products'); // Có thể dùng useNavigate từ react-router-dom
    }
  }, [productId]);

  const handleThumbnailClick = useCallback((image) => {
    setMainImage(image);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    setIsAdding(true);
    // Logic thêm vào giỏ hàng
    console.log(`Thêm ${quantity} sản phẩm ${product.name} (Size: ${selectedSize}) vào giỏ hàng`);
    setTimeout(() => {
      setIsAdding(false);
      alert(`Đã thêm ${quantity} sản phẩm ${product.name} vào giỏ hàng!`);
    }, 1000);
  }, [product, quantity, selectedSize]);

  const handleBuyNow = useCallback(() => {
    if (!product) return;
    // Logic mua ngay
    console.log(`Mua ngay ${quantity} sản phẩm ${product.name} (Size: ${selectedSize})`);
    alert(`Chuyển đến trang thanh toán cho ${quantity} sản phẩm ${product.name}!`);
    // Thường sẽ chuyển hướng đến trang thanh toán với sản phẩm này
    // navigate('/checkout', { state: { product, quantity, selectedSize } });
  }, [product, quantity, selectedSize]);

  if (!product) {
    return (
      <div className="product-detail-page">
        <Header />
        <div className="product-detail-container" style={{ justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <p>Đang tải sản phẩm hoặc không tìm thấy sản phẩm...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price) => `${price.toLocaleString()}đ`;

  return (
    <div className="product-detail-page">
      <Header />
      <div className="product-detail-container">
        {/* Cột trái - Hình ảnh */}
        <div className="product-gallery">
          <div className="main-image">
            <img src={mainImage} alt={product.name} />
          </div>
          <div className="thumbnail-images">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={mainImage === img ? 'active' : ''}
                onClick={() => handleThumbnailClick(img)}
              />
            ))}
          </div>
        </div>

        {/* Cột phải - Thông tin sản phẩm */}
        <div className="product-info-column">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{formatPrice(product.price)}</p>

          <div className="product-meta">
            <span className={`product-status ${product.status === 'có sẵn' ? 'in-stock' : 'out-of-stock'}`}>
              Tình trạng: {product.status}
            </span>
            {/* Có thể thêm đánh giá sản phẩm ở đây */}
          </div>

          <div className="product-description-short">
            <h2>Mô tả ngắn</h2>
            <p>{product.description}</p>
          </div>

          <div className="product-options">
            <div className="size-selector">
              <h4>Kích thước:</h4>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    disabled={product.status === 'hết hàng'} // Disable size selection if out of stock
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="quantity-selector">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={product.status === 'hết hàng'}>-</button>
            <input type="text" value={quantity} readOnly />
            <button onClick={() => setQuantity(q => q + 1)} disabled={product.status === 'hết hàng'}>+</button>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart" onClick={handleAddToCart} disabled={isAdding || product.status === 'hết hàng'}>
              {isAdding ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
            </button>
            <button className="buy-now" onClick={handleBuyNow} disabled={product.status === 'hết hàng'}>
              Mua ngay
            </button>
          </div>

          <div className="info-line">
            <span>🚚 Dự kiến giao hàng: Thứ Sáu, Thg 13 – Thứ Ba, Thg 17</span>
          </div>
          <div className="info-line">
            <span>👀 29 người hiện đang xem nội dung này</span>
          </div>

        </div>
      </div>

      {/* Phần mô tả chi tiết */}
      <div className="product-full-description">
        <h2>Mô tả</h2>
        <p>{product.description}</p>
        {/* Thêm các chi tiết mô tả khác nếu có */}
        <ul>
            <li>Chất liệu: Cotton cao cấp</li>
            <li>Xuất xứ: Việt Nam</li>
            <li>Bảo hành: 1 tháng</li>
            <li>Hướng dẫn giặt ủi: Giặt máy nước lạnh, không tẩy, phơi khô trong bóng râm.</li>
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;