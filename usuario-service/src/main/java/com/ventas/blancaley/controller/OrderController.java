package com.ventas.blancaley.controller;

import com.ventas.blancaley.domain.Order;
import com.ventas.blancaley.dto.OrderRequestDTO;
import com.ventas.blancaley.dto.OrderResponseDTO;
import com.ventas.blancaley.service.OrderService;
import jakarta.validation.Valid;
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

//    @PostMapping
//    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
//        Order saved = orderService.createOrder(order);
//        return ResponseEntity.ok(saved);
//    }

    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getById(id));
    }

    @GetMapping("/{id}/detail")
    public ResponseEntity<OrderResponseDTO> getOrderDetail(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderDTOById(id));
    }

    @PostMapping
    public ResponseEntity<OrderResponseDTO> responseOrderFromDTO(@RequestBody @Valid OrderRequestDTO requestDTO) {
        Order saved = orderService.createOrderFromDTO(requestDTO);
        return ResponseEntity.ok(orderService.getOrderDTOById(saved.getOrderId()));
    }
}
