package com.ventas.blancaley.controller;

import com.ventas.blancaley.domain.Order;

import com.ventas.blancaley.dto.OrderRequestDTO;
import com.ventas.blancaley.dto.OrderResponseDTO;

import com.ventas.blancaley.service.OrderService;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    @Operation(summary = "Get all orders")
    public ResponseEntity<?> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get an order by ID")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderDTOById(id));
    }

    @GetMapping("/{id}/detail")
    @Operation(summary = "Get an order by ID with all its details")
    public ResponseEntity<OrderResponseDTO> getOrderDetail(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderDTOById(id));
    }

    @PostMapping
    @Operation(summary = "Creates a new order")
    public ResponseEntity<OrderResponseDTO> createOrder(@RequestBody OrderRequestDTO requestDTO) {
        Order saved = orderService.createOrderFromDTO(requestDTO);
        return ResponseEntity.ok(orderService.getOrderDTOById(saved.getOrderId()));
    }
}
