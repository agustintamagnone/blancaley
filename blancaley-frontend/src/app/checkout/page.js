"use client";

import { useCart } from "@/components/context/cart-context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {CreditCard, Landmark, DollarSign} from "lucide-react";

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

  const [paymentMethod, setPaymentMethod] = useState("");

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
      paymentMethod: "MERCADOPAGO",
    };
  
    try {
      // Paso 1: Enviar orden al backend
      const orderRes = await fetch("http://localhost:8080/blancaley/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
  
      if (!orderRes.ok) {
        throw new Error("Error al crear la orden");
      }
  
      const createdOrder = await orderRes.json();
  
      // Paso 2: Crear preferencia de pago
      const paymentPayload = {
        orderId: createdOrder.orderId,
        items: cartItems.map((item) => ({
          productName: item.productName,
          quantity: item.quantity,
          productPrice: item.productPrice,
        })),
      };

      console.log(paymentPayload)
  
      const paymentRes = await fetch("http://localhost:8080/blancaley/api/payments/mercadopago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentPayload),
      });
  
      if (!paymentRes.ok) {
        throw new Error("Error al generar la preferencia de pago");
      }
  
      const paymentData = await paymentRes.json();
  
      // Guardar orden local y limpiar carrito
      localStorage.setItem(
        "lastConfirmedOrder",
        JSON.stringify({
          items: cartItems,
          totalPrice: total,
        })
      );
      clearCart();
  
      // Redirigir a Mercado Pago
      window.location.href = paymentData.initPoint;
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
      alert("Hubo un problema al procesar el pago. Intenta nuevamente.");
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
              <p className="text-sm text-gray-600">Costo de Envío:</p>
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

      <h2 className="text-lg font-semibold mb-4">Datos de Envío</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-8 mb-6">
          <input
            type="text"
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-1/2 border border-gray-400 rounded p-2"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-1/2 border border-gray-400 rounded p-2"
          />
        </div>
        <div className="flex gap-8 mb-6">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            className="w-full border border-gray-400 rounded p-2"
          />
          <input
            type="text"
            placeholder="Número de Teléfono"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full border border-gray-400 rounded p-2"
          />
        </div>
        <div className="flex gap-8 mb-6">
          <input
            placeholder="Calle"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
            className="w-full border border-gray-400 rounded p-2"
          />
          <input
            placeholder="Numero de Calle"
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
            required
            className="w-full border border-gray-400 rounded p-2"
          />
        </div>
        <div className="flex gap-8 mb-6">
          <input
            placeholder="Ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full border border-gray-400 rounded p-2"
          />
          <input
            placeholder="Provincia"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="w-full border border-gray-400 rounded p-2"
          />
        </div>
        <div className="flex gap-8 mb-6">
          <input
            placeholder="Código Postal"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
            className="w-full border border-gray-400 rounded p-2"
          />
          <input
            placeholder="Barrio (Opcional)"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="w-full border border-gray-400 rounded p-2"
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
