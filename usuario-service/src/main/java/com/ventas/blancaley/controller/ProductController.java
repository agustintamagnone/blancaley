package com.ventas.blancaley.controller;

import com.ventas.blancaley.domain.Product;
import com.ventas.blancaley.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @Operation(summary = "Creates a new product")
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.createProduct(product));
    }

    @GetMapping
    @Operation(summary = "Get all products")
    public ResponseEntity<?> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a product by ID")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PutMapping
    @Operation(summary = "Updates the fields of a product")
    public ResponseEntity<?> updateProductById(@RequestBody Product product) {
        for (Product p : productService.getAllProducts()) {
            if (p.getProductId().equals(product.getProductId())) {
                p.setProductName(product.getProductName());
                p.setProductPrice(product.getProductPrice());
                p.setProductDescription(product.getProductDescription());
                p.setProductStock(product.getProductStock());
                p.setProductCategory(product.getProductCategory());
                p.setProductColor(product.getProductColor());

                return ResponseEntity.ok(productService.updateProductById(product));
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping
    @Operation(summary = "Deletes a product")
    public ResponseEntity<?> deleteProductById(@RequestBody Product product) {
        for (Product p : productService.getAllProducts()) {
            if (p.getProductId().equals(product.getProductId())) {
                productService.deleteById(product.getProductId());

                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.notFound().build();
    }
}
