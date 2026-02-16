package net.atilimited.hexagonalarchitecturecrud.infrastructure.adapter.out.persistence.repo;

import net.atilimited.hexagonalarchitecturecrud.infrastructure.adapter.out.persistence.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserJpaRepository extends JpaRepository<UserEntity, Long> {
    boolean existsByEmail(String email);
}