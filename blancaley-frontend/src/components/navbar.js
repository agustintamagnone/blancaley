"use client";

import { useState } from "react";
import Topbar from "./topbar";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed bg-white text-black top-0 left-0 right-0 justify-center bg-opacity-90 mb-40 backdrop-blur-md z-40 shadow-md">
      <Topbar />
      <div className="justify-center flex flex-row">
        <nav className="max-w-[1180px] w-full flex justify-between items-center px-6 py-4">
          <Image
            src="/blancaley-pinturas.png"
            width={150}
            height={150}
            alt="Blancaley Icon"
          />
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md"
            >
              {menuOpen ? (
                <X size={24} className="" />
              ) : (
                <Menu size={24} className="" />
              )}
            </button>
          </div>
          <ul className="hidden md:flex justify-center space-x-6 text-lg">
            <li>
              <a href="#inicio" className="hover:text-gray-400">
                Inicio
              </a>
            </li>
            <li>
              <a href="#productos" className="hover:text-gray-400">
                Productos
              </a>
            </li>
            <li>
              <a href="#empresa" className="hover:text-gray-400">
                Empresa
              </a>
            </li>
            <li>
              <a href="#contacto" className="hover:text-gray-400">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col bg-white text-black items-center justify-center space-y-6 z-50 md:hidden transition-colors duration-300">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6"
          >
            <X size={30} className="" />
          </button>
          <a
            href="#about"
            className="text-xl hover:text-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            Productos
          </a>
          <a
            href="#experience"
            className="text-xl hover:text-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            Empresa
          </a>
          <a
            href="#projects"
            className="text-xl hover:text-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            Contacto
          </a>
        </div>
      )}
    </header>
  );
}
