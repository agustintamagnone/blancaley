package com.ventas.blancaley.service;

import com.ventas.blancaley.domain.Product;
import com.ventas.blancaley.domain.ProductCategory;
import com.ventas.blancaley.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> allProducts = new ArrayList<>();
        allProducts.addAll(productRepository.findByProductCategoryOrderByProductOrderAsc(ProductCategory.PINTURA));
        allProducts.addAll(productRepository.findByProductCategoryOrderByProductOrderAsc(ProductCategory.MASILLA));
        allProducts.addAll(productRepository.findByProductCategoryOrderByProductOrderAsc(ProductCategory.MEMBRANA_LIQUIDA));
        return allProducts;
    }
    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found by id: " + id));
    }

    @Override
    public Product updateProductById(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }
}
