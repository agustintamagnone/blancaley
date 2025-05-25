"use client";

import { useCart } from "@/components/context/cart-context";

export default function OrderConfirmation() {

    const { clearCart } = useCart();
    
    useEffect(() => {
        clearCart(); // ✅ Limpiar carrito al entrar a la página
      }, []);

    return (
        <section>
            THIS IS THE ORDER CONFIRMATION PAGE
        </section>
    );
}