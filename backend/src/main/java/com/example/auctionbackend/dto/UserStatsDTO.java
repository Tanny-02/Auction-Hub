package com.example.auctionbackend.dto;

import java.math.BigDecimal;

public class UserStatsDTO {
    private Integer userId;
    private String username;
    private Integer itemsListed;
    private Integer bidsPlaced;
    private Integer auctionsWon;
    private BigDecimal totalSpent;
    private BigDecimal totalEarned;

    // Getters and Setters
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public Integer getItemsListed() { return itemsListed; }
    public void setItemsListed(Integer itemsListed) { this.itemsListed = itemsListed; }
    
    public Integer getBidsPlaced() { return bidsPlaced; }
    public void setBidsPlaced(Integer bidsPlaced) { this.bidsPlaced = bidsPlaced; }
    
    public Integer getAuctionsWon() { return auctionsWon; }
    public void setAuctionsWon(Integer auctionsWon) { this.auctionsWon = auctionsWon; }
    
    public BigDecimal getTotalSpent() { return totalSpent; }
    public void setTotalSpent(BigDecimal totalSpent) { this.totalSpent = totalSpent; }
    
    public BigDecimal getTotalEarned() { return totalEarned; }
    public void setTotalEarned(BigDecimal totalEarned) { this.totalEarned = totalEarned; }
}