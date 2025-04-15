package com.example.auctionbackend.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.auctionbackend.dto.UserStatsDTO;

@Repository
public class UserStatsRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserStatsRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<UserStatsDTO> statsMapper = (rs, rowNum) -> {
        UserStatsDTO stats = new UserStatsDTO();
        stats.setUserId(rs.getInt("user_id"));
        stats.setUsername(rs.getString("username"));
        stats.setItemsListed(rs.getInt("items_listed"));
        stats.setBidsPlaced(rs.getInt("bids_placed"));
        stats.setAuctionsWon(rs.getInt("auctions_won"));
        stats.setTotalSpent(rs.getBigDecimal("total_spent"));
        stats.setTotalEarned(rs.getBigDecimal("total_earned"));
        return stats;
    };

    public UserStatsDTO getUserStats(Integer userId) {
        return jdbcTemplate.queryForObject(
            "SELECT * FROM user_statistics WHERE user_id = ?",
            statsMapper,
            userId
        );
    }
}