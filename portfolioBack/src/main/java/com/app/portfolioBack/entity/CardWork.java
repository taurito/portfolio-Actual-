package com.app.portfolioBack.entity;

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
public class CardWork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idcard_work")
    private int idCardWock;
    private String titulo;
    private String image;
    private String descripcion;
    private String referencia;

    public CardWork(String titulo, String imagen, String descripcion, String referencia) {
        this.titulo = titulo;
        this.image = imagen;
        this.descripcion = descripcion;
        this.referencia = referencia;
    }
}
