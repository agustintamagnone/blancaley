"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ShoppingCart } from "lucide-react";
import Topbar from "./topbar";
import CartDrawer from "./cart-drawer";
import { useCart } from "@/components/context/cart-context";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cartItems } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
      <Topbar />
      <div className="flex justify-center">
        <nav className="max-w-[1180px] w-full flex justify-between items-center px-6 py-4">
          <a href="http://localhost:3000">
            <Image
              src="/blancaley-pinturas.png"
              width={150}
              height={150}
              alt="Blancaley Icon"
            />
          </a>

          {/* Menú principal */}
          <ul className="hidden md:flex justify-center space-x-6 text-lg">
            <li>
              <a href="http://localhost:3000">Inicio</a>
            </li>
            <li>
              <a href="#products">Productos</a>
            </li>
            <li>
              <a href="#empresa">Empresa</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
          </ul>

          {/* Ícono carrito */}
          <div
            className="relative cursor-pointer"
            onClick={() => setDrawerOpen(true)}
          >
            <ShoppingCart size={28} />
            {isClient && cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
        </nav>
      </div>

      {/* Drawer del carrito */}
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
