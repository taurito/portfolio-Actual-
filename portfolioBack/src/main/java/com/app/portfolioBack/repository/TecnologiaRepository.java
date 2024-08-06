package com.app.portfolioBack.repository;

import com.app.portfolioBack.entity.Tecnologia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TecnologiaRepository extends JpaRepository<Tecnologia, Integer> {
    List<Tecnologia> findByNombre(String nombre);
}
