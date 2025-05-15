package com.ventas.blancaley.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class OrderRequestDTO {

    private Long userId;

    @NotBlank(message = "The name of the customer must not be empty.")
    private String userName;

    @Email(message = "The email must be valid.")
    @NotBlank (message = "The email field cannot be blank.")
    private String userEmail;

    @NotBlank(message = "La dirección es obligatoria")
    private String address;

    @NotNull(message = "There must be at least 1 item.")
    private List<OrderItemRequestDTO> items;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<OrderItemRequestDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequestDTO> items) {
        this.items = items;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
