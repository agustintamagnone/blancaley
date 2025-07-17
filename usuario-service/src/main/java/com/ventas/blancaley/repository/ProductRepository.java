package com.ventas.blancaley.repository;

import com.ventas.blancaley.domain.Product;
import com.ventas.blancaley.domain.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByProductCategoryOrderByProductOrderAsc(ProductCategory category);
}
