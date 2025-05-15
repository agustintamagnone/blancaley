package com.ventas.blancaley.repository;

import com.ventas.blancaley.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
