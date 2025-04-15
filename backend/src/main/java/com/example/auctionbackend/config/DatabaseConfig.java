package com.example.auctionbackend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import jakarta.annotation.PostConstruct;

@Configuration
public class DatabaseConfig {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void testConnection() {
        try {
            String result = jdbcTemplate.queryForObject("SELECT 1", String.class);
            System.out.println("Database Connection Successful! Test Query Result: " + result);
        } catch (Exception e) {
            System.err.println("Database Connection Failed!");
            e.printStackTrace();
        }
    }
}