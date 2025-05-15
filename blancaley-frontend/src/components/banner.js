"use client";


import { CreditCard, PaintbrushVertical, Truck } from "lucide-react";
import { Button } from "./ui/button";

export default function Banner () {
    return (
        <section className="relative w-full flex md:h-[30vh] overflow-hidden bg-gray-300 border border-orange-400">
            <div className="max-w-7xl mx-auto px-4 flex justify-center items-center">
                {/* Contenido */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-15 ps-2.5 justify-center items-center">
                    {/* ITEM 1*/}
                    <div className="flex flex-col justify-between md:flex-row">
                        <div className="flex items-center md:mr-5">
                            <CreditCard color="#f05b40" size={40}/>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-xl font-bold text-orange-600">TODOS LOS MEDIOS DE PAGO</h4>
                            <p className="text-lg">Tarjetas de débito y crédito</p>
                        </div>
                    </div>
                    {/* ITEM 2*/}
                    <div className="flex flex-col md:flex-row">
                        <div className="flex items-center md:mr-5">
                            <Truck color="#f05b40" size={40}/>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-xl font-bold text-orange-600">ENVIOS GRATIS</h4>
                            <p className="text-lg">en compras superiores a $400,000</p>
                        </div>
                    </div>
                    {/* ITEM 3*/}
                    <div className="flex flex-col md:flex-row flex-1/2">
                        <div className="flex items-center md:mr-5">
                            <PaintbrushVertical color="#f05b40" size={40}/>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-xl font-bold text-orange-600">ASESORAMIENTO</h4>
                            <p className="text-lg">Para satisfacer tus necesidades</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
