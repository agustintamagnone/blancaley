package com.ventas.blancaley.controller;

import com.ventas.blancaley.dto.CartDTO;
import com.ventas.blancaley.dto.CartItemDTO;
import com.ventas.blancaley.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{cartToken}")
    public CartDTO getCart(@PathVariable String cartToken) {
        return cartService.getCartDTO(cartToken);
    }

    @PostMapping("/add")
    public CartDTO addItem(@RequestBody CartItemDTO itemDto) {
        return cartService.addItemToCart(itemDto);
    }

    @PutMapping("/update")
    public CartDTO updateQuantity(@RequestBody CartItemDTO itemDto) {
        return cartService.updateItemQuantity(itemDto);
    }

    @DeleteMapping("/remove")
    public CartDTO removeItem(@RequestBody CartItemDTO itemDto) {
        return cartService.removeItemFromCart(itemDto);
    }

    @DeleteMapping("/clear/{cartToken}")
    public void clearCart(@PathVariable String cartToken) {
        cartService.clearCart(cartToken);
    }
}
