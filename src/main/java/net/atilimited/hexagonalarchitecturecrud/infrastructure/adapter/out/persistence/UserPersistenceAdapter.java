package net.atilimited.hexagonalarchitecturecrud.infrastructure.adapter.out.persistence;

import net.atilimited.hexagonalarchitecturecrud.domain.model.User;
import net.atilimited.hexagonalarchitecturecrud.domain.port.out.UserRepositoryPort;
import net.atilimited.hexagonalarchitecturecrud.domain.valueobject.Email;
import net.atilimited.hexagonalarchitecturecrud.infrastructure.adapter.out.persistence.entity.UserEntity;
import net.atilimited.hexagonalarchitecturecrud.infrastructure.adapter.out.persistence.repo.UserJpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class UserPersistenceAdapter implements UserRepositoryPort {

    private final UserJpaRepository jpaRepository;

    public UserPersistenceAdapter(UserJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public User save(User user) {
        UserEntity entity = toEntity(user);
        UserEntity savedEntity = jpaRepository.save(entity);
        return toDomain(savedEntity);
    }

    @Override
    public Optional<User> findById(Long id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public List<User> findAll() {
        return jpaRepository.findAll().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return jpaRepository.existsByEmail(email);
    }

    private UserEntity toEntity(User domain) {
        UserEntity entity = new UserEntity();

        if (domain.getId() != null) {
            entity.setId(domain.getId());
        }

        entity.setName(domain.getName());
        entity.setEmail(domain.getEmail().getValue());
        entity.setActive(domain.isActive());
        if (domain.getCreatedAt() != null) {
            entity.setCreatedAt(domain.getCreatedAt());
        }
        if (domain.getUpdatedAt() != null) {
            entity.setUpdatedAt(domain.getUpdatedAt());
        }

        return entity;
    }

    private User toDomain(UserEntity entity) {
        return new User(
                entity.getId(),
                entity.getName(),
                new Email(entity.getEmail()),
                entity.isActive(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}