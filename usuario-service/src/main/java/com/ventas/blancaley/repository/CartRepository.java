package com.ventas.blancaley.repository;

import com.ventas.blancaley.domain.Cart;
import com.ventas.blancaley.domain.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByCartToken(String cartToken);
}

