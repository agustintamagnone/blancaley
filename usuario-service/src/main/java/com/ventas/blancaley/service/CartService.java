package com.ventas.blancaley.service;

import com.ventas.blancaley.dto.CartDTO;
import com.ventas.blancaley.dto.CartItemDTO;

public interface CartService {
    CartDTO getCartDTO(String cartToken);
    CartDTO addItemToCart(CartItemDTO itemDto);
    CartDTO updateItemQuantity(CartItemDTO itemDto);
    CartDTO removeItemFromCart(CartItemDTO itemDto);
    void clearCart(String cartToken);
}