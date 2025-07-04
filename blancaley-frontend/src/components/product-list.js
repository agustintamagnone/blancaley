"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCart } from "./context/cart-context";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener productos:", err);
      });
  }, []);

  const groupedProducts = products.reduce((acc, product) => {
    const cat = product.productCategory || "Sin Categoría";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  const formatCategory = (category) => {
    return category
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-5xl text-orange-500 font-extrabold mb-10 text-center">
        Nuestros Productos
      </h2>

      {Object.entries(groupedProducts).map(([category, productos]) => (
        <div key={category} className="mb-16">
          <h3 className="text-3xl font-bold mb-6 text-center text-orange-500">
            {formatCategory(category)}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {productos.map((product) => (
              <div key={product.productId} className="flex flex-col justify-between h-full border p-4 rounded shadow-sm bg-white">
                <div className="flex justify-center items-center h-60 mb-4">
                  <Image
                    src={`/${product.imageUrl}`}
                    alt={product.productName}
                    width={140}
                    height={140}
                    className="object-contain"
                  />
                </div>
                <h4 className="text-lg font-semibold text-center md:text-left mb-1">
                  {product.productName}
                </h4>
                <p className="text-xs text-gray-400 mb-2 text-center md:text-left">
                  {product.productType}
                </p>
                <p className="text-sm text-gray-600 mb-2 text-center md:text-left">
                  {product.productDescription}
                </p>
                <p className="font-bold text-orange-600 mb-4 text-center md:text-left">
                  ${product.productPrice.toFixed(2)}
                </p>
                <Button onClick={() => addToCart(product)} variant="default" size="lg">
                  Agregar a Carrito
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
