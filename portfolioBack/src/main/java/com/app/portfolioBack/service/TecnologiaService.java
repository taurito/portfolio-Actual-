package com.app.portfolioBack.service;

import com.app.portfolioBack.entity.Tecnologia;
import com.app.portfolioBack.repository.TecnologiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TecnologiaService {
    @Autowired
    private TecnologiaRepository tecnologiaRepository;

    public List<Tecnologia> findAll() {
        return tecnologiaRepository.findAll();
    }

    public Optional<Tecnologia> findById(int id){
        return tecnologiaRepository.findById(id);
    }

    public Tecnologia save(Tecnologia tecnologia){
        return tecnologiaRepository.save(tecnologia);
    }

    public void deleteById(int id){
        tecnologiaRepository.deleteById(id);
    }
}
