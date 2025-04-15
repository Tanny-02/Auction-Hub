package com.example.auctionbackend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.auctionbackend.repository.UserStatsRepository;
import com.example.auctionbackend.dto.UserStatsDTO;

@RestController
@RequestMapping("/api/users")
public class UserStatsController {
    private final UserStatsRepository statsRepository;

    @Autowired
    public UserStatsController(UserStatsRepository statsRepository) {
        this.statsRepository = statsRepository;
    }

    @GetMapping("/{userId}/stats")
    public ResponseEntity<UserStatsDTO> getUserStats(@PathVariable Integer userId) {
        return ResponseEntity.ok(statsRepository.getUserStats(userId));
    }
}