package com.app.portfolioBack.service;

import com.app.portfolioBack.entity.User;
import com.app.portfolioBack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<User> listUser(){
        return userRepository.findAll();
    }

    public Optional<User> getUserById(int id){
        return userRepository.findById(id);
    }

    public void createUser (User user){
        userRepository.save(user);
    }

    public void deleteUser(int id){
        userRepository.deleteById(id);
    }

    public boolean existUserById(int id){
        return userRepository.existsById(id);
    }

    public Optional<User> finByEmailAndPassword(String email, String password){
        return userRepository.findByEmailAndPassword(email, password);
    }

    public boolean existsByEmailAndPassword(String email, String password){
        return userRepository.existsByEmailAndPassword(email, password);
    }
}
