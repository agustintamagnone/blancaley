"use client";

import Image from "next/image";
import Link from "next/link";

export default function BannerCTA() {
  return (
    <section id="contacto" className="relative w-full border border-orange-500 bg-gradient-to-r from-gray-300 to-white py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Texto y logo */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-500 leading-tight">
            ¿QUERÉS VENDER <br /> NUESTRAS PINTURAS?
          </h2>
          <div className="flex justify-center md:justify-start items-center">
            <Image src="/blancaley-pinturas.png" width={300} height={300} alt="Logo" />
          </div>

          {/* Botón solo visible en mobile/tablet */}
          <div className="md:hidden flex justify-center mt-4">
            <Link
              href="https://wa.me/5493547504126"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full shadow hover:bg-orange-600 transition"
            >
              CONTACTANOS
            </Link>
          </div>
        </div>

        {/* Imagenes de productos solo en desktop */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center gap-4">
          <Image src="/blancamat.png" width={130} height={150} alt="Blancamat" />
          <Image src="/blancatop.png" width={130} height={150} alt="Blancatop" />
          <Image src="/blancaplus.png" width={130} height={150} alt="Blancaplus" />
        </div>

        {/* Flecha + botón (solo en desktop) */}
        <div className="hidden md:absolute md:right-6 md:bottom-6 md:flex md:items-center gap-2">
          <Image src="/flecha-negra.png" width={140} height={50} alt="Flecha" />
          <Link
            href="https://wa.me/5493547504126"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white font-bold px-6 py-3 rounded-full shadow hover:bg-orange-600 transition"
          >
            CONTACTANOS
          </Link>
        </div>
      </div>
    </section>
  );
}
