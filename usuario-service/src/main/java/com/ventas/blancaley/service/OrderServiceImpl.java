package com.ventas.blancaley.service;

import com.ventas.blancaley.domain.*;
import com.ventas.blancaley.dto.OrderItemResponseDTO;
import com.ventas.blancaley.dto.OrderRequestDTO;
import com.ventas.blancaley.dto.OrderResponseDTO;
import com.ventas.blancaley.repository.OrderRepository;
import com.ventas.blancaley.repository.ProductRepository;
import com.ventas.blancaley.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderServiceImpl(OrderRepository orderRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public Order createOrder(Order order) {
        // Asegurar que cada item tenga la relación con el pedido
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getById(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found by id: " + id));
    }

    @Override
    public OrderResponseDTO getOrderDTOById(Long id) {
        Order order = getById(id);

        List<OrderItemResponseDTO> itemDTOs = order.getItems().stream().map(item -> {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProductId()));
            return new OrderItemResponseDTO(product.getProductName(), product.getProductPrice(), item.getQuantity());
        }).toList();

        Double total = itemDTOs.stream()
                .mapToDouble(i -> i.getUnitPrice() * i.getQuantity())
                .sum();

        return new OrderResponseDTO(
                order.getOrderId(),
                order.getFirstName(),
                order.getLastName(),
                order.getUserEmail(),
                order.getPhoneNumber(),
                order.getStreet(),
                order.getStreetNumber(),
                order.getCity(),
                order.getState(),
                order.getZipCode(),
                order.getNeighborhood(),
                order.getOrderDate(),
                order.getStatus().name(),
                itemDTOs,
                total
        );
    }

    @Override
    public Order createOrderFromDTO(OrderRequestDTO dto) {
        User user = userRepository.findByEmail(dto.getUserEmail())
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setFirstName(dto.getFirstName()); // o podés incluirlo en el DTO
                    newUser.setLastName(dto.getLastName());
                    newUser.setEmail(dto.getUserEmail());
                    return userRepository.save(newUser);
                });

        Order order = new Order();
        order.setUser(user);
        order.setFirstName(dto.getFirstName());
        order.setLastName(dto.getLastName());
        order.setUserEmail(dto.getUserEmail());
        order.setPhoneNumber(dto.getPhoneNumber());
        order.setStreet(dto.getStreet());
        order.setStreetNumber(dto.getStreetNumber());
        order.setCity(dto.getCity());
        order.setState(dto.getState());
        order.setZipCode(dto.getZipCode());
        order.setNeighborhood(dto.getNeighborhood());
        order.setStatus(OrderStatus.NUEVO);
        order.setOrderDate(LocalDateTime.now());

        List<OrderItem> items = dto.getItems().stream().map(itemDto -> {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            OrderItem item = new OrderItem();
            item.setProductId(product.getProductId());
            item.setQuantity(itemDto.getQuantity());
            item.setOrder(order);
            return item;
        }).toList();

        order.setItems(items);

        double total = items.stream()
                .mapToDouble(i -> {
                    Product product = productRepository.findById(i.getProductId()).orElseThrow();
                    return product.getProductPrice() * i.getQuantity();
                }).sum();

        order.setTotalPrice(total);

        return orderRepository.save(order);
    }

}
