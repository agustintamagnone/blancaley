package com.ventas.blancaley.service;

import com.mercadopago.MercadoPagoConfig;

import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;

import com.mercadopago.resources.preference.Preference;

import com.ventas.blancaley.dto.PaymentPreferenceRequestDTO;
import com.ventas.blancaley.dto.PaymentItemDTO;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${mercadopago.access-token}")
    private String accessToken;

    @Override
    public String createPaymentPreference(PaymentPreferenceRequestDTO dto) {
        MercadoPagoConfig.setAccessToken(accessToken);

        System.out.println("AccessToken: " + accessToken);
        dto.getItems().forEach(item ->
                System.out.println(item.getProductName() + " - " + item.getQuantity() + " x " + item.getProductPrice())
        );

        List<PreferenceItemRequest> items = dto.getItems().stream()
                .map(item -> PreferenceItemRequest.builder()
                        .title(item.getProductName())
                        .quantity(item.getQuantity())
                        .unitPrice(BigDecimal.valueOf(item.getProductPrice()))
                        .build())
                .collect(Collectors.toList());

        PreferenceBackUrlsRequest backUrls =
                PreferenceBackUrlsRequest.builder()
                        .success("http://localhost:3000/order-confirmation")
                        .pending("http://localhost:3000")
                        .failure("http://localhost:3000/payment-failure")
                        .build();

        System.out.println("BackUrls: " + backUrls.getSuccess());

        PreferenceRequest request = PreferenceRequest.builder()
                .items(items)
                .backUrls(backUrls)
//                .autoReturn("approved")
                .build();

        try {
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(request);
            return preference.getInitPoint();
        } catch (Exception e) {
            throw new RuntimeException("Error al crear la preferencia de pago", e);
        }
    }
}
