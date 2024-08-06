package com.app.portfolioBack.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Tecnologia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTecnologia;
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "trabajo_id", nullable = false)
    @JsonBackReference
    private CardWork trabajo;

    public Tecnologia(String nombre, CardWork trabajo) {
        this.nombre = nombre;
        this.trabajo = trabajo;
    }
}
