package com.example.auctionbackend.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Bid {
    private Integer bidId;
    private Integer itemId;
    private Integer buyerId;
    private BigDecimal bidAmount;
    private LocalDate bidDate;

    // Getters and Setters
    public Integer getBidId() { return bidId; }
    public void setBidId(Integer bidId) { this.bidId = bidId; }
    public Integer getItemId() { return itemId; }
    public void setItemId(Integer itemId) { this.itemId = itemId; }
    public Integer getBuyerId() { return buyerId; }
    public void setBuyerId(Integer buyerId) { this.buyerId = buyerId; }
    public BigDecimal getBidAmount() { return bidAmount; }
    public void setBidAmount(BigDecimal bidAmount) { this.bidAmount = bidAmount; }
    public LocalDate getBidDate() { return bidDate; }
    public void setBidDate(LocalDate bidDate) { this.bidDate = bidDate; }
}