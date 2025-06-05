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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [zipCode, setZipCode] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      firstName,
      lastName,
      userEmail,
      phoneNumber,
      street,
      streetNumber,
      city,
      state,
      neighborhood,
      zipCode,
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
        localStorage.setItem(
          "lastConfirmedOrder",
          JSON.stringify({
            items: cartItems,
            totalPrice: total
          })
        );
        clearCart();
        router.push("/order-confirmation");
      }
    } catch (error) {
      console.error("Error al enviar pedido:", error);
    }
  };

  console.log("Cart items:", cartItems);

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

      <h2 className="text-xl font-bold mb-10">
        Total del Pedido: ${total ? total.toFixed(2) : "0.00"}
      </h2>

      <h2 className="text-medium font-bold mb-4">
        Datos del Destinatario
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-1/2 border rounded p-2"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-1/2 border rounded p-2"
          />
        </div>
        <div className="flex gap-4 mb-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="Numero de Telefono"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex gap-4 mb-4">
          <input
            placeholder="Calle"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
          <input
            placeholder="Numero de Calle"
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex gap-4 mb-4">
          <input
            placeholder="Ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
          <input
            placeholder="Provincia"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex gap-4 mb-4">
          <input
            placeholder="Codigo Postal"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
          <input
            placeholder="Barrio (Opcional)"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold mt-4 py-2 px-4 rounded"
        >
          Confirmar Pedido
        </button>
      </form>
    </section>
  );
}
