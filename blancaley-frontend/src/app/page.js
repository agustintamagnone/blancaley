"use client";

import Banner from "@/components/banner";
import BannerCTA from "@/components/banner-cta";
import Hero from "@/components/hero";
import QuienesSomos from "@/components/quienes-somos";
import ProductList from "@/components/ui/product-list";
import Image from "next/image";

export default function Home() {
  return (
    <div className="home-bg bg-cover bg-center min-h-screen">
      <div className="">
        {/* ------------ Hero Section ------------ */}
        <div className="pt-10">
          <Hero />
        </div>
        <div className="pt-10">
          <ProductList />
        </div>
        <div className="pt-10">
          <Banner />
        </div>
        <div>
          <QuienesSomos />
        </div>
        <div>
          <BannerCTA />
        </div>
      </div>
    </div>
  );
}
