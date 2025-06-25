package com.ventas.blancaley.service;

import com.ventas.blancaley.domain.Cart;
import com.ventas.blancaley.domain.CartItem;
import com.ventas.blancaley.domain.Product;
import com.ventas.blancaley.dto.CartDTO;
import com.ventas.blancaley.dto.CartItemDTO;
import com.ventas.blancaley.repository.CartRepository;
import com.ventas.blancaley.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public CartDTO getCartDTO(String cartToken) {
        Cart cart = getOrCreateCart(cartToken);
        return new CartDTO(cart);
    }

    private Cart getOrCreateCart(String cartToken) {
        return cartRepository.findByCartToken(cartToken)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setCartToken(cartToken);
                    return cartRepository.save(newCart);
                });
    }

    @Override
    public CartDTO addItemToCart(CartItemDTO itemDto) {
        Cart cart = getOrCreateCart(itemDto.getCartToken());
        Optional<CartItem> existing = cart.getItems().stream()
                .filter(item -> item.getProduct().getProductId().equals(itemDto.getProductId()))
                .findFirst();

        if (existing.isPresent()) {
            CartItem item = existing.get();
            item.setQuantity(item.getQuantity() + itemDto.getQuantity());
        } else {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(itemDto.getQuantity());
            cart.getItems().add(newItem);
        }

        cartRepository.save(cart);
        return new CartDTO(cart);
    }

    @Override
    public CartDTO updateItemQuantity(CartItemDTO itemDto) {
        Cart cart = getOrCreateCart(itemDto.getCartToken());
        cart.getItems().forEach(item -> {
            if (item.getProduct().getProductId().equals(itemDto.getProductId())) {
                item.setQuantity(itemDto.getQuantity());
            }
        });
        cartRepository.save(cart);
        return new CartDTO(cart);
    }

    @Override
    public CartDTO removeItemFromCart(CartItemDTO itemDto) {
        Cart cart = getOrCreateCart(itemDto.getCartToken());
        cart.getItems().removeIf(item -> item.getProduct().getProductId().equals(itemDto.getProductId()));
        cartRepository.save(cart);
        return new CartDTO(cart);
    }

    @Override
    public void clearCart(String cartToken) {
        Cart cart = getOrCreateCart(cartToken);
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
