"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/context/cart-context";

export default function PaymentFailurePage() {
  const { cartItems, totalPrice } = useCart();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    setCartData(cartItems);
  }, [cartItems]);

  return (
    <section className="min-h-screen pt-50 pb-20 flex flex-col items-center justify-center bg-white px-4 py-">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-md max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Ups, tu intento de pago ha fallado
        </h1>
        <p className="text-gray-700 mb-6">
          Algo salió mal con tu intento de pago. Puedes intentarlo de nuevo o comunicarte con nosotros para recibir ayuda.
        </p>

        <div className="text-left mb-6">
          <h2 className="text-xl font-semibold mb-2">Tu carrito:</h2>
          <ul className="space-y-4">
            {cartData.map((item, index) => (
              <li key={index} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-3">
                  <img
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
            <span>${Number(totalPrice || 0).toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link
            href="/checkout"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Volver al Checkout
          </Link>
          <a
            href="https://wa.me/5493512345678?text=Hola%20Blancaley,%20tuve%20un%20problema%20con%20mi%20pago"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
