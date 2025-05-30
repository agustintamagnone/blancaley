package com.ventas.blancaley.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderResponseDTO {
    private Long orderId;
    private String userName;
    private String userEmail;
    private String address;
    private LocalDateTime orderDate;
    private String status;
    private List<OrderItemResponseDTO> items;
    private Double totalPrice;

    public OrderResponseDTO(Long orderId, String userName, String userEmail, String address, LocalDateTime orderDate,
                            String status, List<OrderItemResponseDTO> items, Double totalPrice) {
        this.orderId = orderId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.address = address;
        this.orderDate = orderDate;
        this.status = status;
        this.items = items;
        this.totalPrice = totalPrice;
    }

    public OrderResponseDTO() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<OrderItemResponseDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemResponseDTO> items) {
        this.items = items;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
