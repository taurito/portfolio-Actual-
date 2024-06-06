package com.app.portfolioBack.controller;

import com.app.portfolioBack.dto.CardWorkDto;
import com.app.portfolioBack.dto.Mensaje;
import com.app.portfolioBack.entity.CardWork;
import com.app.portfolioBack.service.CardWorkService;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/card")
@CrossOrigin(origins = "http://localhost:4200")
public class CardWorkController {
    @Autowired
    CardWorkService cardWorkService;

    private static final String UPLOAD_DIR = "c:/SAUL_JM/imagenApi/";
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
                                            @RequestParam("referencia")String referencia) throws IOException {

        CardWork card = new CardWork();
        card.setTitulo(titulo);
        card.setDescripcion(descripcion);
        card.setReferencia(referencia);

        cardWorkService.crearCard(card, image);
        return new ResponseEntity<>(new Mensaje("trabajo creado exitosamente"), HttpStatus.OK);
    }
    /*@PutMapping("/update/{id}")
    public ResponseEntity<?> updateCardWork(@PathVariable("id") int id, @RequestBody CardWorkDto cardWorkDto){
        if(!cardWorkService.existById(id)){
            return new ResponseEntity<>(new Mensaje("Este card no existe"), HttpStatus.NOT_FOUND);
        }
        if(StringUtils.isBlank(cardWorkDto.getTitulo())){
            return new ResponseEntity<>(new Mensaje("El titulo es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        if(StringUtils.isBlank(cardWorkDto.getDescripcion())){
            return new ResponseEntity<>(new Mensaje("La descripcion es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        if(StringUtils.isBlank(cardWorkDto.getReferencia())){
            return new ResponseEntity<>(new Mensaje("La referencia es obligatorio"), HttpStatus.BAD_REQUEST);
        }

        CardWork card = cardWorkService.getCardById(id).get();

        card.setTitulo(cardWorkDto.getTitulo());
        card.setImage(cardWorkDto.getImage());
        card.setDescripcion(cardWorkDto.getDescripcion());
        card.setReferencia(cardWorkDto.getReferencia());

        cardWorkService.crearCard(card);
        return new ResponseEntity<>(new Mensaje("Card actualizado exitosamente"), HttpStatus.OK);
    }*/

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCardWork (@PathVariable("id") int id){
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
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, "image/jpg", "image/png", "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
}
