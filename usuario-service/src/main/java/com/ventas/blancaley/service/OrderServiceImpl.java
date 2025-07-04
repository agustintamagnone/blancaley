package com.ventas.blancaley.service;

import com.ventas.blancaley.domain.*;

import com.ventas.blancaley.dto.OrderItemResponseDTO;
import com.ventas.blancaley.dto.OrderRequestDTO;
import com.ventas.blancaley.dto.OrderResponseDTO;

import com.ventas.blancaley.repository.OrderRepository;
import com.ventas.blancaley.repository.ProductRepository;
import com.ventas.blancaley.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


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
            return new OrderItemResponseDTO(product.getProductName(), product.getProductType(), product.getProductPrice(), item.getQuantity());
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
                    newUser.setFirstName(dto.getFirstName());
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
        order.setPaymentStatus(PaymentStatus.PENDIENTE);
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

    @Override
    public void procesarNotificacionDePago(Map<String, Object> payload) {
        String tipo = (String) payload.get("type");

        if ("payment".equals(tipo)) {
            Map<String, Object> data = (Map<String, Object>) payload.get("data");
            String paymentId = data.get("id").toString();

            // Llamado a la API de MP para obtener detalles del pago
            RestTemplate restTemplate = new RestTemplate();
            String accessToken = "${mercadopago.access-token}";
            String url = "https://api.mercadopago.com/v1/payments/" + paymentId + "?access_token=" + accessToken;

            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            Map<String, Object> paymentInfo = response.getBody();

            String externalReference = (String) paymentInfo.get("external_reference");
            String status = (String) paymentInfo.get("status"); // approved, pending, rejected, etc.

            Order order = orderRepository.findById(Long.parseLong(externalReference)).orElseThrow();

            switch (status) {
                case "approved":
                    order.setPaymentStatus(PaymentStatus.COMPLETADO);
                    break;
                case "pending":
                    order.setPaymentStatus(PaymentStatus.PENDIENTE);
                    break;
                default:
                    order.setPaymentStatus(PaymentStatus.FALLIDO);
            }

            orderRepository.save(order);
        }
    }

}
