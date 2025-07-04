import { useSearchParams } from "next/navigation";

export default function PaymentDetails() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const paymentStatus = searchParams.get("status");
  const merchantOrderId = searchParams.get("merchant_order_id");

  if (!paymentId) return null;

  return (
    <div className="mt-6 text-sm text-gray-600">
      <p><strong>ID de Pago:</strong> {paymentId}</p>
      <p><strong>Estado del Pago:</strong> {paymentStatus}</p>
      <p><strong>ID de Orden (Mercado Pago):</strong> {merchantOrderId}</p>
    </div>
  );
}
