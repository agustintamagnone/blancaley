"use client";

import { useCart } from "@/components/context/cart-context";
import { X, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartDrawer({ open, onClose }) {
  const router = useRouter(); // ✅ siempre se llama
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isClient, setIsClient] = useState(false); // estado local

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // ✅ render condicional, pero los hooks ya fueron llamados

  const total = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 h-full flex flex-col justify-between">
        {/* Encabezado */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">🛒 Tu Carrito</h2>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          {/* Contenido del carrito */}
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Tu carrito está vacío</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="border-b pb-4 flex flex-col gap-2"
                >
                  {/* Imagen + Nombre */}
                  <div className="flex gap-4 items-center">
                    <img
                      src={`/${item.imageUrl}`}
                      alt={item.productName}
                      width={64}
                      height={64}
                      className="rounded shadow-sm object-cover bg-white"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.productName}</h4>
                      <p className="text-sm text-gray-500">
                        ${item.productPrice.toFixed(2)} c/u
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="border px-2 rounded"
                      >
                        <Minus size={14} />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) =>
                          updateQuantity(
                            item.productId,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-12 border rounded text-center"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="border px-2 rounded"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Total y eliminar */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        ${(item.productPrice * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-500 hover:text-red-700"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total y botón de acción */}
        {cartItems.length > 0 && (
          <div className="pt-4 border-t mt-4">
            <p className="font-bold text-lg mb-2">
              Total del pedido: ${total.toFixed(2)}
            </p>
            <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded mt-4"
                onClick={() => router.push("/checkout")}
                >
                Completar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
