package net.atilimited.hexagonalarchitecturecrud.application.service;

import net.atilimited.hexagonalarchitecturecrud.domain.port.in.UserUseCase;
import net.atilimited.hexagonalarchitecturecrud.domain.port.out.UserRepositoryPort;
import net.atilimited.hexagonalarchitecturecrud.domain.model.User;
import net.atilimited.hexagonalarchitecturecrud.domain.valueobject.Email;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService implements UserUseCase {
    private final UserRepositoryPort repository;

    public UserService(UserRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public User createUser(String name, String email) {
        if (repository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists: " + email);
        }

        User user = new User(name, new Email(email));
        return repository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public void updateEmail(Long id, String email) {
        User user = getUserById(id);
        user.changeEmail(new Email(email));
        repository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        if (!repository.findById(id).isPresent()) {
            throw new RuntimeException("User not found with id: " + id);
        }
        repository.deleteById(id);
    }
}