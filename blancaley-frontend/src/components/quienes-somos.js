"use client";

import Image from "next/image";

export default function QuienesSomos() {
  return (
    <section id="empresa" className="relative w-full overflow-hidden flex items-center py-12 sm:py-20">
      {/* Imagen de fondo con opacidad */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-30 -z-10"
        style={{ backgroundImage: "url('/blancaley-cantera.png')" }}
      ></div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-4 text-center z-10 flex flex-col items-center justify-center">
        <h2 className="text-3xl sm:text-4xl text-orange-500 font-bold mb-6">¿Quiénes Somos?</h2>
        <p className="text-gray-800 text-base sm:text-lg font-bold leading-relaxed">
          Blancaley, nuestra empresa matriz con más de 65 años de trayectoria, se destaca por la calidad,
          sostenibilidad y el compromiso con el medio ambiente, apoyada en la experiencia y en nuestras canteras propias.
          Somos líderes en la industria gracias a nuestra infraestructura, que incluye canteras y plantas de producción propias.
          Con un equipo de más de 170 empleados directos y la creación de numerosos empleos indirectos,
          contribuimos significativamente a la economía local y regional, consolidando nuestro impacto en la industria.
        </p>
        <Image
          src="/blancaley-logo.png"
          alt="Logo Blancaley"
          width={300}
          height={300}
          className="mt-6"
          priority
        />
      </div>
    </section>
  );
}
