package net.atilimited.hexagonalarchitecturecrud.domain.model;

import net.atilimited.hexagonalarchitecturecrud.domain.valueobject.Email;

import java.time.LocalDateTime;

public class User {
    private Long id;
    private String name;
    private Email email;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public User(String name, Email email) {
        this.name = name;
        this.email = email;
        this.active = true;
        this.createdAt = LocalDateTime.now();
    }

    public User(Long id, String name, Email email, boolean active,
                LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public void deactivate() {
        this.active = false;
        this.updatedAt = LocalDateTime.now();
    }

    public void changeEmail(Email email) {
        this.email = email;
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Email getEmail() {
        return email;
    }

    public boolean isActive() {
        return active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}