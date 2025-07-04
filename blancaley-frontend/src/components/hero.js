"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Hero() {
  return (
<section id="hero" className="relative w-full overflow-hidden p-10 py-10 px-4 md:h-[95vh]">
  {/* Fondo pared */}
  <Image
    src="/pared-blanca.png"
    alt="Pared Blanca"
    fill
    className="bg-cover bg-center bg-no-repeat opacity-30 object-cover -z-10"
    priority
  />

  {/* Contenido */}
  <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-0 h-full max-w-6xl mx-auto px-4 md:px-1">

    {/* Texto */}
    <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
      <h1 className="text-3xl md:text-6xl font-extrabold text-black leading-tight">
        LA BASE PERFECTA
      </h1>
      <h2 className="mt-4 text-xl md:text-3xl font-bold text-black">
        PARA UN ACABADO IMPECABLE
      </h2>
      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
        <Link href="#">
          <Button variant={"default"} size={"lg"} className="w-full md:w-auto">
            Contactanos
          </Button>
        </Link>
        <Link href="#">
          <Button variant={"primary"} size={"lg"} className="w-full md:w-auto">
            Pedi tu Presupuesto
          </Button>
        </Link>
      </div>
    </div>

    {/* Imagen producto */}
    <div className="w-full md:w-1/2 flex justify-center">
      <Image
        src="/masilla.png"
        alt="Producto"
        width={220}
        height={220}
        className="drop-shadow-xl"
      />
    </div>
  </div>
</section>
  );
}
