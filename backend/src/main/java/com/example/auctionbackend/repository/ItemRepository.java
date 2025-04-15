package com.example.auctionbackend.repository;

import com.example.auctionbackend.model.Item;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.dao.EmptyResultDataAccessException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class ItemRepository {
    private final JdbcTemplate jdbcTemplate;
    
    public ItemRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Item> itemMapper = (rs, rowNum) -> {
        Item item = new Item();
        item.setItemId(rs.getInt("item_id"));
        item.setSellerId(rs.getInt("seller_id"));
        item.setTitle(rs.getString("title"));
        item.setDescription(rs.getString("description"));
        item.setStartingPrice(rs.getBigDecimal("starting_price"));
        item.setCurrentPrice(rs.getBigDecimal("current_price"));
        item.setEndTime(rs.getTimestamp("end_time").toLocalDateTime());
        return item;
    };

    public List<Item> findAll() {
        return jdbcTemplate.query("SELECT * FROM items", itemMapper);
    }

    public Optional<Item> findById(Integer id) {
        try {
            Item item = jdbcTemplate.queryForObject(
                "SELECT * FROM items WHERE item_id = ?",
                itemMapper,
                id
            );
            return Optional.ofNullable(item);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public boolean existsById(Integer id) {
        Integer count = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM items WHERE item_id = ?",
            Integer.class,
            id
        );
        return count != null && count > 0;
    }

    public Item update(Item item) {
        try {
            // Validate input
            if (item == null || item.getItemId() == null) {
                throw new IllegalArgumentException("Item and itemId must not be null");
            }

            // Get existing item first
            Item existingItem = findById(item.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found with ID: " + item.getItemId()));

            // Prepare update with null checks
            int updatedRows = jdbcTemplate.update(
                """
                UPDATE items 
                SET title = ?, 
                    description = ?, 
                    starting_price = ?, 
                    current_price = ?, 
                    end_time = ?, 
                    seller_id = ?
                WHERE item_id = ?
                """,
                item.getTitle() != null ? item.getTitle() : existingItem.getTitle(),
                item.getDescription() != null ? item.getDescription() : existingItem.getDescription(),
                item.getStartingPrice() != null ? item.getStartingPrice() : existingItem.getStartingPrice(),
                item.getCurrentPrice() != null ? item.getCurrentPrice() : existingItem.getCurrentPrice(),
                item.getEndTime() != null ? item.getEndTime() : existingItem.getEndTime(),
                item.getSellerId() != null ? item.getSellerId() : existingItem.getSellerId(),
                item.getItemId()
            );

            if (updatedRows == 0) {
                throw new RuntimeException("Failed to update item with ID: " + item.getItemId());
            }

            // Return updated item
            return findById(item.getItemId())
                .orElseThrow(() -> new RuntimeException("Failed to retrieve updated item"));
                
        } catch (Exception e) {
            throw new RuntimeException("Error updating item: " + e.getMessage(), e);
        }
    }

    public void deleteById(Integer id) {
        jdbcTemplate.update("DELETE FROM items WHERE item_id = ?", id);
        resetAutoIncrement();
    }

    public List<Item> search(String keyword, Double minPrice, Double maxPrice) {
        StringBuilder sql = new StringBuilder("SELECT * FROM items WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (keyword != null && !keyword.trim().isEmpty()) {
            sql.append(" AND (title LIKE ? OR description LIKE ?)");
            String likePattern = "%" + keyword + "%";
            params.add(likePattern);
            params.add(likePattern);
        }

        if (minPrice != null) {
            sql.append(" AND current_price >= ?");
            params.add(minPrice);
        }

        if (maxPrice != null) {
            sql.append(" AND current_price <= ?");
            params.add(maxPrice);
        }

        return jdbcTemplate.query(sql.toString(), itemMapper, params.toArray());
    }

    public List<Item> findBySellerId(Integer sellerId) {
        return jdbcTemplate.query(
            "SELECT * FROM items WHERE seller_id = ?",
            itemMapper,
            sellerId
        );
    }

    public List<Item> findByBuyerId(Integer buyerId) {
        return jdbcTemplate.query(
            """
            SELECT DISTINCT i.* 
            FROM items i 
            JOIN bids b ON b.item_id = i.item_id 
            WHERE b.buyer_id = ?
            """,
            itemMapper,
            buyerId
        );
    }

    public void save(Item item) {
        jdbcTemplate.update(
            "INSERT INTO items (seller_id, title, description, starting_price, current_price, end_time) VALUES (?, ?, ?, ?, ?, ?)",
            item.getSellerId(),
            item.getTitle(),
            item.getDescription(),
            item.getStartingPrice(),
            item.getCurrentPrice(),
            item.getEndTime()
        );
    }

    public List<Item> getActiveAuctions() {
        return jdbcTemplate.query(
            "SELECT * FROM active_auctions",
            itemMapper
        );
    }

    public void resetAutoIncrement() {
        jdbcTemplate.execute("CALL reset_item_ids()");
    }
}