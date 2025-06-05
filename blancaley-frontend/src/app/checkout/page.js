"use client";

import { useCart } from "@/components/context/cart-context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { cartItems, total, clearCart } = useCart();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      firstName,
      lastName,
      userEmail,
      address,
      items: cartItems,
      totalPrice: total,
    };

    try {
      // Lógica para enviar el pedido al backend
      const res = await fetch("http://localhost:8080/blancaley/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        clearCart(); // ✅ Vacía el carrito
        router.push("/order-confirmation"); // Luego redirige
      }
    } catch (error) {
      console.error("Error al enviar pedido:", error);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 mt-30 py-12">
      <h1 className="text-3xl font-bold mb-6 text-orange-600 text-center">
        Resumen del Pedido
      </h1>

      <div className="space-y-6 mb-8">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex gap-4 items-center border-b pb-4"
          >
            <Image
              src={`/${item.imageUrl}`}
              width={80}
              height={80}
              alt={item.productName}
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.productName}</h3>
              <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
              <p className="text-sm text-gray-600">
                Precio unitario: $
                {item.productPrice ? item.productPrice.toFixed(2) : "0.00"}
              </p>
              <p className="font-medium">
                Total: $
                {(item.productPrice && item.quantity
                  ? item.productPrice * item.quantity
                  : 0
                ).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">
        Total del Pedido: ${total ? total.toFixed(2) : "0.00"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        <textarea
          placeholder="Dirección de envío"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        >
          Confirmar Pedido
        </button>
      </form>
    </section>
  );
}
