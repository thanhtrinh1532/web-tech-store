import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProductList from './pages/ProductList.jsx';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;