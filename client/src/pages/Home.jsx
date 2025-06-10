import React from "react";
import "./Home.css"; // Đường dẫn tương đối, đảm bảo file Home.css tồn tại

const Home = () => {
  return (
    <div className="home-container">
      {/* Banner */}
      <section className="banner">
        <h1 className="banner-title">Chào mừng đến trang chủ</h1>
        <p className="banner-subtitle">Cửa hàng thời trang uy tín, giá tốt, phục vụ tận tâm</p>
      </section>

      {/* Giới thiệu */}
      <section className="about-section">
        <h2 className="section-title">Về chúng tôi</h2>
        <p className="about-text">
          Shop web là nơi bạn có thể tìm thấy các sản phẩm thời trang chính hãng,
          dịch vụ tận tâm và đội ngũ hỗ trợ nhiệt tình. Chúng tôi cam kết mang lại trải nghiệm mua sắm tốt nhất cho bạn.
        </p>
      </section>
    </div>
  );
};

export default Home;