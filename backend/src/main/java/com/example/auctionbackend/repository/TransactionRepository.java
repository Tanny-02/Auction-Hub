package com.example.auctionbackend.repository;

import com.example.auctionbackend.model.Transaction;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class TransactionRepository {
    private final JdbcTemplate jdbcTemplate;
    
    public TransactionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Transaction> transactionMapper = (rs, rowNum) -> {
        Transaction transaction = new Transaction();
        transaction.setTransactionId(rs.getInt("transaction_id"));
        transaction.setItemId(rs.getInt("item_id"));
        transaction.setBuyerId(rs.getInt("buyer_id"));
        transaction.setSellerId(rs.getInt("seller_id"));
        transaction.setFinalPrice(rs.getBigDecimal("final_price"));
        transaction.setPaymentId(rs.getInt("payment_id"));
        return transaction;
    };

    public void save(Transaction transaction) {
        jdbcTemplate.update(
            "INSERT INTO transactions (item_id, buyer_id, seller_id, final_price, payment_id) VALUES (?, ?, ?, ?, ?)",
            transaction.getItemId(),
            transaction.getBuyerId(),
            transaction.getSellerId(),
            transaction.getFinalPrice(),
            transaction.getPaymentId()
        );
    }

    public List<Transaction> findByUserId(Integer userId) {
        return jdbcTemplate.query(
            "SELECT * FROM transactions WHERE buyer_id = ? OR seller_id = ?",
            transactionMapper,
            userId,
            userId
        );
    }
}