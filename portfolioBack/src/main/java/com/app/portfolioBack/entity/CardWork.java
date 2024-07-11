package com.app.portfolioBack.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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

    @OneToMany(mappedBy = "trabajo", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Tecnologia> tecnologias;

    public CardWork(String titulo, String imagen, String descripcion, String referencia, List<Tecnologia> tecnologias) {
        this.titulo = titulo;
        this.image = imagen;
        this.descripcion = descripcion;
        this.referencia = referencia;
        this.tecnologias = tecnologias;
    }
}
