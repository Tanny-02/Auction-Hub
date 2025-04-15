package com.example.auctionbackend.repository;

import com.example.auctionbackend.model.Product;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductRepository {
    private final JdbcTemplate jdbc;
    
    public ProductRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private final RowMapper<Product> productMapper = (rs, rowNum) -> {
        Product product = new Product();
        product.setId(rs.getLong("id"));
        product.setName(rs.getString("name"));
        product.setDescription(rs.getString("description"));
        product.setPrice(rs.getDouble("price"));
        return product;
    };

    public List<Product> findAll() {
        return jdbc.query("SELECT * FROM products", productMapper);
    }

    public Product save(Product product) {
        jdbc.update(
            "INSERT INTO products (name, description, price) VALUES (?, ?, ?)",
            product.getName(), product.getDescription(), product.getPrice()
        );
        return product;
    }
}