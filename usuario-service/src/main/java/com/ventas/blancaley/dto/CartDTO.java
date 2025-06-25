package com.ventas.blancaley.dto;

import com.ventas.blancaley.domain.Cart;

import java.util.List;
import java.util.stream.Collectors;

public class CartDTO {

    private String cartToken;
    private List<CartItemDTO> items;

    public CartDTO(Cart cart) {
        this.cartToken = cart.getCartToken();
        this.items = cart.getItems().stream()
                .map(CartItemDTO::new)
                .collect(Collectors.toList());
    }

    public String getCartToken() {
        return cartToken;
    }

    public void setCartToken(String cartToken) {
        this.cartToken = cartToken;
    }

    public List<CartItemDTO> getItems() {
        return items;
    }

    public void setItems(List<CartItemDTO> items) {
        this.items = items;
    }
}
