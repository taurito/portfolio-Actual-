package com.app.portfolioBack.repository;

import com.app.portfolioBack.entity.CardWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardWorkRepository extends JpaRepository<CardWork, Integer> {
}
