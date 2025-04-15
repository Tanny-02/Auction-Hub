package com.example.auctionbackend.controller;

import com.example.auctionbackend.model.Transaction;
import com.example.auctionbackend.repository.TransactionRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {
    private final TransactionRepository repository;

    public TransactionController(TransactionRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/user/{userId}")
    public List<Transaction> getUserTransactions(@PathVariable Integer userId) {
        return repository.findByUserId(userId);
    }

    @PostMapping
    public void createTransaction(@RequestBody Transaction transaction) {
        repository.save(transaction);
    }
}