package com.app.portfolioBack.repository;

import com.app.portfolioBack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmailAndPassword(String email, String password);
    boolean existsByEmailAndPassword(String email, String password);
}
