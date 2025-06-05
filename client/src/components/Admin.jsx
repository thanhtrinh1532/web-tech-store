import React, { useState } from "react";

const Admin = () => {
  // State giả lập sản phẩm và đơn hàng
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  // Thêm sản phẩm
  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ name: "", price: "" });
  };

  // Sửa sản phẩm
  const handleEditProduct = (id, newName, newPrice) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, name: newName, price: newPrice } : p
      )
    );
  };

  // Xóa sản phẩm
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý sản phẩm</h2>

      {/* Thêm sản phẩm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Giá"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Thêm
        </button>
      </div>

      {/* Danh sách sản phẩm */}
      <ul>
        {products.map((p) => (
          <li key={p.id} className="mb-2">
            <b>{p.name}</b> - {p.price} VND
            <button
              className="ml-2 bg-yellow-400 px-2 py-1 rounded"
              onClick={() =>
                handleEditProduct(
                  p.id,
                  prompt("Tên mới:", p.name),
                  prompt("Giá mới:", p.price)
                )
              }
            >
              Sửa
            </button>
            <button
              className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDeleteProduct(p.id)}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
