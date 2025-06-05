"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/context/cart-context";


export default function OrderConfirmation() {
  const [confirmedItems, setConfirmedItems] = useState([]);
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const { clearCart } = useCart();

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastConfirmedOrder");
    if (savedOrder) {
      const parsed = JSON.parse(savedOrder);
      setConfirmedItems(parsed.items || []);
      setConfirmedTotal(parsed.totalPrice || 0);
      localStorage.removeItem("lastConfirmedOrder"); // limpia el almacenamiento
    }
  
    clearCart(); // limpia visualmente el carrito
  }, []);
  

  return (
    <section className="min-h-screen pt-50 pb-20 flex flex-col items-center justify-center bg-white px-4 py-">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-md max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-gray-700 mb-6">
          Tu pedido ha sido confirmado correctamente. Agradecemos que hayas confiado en <strong>Blancaley</strong>.
        </p>

        <div className="text-left mb-6">
          <h2 className="text-xl font-semibold mb-2">Resumen del pedido:</h2>
          <ul className="space-y-4">
            {confirmedItems.map((item, index) => (
              <li key={index} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-3">
                  <Image
                    src={`/${item.imageUrl}`}
                    width={50}
                    height={50}
                    alt={item.productName}
                    className="rounded"
                  />
                  <span>{item.productName} x{item.quantity}</span>
                </div>
                <span>${(item.productPrice * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4 font-bold text-lg">
            <span>Total:</span>
            <span>${Number(confirmedTotal || 0).toFixed(2)}</span>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          Volver a la página principal
        </Link>
      </div>
    </section>
  );
}
