package com.ventas.blancaley.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class OrderRequestDTO {

    private Long userId;

    @NotBlank(message = "The first name of the customer must not be empty.")
    private String firstName;

    @NotBlank(message = "The last name of the customer must not be empty.")
    private String lastName;

    @Email(message = "The email must be valid.")
    @NotBlank (message = "The email field cannot be blank.")
    private String userEmail;

    @NotBlank (message = "The phone number cannot be blank.")
    private String phoneNumber;

    @NotBlank (message = "The street address cannot be blank.")
    private String street;

    @NotBlank (message = "The street number cannot be blank.")
    private String streetNumber;

    @NotBlank (message = "The city field cannot be blank.")
    private String city;

    @NotBlank (message = "The state field cannot be blank.")
    private String state;

    @NotBlank (message = "The zip code number cannot be blank.")
    private String zipCode;

    private String neighborhood;

    @NotNull(message = "There must be at least 1 item.")
    private List<OrderItemRequestDTO> items;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setUserName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public List<OrderItemRequestDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequestDTO> items) {
        this.items = items;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
