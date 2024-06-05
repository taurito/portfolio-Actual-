package com.app.portfolioBack.controller;

import com.app.portfolioBack.dto.Mensaje;
import com.app.portfolioBack.dto.UserDto;
import com.app.portfolioBack.entity.User;
import com.app.portfolioBack.service.UserService;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/listar")
    public ResponseEntity<List<User>> listUser(){
        List<User> usuarios = userService.listUser();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") int id){
        if (!userService.existUserById(id)){
            return new ResponseEntity(new Mensaje("El usuario no existe"), HttpStatus.NOT_FOUND);
        }else {
            User user = userService.getUserById(id).get();
            return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/{email}/{password}")
    public ResponseEntity<User> getUserByEmailPassword(@PathVariable("email") String email, @PathVariable("password") String password){
        if(!userService.existsByEmailAndPassword(email, password)){
            return new ResponseEntity(new Mensaje("Este usuario no existe"), HttpStatus.NOT_FOUND);
        }else{
            User usuario = userService.finByEmailAndPassword(email, password).get();
            return new ResponseEntity<>(usuario, HttpStatus.OK);
        }
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto){
        if(StringUtils.isBlank(userDto.getUserName())){
            return new ResponseEntity<>(new Mensaje("El username es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        if(StringUtils.isBlank(userDto.getPassword())){
            return new ResponseEntity<>(new Mensaje("El password es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        if(StringUtils.isBlank(userDto.getEmail())){
            return new ResponseEntity<>(new Mensaje("El email es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        
        User user = new User(
          userDto.getUserName(),
          userDto.getPassword(),
          userDto.getEmail(),
          userDto.getRol()      
        );
        
        userService.createUser(user);
        return new ResponseEntity<>(new Mensaje("Usuario creado exitosamente"), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") int id, @RequestBody UserDto userDto){
        if(!userService.existUserById(id)){
            return new ResponseEntity<>(new Mensaje("Este usuario no existe"), HttpStatus.NOT_FOUND);
        }
        if(StringUtils.isBlank(userDto.getUserName())){
            return new ResponseEntity<>(new Mensaje("El username es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        if(StringUtils.isBlank(userDto.getPassword())){
            return new ResponseEntity<>(new Mensaje("El password es obligatorio"), HttpStatus.BAD_REQUEST);
        }
        if(StringUtils.isBlank(userDto.getEmail())){
            return new ResponseEntity<>(new Mensaje("El email es obligatorio"), HttpStatus.BAD_REQUEST);
        }

        User user = userService.getUserById(id).get();

        user.setUserName(userDto.getUserName());
        user.setPassword(userDto.getPassword());
        user.setEmail(userDto.getEmail());
        user.setRol(userDto.getRol());

        userService.createUser(user);
        return new ResponseEntity<>(new Mensaje("usuario actualizado"), HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") int id){
        if(!userService.existUserById(id)){
            return new ResponseEntity<>(new Mensaje("Este usuario no existe"), HttpStatus.NOT_FOUND);
        }

        userService.deleteUser(id);
        return new ResponseEntity<>(new Mensaje("usuario eliminado"), HttpStatus.OK);
    }
}
