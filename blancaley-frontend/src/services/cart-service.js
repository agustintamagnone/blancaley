export async function fetchCart(cartToken) {
  try {
    const res = await fetch(`http://localhost:8080/blancaley/api/cart/${cartToken}`);
    if (!res.ok) throw new Error("Error al obtener el carrito");

    const data = await res.json();
    console.log("Respuesta del backend:", data);
    return Array.isArray(data) ? data : data.items || [];
  } catch (error) {
    console.error("fetchCart error:", error);
    return [];
  }
}

  
  export async function addItemToCart(cartToken, productId, quantity = 1) {
    console.log("addItemToCart payload:", { cartToken, productId, quantity });

    try {
      const res = await fetch(`http://localhost:8080/blancaley/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartToken, productId, quantity }),
      });
      if (!res.ok) throw new Error("Error al agregar producto al carrito");
      return await res.json();
    } catch (error) {
      console.error("addItemToCart error:", error);
    }
  }
  
  export async function updateCartItem(cartToken, productId, quantity) {
    try {
      const res = await fetch(`http://localhost:8080/blancaley/api/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartToken, productId, quantity }),
      });
      if (!res.ok) throw new Error("Error al actualizar producto del carrito");
      return await res.json();
    } catch (error) {
      console.error("updateCartItem error:", error);
    }
  }
  
  export async function removeItemFromCart(cartToken, productId) {
    try {
      const res = await fetch(`http://localhost:8080/blancaley/api/cart/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartToken, productId }),
      });
      if (!res.ok) throw new Error("Error al eliminar producto del carrito");
      return await res.json();
    } catch (error) {
      console.error("removeItemFromCart error:", error);
    }
  }
  
  export async function clearCartBackend(cartToken) {
    try {
      const res = await fetch(`http://localhost:8080/blancaley/api/cart/clear/${cartToken}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al vaciar el carrito");
      return await res.json();
    } catch (error) {
      console.error("clearCartBackend error:", error);
    }
  }
  