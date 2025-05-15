package com.ventas.blancaley.repository;

import com.ventas.blancaley.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {}