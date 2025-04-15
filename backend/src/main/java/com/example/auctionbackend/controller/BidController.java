package com.example.auctionbackend.controller;

import com.example.auctionbackend.model.Bid;
import com.example.auctionbackend.repository.BidRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bids")
@CrossOrigin(origins = "http://localhost:5173")
public class BidController {
    private final BidRepository repository;

    public BidController(BidRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/item/{itemId}")
    public List<Bid> getBidsByItem(@PathVariable Integer itemId) {
        return repository.findByItemId(itemId);
    }

    @PostMapping
    public void placeBid(@RequestBody Bid bid) {
        bid.setBidDate(LocalDate.now());
        repository.save(bid);
    }
}