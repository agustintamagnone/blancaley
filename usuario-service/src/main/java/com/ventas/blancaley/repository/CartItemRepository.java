package com.ventas.blancaley.repository;

import com.ventas.blancaley.domain.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
