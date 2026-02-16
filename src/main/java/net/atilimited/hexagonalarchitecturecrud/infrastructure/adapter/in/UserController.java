package net.atilimited.hexagonalarchitecturecrud.infrastructure.adapter.in;

import net.atilimited.hexagonalarchitecturecrud.domain.port.in.UserUseCase;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserUseCase useCase;

    public UserController(UserUseCase useCase) {
        this.useCase = useCase;
    }

    @PostMapping("/create")
    public ResponseEntity<Object> create(@RequestBody CreateUserRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(useCase.createUser(req.name(), req.email()));
    }

    @GetMapping("/{id}")
    public Object get(@PathVariable Long id) {
        return useCase.getUserById(id);
    }

    @GetMapping("/all")
    public Object all() {
        return useCase.getAllUsers();
    }

    @PutMapping("/{id}/email")
    public ResponseEntity<Void> update(@PathVariable Long id,
                                       @RequestBody UpdateEmailRequest req) {
        useCase.updateEmail(id, req.email());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        useCase.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

record CreateUserRequest(String name, String email) {}
record UpdateEmailRequest(String email) {}