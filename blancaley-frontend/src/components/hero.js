"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full md:h-[95vh] overflow-hidden">
      {/* Fondo pared */}
      <Image
        src="/pared-blanca.png"
        alt="Pared Blanca"
        fill
        className="bg-cover bg-center bg-no-repeat opacity-30 object-center -z-10"
        priority
      />

      {/* Contenido */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 h-full">

        {/* Texto */}
        <div className="w-full ma md:w-1/2 text-center md:text-left mt-6 md:mt-0 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight">
            LA BASE PERFECTA
          </h1>
          <h2 className="mt-6 text-2xl md:text-3xl font-bold">
            PARA UN ACABADO IMPECABLE
          </h2>
          <div className="mt-4 flex gap-4 justify-center md:justify-start">
            <Link href="#">
              <Button variant={"default"} size={"lg"}>
                Contactanos
              </Button>
            </Link>
            <Link href="#">
              <Button variant={"primary"} size={"lg"}>
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
            width={300}
            height={300}
            className="drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
