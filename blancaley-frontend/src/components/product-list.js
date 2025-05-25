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

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 p-8">
      <h2 className="text-4xl text-orange-500 font-extrabold mb-6 text-center">Nuestros Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
        {products.map((product) => (
          <div key={product.productId} className="flex flex-col justify-between h-full border p-4 rounded shadow-sm">
            <Image
              src={`/${product.imageUrl}`}
              alt={product.productName}
              width={200}
              height={200}
              className="mb-4 rounded"
            />
            <h3 className="text-xl font-semibold">{product.productName}</h3>
            <p className="text-sm text-gray-500 mb-2">{product.productDescription}</p>
            <p className="font-bold text-orange-600 mb-4">${product.productPrice}</p>
            <Button onClick={() => addToCart(product)} variant={"default"} size={"sm"}>Agregar a Carrito</Button>
          </div>
        ))}
      </div>
    </section>
  );
}
