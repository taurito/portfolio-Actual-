package com.app.portfolioBack.service;

import com.app.portfolioBack.entity.CardWork;
import com.app.portfolioBack.entity.Tecnologia;
import com.app.portfolioBack.repository.CardWorkRepository;
import com.app.portfolioBack.repository.TecnologiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CardWorkService {

    @Autowired
    CardWorkRepository cardWorkRepository;
    @Autowired
    TecnologiaRepository tecnologiaRepository;

    private static final String UPLOAD_DIR = new File("src/main/resources/static/images/").getAbsolutePath(); //c:/SAUL_JM/imagenApi/

    public List<CardWork> listCardWorks (){
        return cardWorkRepository.findAll();
    }

    public Optional<CardWork> getCardById(int id){
        return cardWorkRepository.findById(id);
    }

    public void crearCard (CardWork card, MultipartFile file) throws IOException {
        if(!file.isEmpty()){
            String filename = file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, filename);
            Files.copy(file.getInputStream(), filePath);
            card.setImage(filename);
        }
        for (Tecnologia tecnologia: card.getTecnologias()){
            tecnologia.setTrabajo(card);
        }
        cardWorkRepository.save(card);

    }

    @Transactional
    public void updateCard(CardWork card, List<Tecnologia> tecnologias, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()){
            String filename = file.getOriginalFilename();
            if(card.getImage().equals(filename)){
                // Eliminar tecnologías antiguas
                tecnologiaRepository.deleteAll(card.getTecnologias());

                // Limpiar la lista de tecnologías
                card.getTecnologias().clear();

                // Asignar nuevas tecnologías
                for (Tecnologia tecnologia : tecnologias) {
                    tecnologia.setTrabajo(card);
                    card.getTecnologias().add(tecnologia);
                }
                cardWorkRepository.save(card);

            }else{
                Path filePath = Paths.get(UPLOAD_DIR, filename);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                card.setImage(filename);
                // Eliminar tecnologías antiguas
                tecnologiaRepository.deleteAll(card.getTecnologias());

                // Limpiar la lista de tecnologías
                card.getTecnologias().clear();

                // Asignar nuevas tecnologías
                for (Tecnologia tecnologia : tecnologias) {
                    tecnologia.setTrabajo(card);
                    card.getTecnologias().add(tecnologia);
                }
                cardWorkRepository.save(card);
            }
        }
    }

    public void deleteCard(int id)throws IOException{
        Optional<CardWork> card = cardWorkRepository.findById(id);

        if(card.isPresent()){
            CardWork trabajo = card.get();
            String imagePath = UPLOAD_DIR + trabajo.getImage();
            Files.deleteIfExists(Paths.get(imagePath));
            cardWorkRepository.deleteById(id);
        }

    }

    public boolean existById(int id){
        return cardWorkRepository.existsById(id);
    }


}
