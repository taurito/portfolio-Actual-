package com.app.portfolioBack.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CardWorkDto {

    @NotBlank
    private String titulo;
    private String image;
    @NotBlank
    private String descripcion;
    @NotBlank
    private String referencia;
}
