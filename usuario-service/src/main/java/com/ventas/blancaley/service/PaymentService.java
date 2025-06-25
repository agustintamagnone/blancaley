package com.ventas.blancaley.service;

import com.ventas.blancaley.dto.PaymentPreferenceRequestDTO;

public interface PaymentService {
    String createPaymentPreference(PaymentPreferenceRequestDTO dto);
}
