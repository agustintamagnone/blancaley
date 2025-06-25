package com.ventas.blancaley.controller;

import com.ventas.blancaley.dto.PaymentPreferenceRequestDTO;
import com.ventas.blancaley.service.PaymentService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/mercadopago")
    public ResponseEntity<?> createPaymentPreference(@RequestBody PaymentPreferenceRequestDTO dto) {
        try {
            String initPoint = paymentService.createPaymentPreference(dto);
            Map<String, String> response = new HashMap<>();
            response.put("initPoint", initPoint);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al generar la preferencia de pago");
        }
    }

}
