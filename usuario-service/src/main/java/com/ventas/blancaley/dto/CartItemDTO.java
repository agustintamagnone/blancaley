package com.ventas.blancaley.dto;

import com.ventas.blancaley.domain.CartItem;

public class CartItemDTO {

    private String cartToken;
    private Long productId;
    private String productName;
    private String imageUrl;
    private double productPrice;
    private int quantity;

    public CartItemDTO() {}

    public CartItemDTO(CartItem item) {
        this.productId = item.getProduct().getProductId();
        this.productName = item.getProduct().getProductName();
        this.imageUrl = item.getProduct().getImageUrl();
        this.productPrice = item.getProduct().getProductPrice();
        this.quantity = item.getQuantity();
    }

    public String getCartToken() {
        return cartToken;
    }

    public void setCartToken(String cartToken) {
        this.cartToken = cartToken;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
