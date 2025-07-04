package com.ventas.blancaley.dto;

public class OrderItemResponseDTO {
    private String productName;
    private String productType;
    private Double unitPrice;
    private Integer quantity;

    public OrderItemResponseDTO(String productName, String productType, Double unitPrice, Integer quantity) {
        this.productName = productName;
        this.productType = productType;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

    public OrderItemResponseDTO() {
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductType() { return productType; }

    public void setProductType(String productType) { this.productType = productType; }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }


}
