package com.app.portfolioBack.controller;


import com.app.portfolioBack.dto.Mensaje;
import com.app.portfolioBack.entity.CardWork;
import com.app.portfolioBack.entity.Tecnologia;
import com.app.portfolioBack.repository.TecnologiaRepository;
import com.app.portfolioBack.service.CardWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/card")
@CrossOrigin(origins = "http://localhost:4200")
public class CardWorkController {
    @Autowired
    CardWorkService cardWorkService;


    private static final String UPLOAD_DIR = new File("src/main/resources/static/images/").getAbsolutePath();


    @GetMapping("/lista")
    public ResponseEntity<List<CardWork>> listCardWork(){
        List<CardWork> cards = cardWorkService.listCardWorks();
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }
    @GetMapping("/detail/{id}")
    public ResponseEntity<CardWork> getCardById(@PathVariable("id") int id){
        if(!cardWorkService.existById(id)){
            return new ResponseEntity(new Mensaje("El cardWork no existe"), HttpStatus.NOT_FOUND);
        }else{
            CardWork cardWork = cardWorkService.getCardById(id).get();
            return new ResponseEntity<>(cardWork, HttpStatus.OK);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCardWork(@RequestParam("titulo") String titulo,
                                            @RequestParam("image")MultipartFile image,
                                            @RequestParam("descripcion") String descripcion,
                                            @RequestParam("referencia")String referencia,
                                            @RequestPart("tecnologias") List<Tecnologia> tecnologiasJson) throws IOException {



        CardWork card = new CardWork();
        card.setTitulo(titulo);
        card.setDescripcion(descripcion);
        card.setReferencia(referencia);
        card.setTecnologias(tecnologiasJson);
        System.out.println(card);

        cardWorkService.crearCard(card, image);
        return new ResponseEntity<>(new Mensaje("trabajo creado exitosamente"), HttpStatus.OK);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCardWork(@PathVariable("id") int id,
                                            @RequestPart("titulo") String titulo,
                                            @RequestPart("image") MultipartFile image,
                                            @RequestPart("descripcion") String descripcion,
                                            @RequestPart("referencia") String referencia,
                                            @RequestPart("tecnologias") List<Tecnologia> tecnologiasJson)throws IOException{

        Optional<CardWork> existingCardOpt = cardWorkService.getCardById(id);

        if(!existingCardOpt.isPresent()){
            return new ResponseEntity<>(new Mensaje("Este card no existe"), HttpStatus.NOT_FOUND);
        }

        CardWork card = cardWorkService.getCardById(id).get();

        card.setTitulo(titulo);
        card.setDescripcion(descripcion);
        card.setReferencia(referencia);

        cardWorkService.updateCard(card, tecnologiasJson, image);
        return new ResponseEntity<>(new Mensaje("Card actualizado exitosamente"), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCardWork (@PathVariable("id") int id) throws IOException {
        if(!cardWorkService.existById(id)){
            return new ResponseEntity<>(new Mensaje("Estes card no existe"), HttpStatus.NOT_FOUND);
        }

        cardWorkService.deleteCard(id);
        return new ResponseEntity<>(new Mensaje("Card eliminado"), HttpStatus.OK);
    }

    @GetMapping("/imagen/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path file = Paths.get(UPLOAD_DIR).resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                String contentType = Files.probeContentType(file);

                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .header(HttpHeaders.CONTENT_TYPE, contentType != null ? contentType : "application/octet-stream")
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
}
