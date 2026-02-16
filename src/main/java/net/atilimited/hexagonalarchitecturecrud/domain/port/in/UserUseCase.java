package net.atilimited.hexagonalarchitecturecrud.domain.port.in;

import net.atilimited.hexagonalarchitecturecrud.domain.model.User;
import java.util.List;

public interface UserUseCase {
    User createUser(String name, String email);
    User getUserById(Long id);
    List<User> getAllUsers();
    void updateEmail(Long id, String email);
    void deleteUser(Long id);
}