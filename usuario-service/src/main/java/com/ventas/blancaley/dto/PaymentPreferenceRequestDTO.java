package com.ventas.blancaley.dto;

import java.util.List;

public class PaymentPreferenceRequestDTO {
    private List<PaymentItemDTO> items;

    public List<PaymentItemDTO> getItems() {
        return items;
    }

    public void setItems(List<PaymentItemDTO> items) {
        this.items = items;
    }
}
