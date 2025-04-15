package com.example.auctionbackend.controller;

import com.example.auctionbackend.model.Item;
import com.example.auctionbackend.repository.ItemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {
    private final ItemRepository repository;

    public ItemController(ItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Item> getAllItems() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Integer id) {
        return repository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public void createItem(@RequestBody Item item) {
        repository.save(item);
    }

    @GetMapping("/user/{userId}")
    public List<Item> getByUser(
        @PathVariable Integer userId,
        @RequestParam String type
    ) {
        return type.equals("listed") 
            ? repository.findBySellerId(userId)
            : repository.findByBuyerId(userId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(
        @PathVariable Integer id,
        @RequestBody Item item
    ) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        item.setItemId(id);
        return ResponseEntity.ok(repository.update(item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Integer id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<Item> searchItems(
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice
    ) {
        return repository.search(keyword, minPrice, maxPrice);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Item>> getActiveAuctions() {
        return ResponseEntity.ok(repository.getActiveAuctions());
    }
}