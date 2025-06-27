package com.ventas.blancaley.controller;

import com.ventas.blancaley.service.OrderService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@RestController
@RequestMapping("/webhook")
public class WebhookController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/mercadopago")
    public ResponseEntity<Void> recibirWebhook(@RequestBody Map<String, Object> payload) {
        try {
            orderService.procesarNotificacionDePago(payload);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

