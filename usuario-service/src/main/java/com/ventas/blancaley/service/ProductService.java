package com.ventas.blancaley.service;

import com.ventas.blancaley.domain.Product;

import java.util.List;

public interface ProductService {

    Product createProduct (Product product);
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product updateProductById(Product product);
    void deleteById(Long id);
}
