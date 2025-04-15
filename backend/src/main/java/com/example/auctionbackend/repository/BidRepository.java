package com.example.auctionbackend.repository;

import com.example.auctionbackend.model.Bid;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class BidRepository {
    private final JdbcTemplate jdbcTemplate;
    
    public BidRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Bid> bidMapper = (rs, rowNum) -> {
        Bid bid = new Bid();
        bid.setBidId(rs.getInt("bid_id"));
        bid.setItemId(rs.getInt("item_id"));
        bid.setBuyerId(rs.getInt("buyer_id"));
        bid.setBidAmount(rs.getBigDecimal("bid_amount"));
        bid.setBidDate(rs.getDate("bid_date").toLocalDate());
        return bid;
    };

    public List<Bid> findByItemId(Integer itemId) {
        return jdbcTemplate.query(
            "SELECT * FROM bids WHERE item_id = ? ORDER BY bid_amount DESC",
            bidMapper,
            itemId
        );
    }

    public void save(Bid bid) {
        jdbcTemplate.update(
            "INSERT INTO bids (item_id, buyer_id, bid_amount, bid_date) VALUES (?, ?, ?, ?)",
            bid.getItemId(),
            bid.getBuyerId(),
            bid.getBidAmount(),
            bid.getBidDate()
        );
    }
}