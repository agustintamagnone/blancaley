"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white min-h-[400px] py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center text-center">
        
        {/* Contacto */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-orange-500">Contacto</h3>
          <p className="flex items-center justify-center gap-2">
            <Mail size={18} /> info@blancaleypinturas.com.ar
          </p>
          <p className="flex items-center justify-center gap-2">
            <Phone size={18} /> Administración +54 9 3547 504126
          </p>
          <p className="flex items-center justify-center gap-2">
            <MapPin size={18} /> Ruta 36 KM 744, Córdoba, Argentina
          </p>
          <div className="flex justify-center gap-4 text-2xl pt-2">
            <a href="https://www.instagram.com/blancaley/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/blancaley/" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center">
          <Image
            src="/blancaleypintura-logo-blanco.png"
            alt="Blancaley Pinturas"
            width={300}
            height={300}
            className="mb-2"
          />
        </div>

        {/* Menú */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-orange-500">Menú</h3>
          <ul className="space-y-2">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/#productos">Productos</Link></li>
            <li><Link href="/#empresa">Empresa</Link></li>
            <li><Link href="/#contacto">Contacto</Link></li>
          </ul>
        </div>
      </div>

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/5493547504126"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 rounded-full shadow-lg p-3 hover:bg-green-600 transition"
      >
        <Image src="/whatsapp-icon.png" alt="WhatsApp" width={28} height={28} />
      </a>
    </footer>
  );
}
