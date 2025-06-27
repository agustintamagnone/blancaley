package com.ventas.blancaley.service;

import com.ventas.blancaley.domain.Order;
import com.ventas.blancaley.dto.*;

import java.util.List;
import java.util.Map;

public interface OrderService {
    List<Order> getAllOrders();
    Order getById(Long id);
    Order createOrderFromDTO(OrderRequestDTO orderRequestDTO);
    OrderResponseDTO getOrderDTOById(Long id);
    void procesarNotificacionDePago(Map<String, Object> payload);
}
