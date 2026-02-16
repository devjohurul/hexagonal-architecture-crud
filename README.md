# Hexagonal Architecture CRUD Project

This project constitutes a sample implementation of a **CRUD** application using **Java** and **Spring Boot**, architected according to **Hexagonal Architecture (Ports and Adapters)** principles.

The primary goal of this architecture is to isolate the core business logic from external concerns such as the user interface, database, or other external systems. This ensures the application is easier to test, maintain, and evolve.

## Architecture Overview

The project follows the "Dependency Rule," where source code dependencies only point inward. The inner layers (Domain) know nothing about the outer layers (Infrastructure).

### Key Layers

1.  **Domain Layer** (`domain`)
    *   **Core Business Logic**: Contains the heart of the business logic.
    *   **No Framework Dependencies**: This layer remains pure Java and does not depend on Spring or any persistence framework.
    *   **Components**:
        *   `model`: Rich domain entities (e.g., `User`).
        *   `valueobject`: Immutable value objects (e.g., `Email`).
        *   `port`: Interfaces defining the entry (driving) and exit (driven) points.
            *   `in`: Use Cases (Input Ports).
            *   `out`: Repository Interfaces (Output Ports).

2.  **Application Layer** (`application`)
    *   **Service Layer**: Orchestrates the flow of data to and from the domain entities.
    *   **Implementation**: Implements input ports (Use Cases) and calls output ports (Repositories).

3.  **Infrastructure Layer** (`infrastructure`)
    *   **Adapters**: Contains the implementation details that interact with the outside world.
    *   **Inbound (Driving) Adapters**: REST Controllers handles HTTP requests.
    *   **Outbound (Driven) Adapters**: Persistence implementations (JPA/Hibernate) handling database operations.
    *   **Configuration**: Spring configuration classes.


## Key Principles

This project strictly adheres to the following Hexagonal Architecture best practices:

*   **Dependency Rule**: Dependencies point inward. The Domain layer has zero dependencies on outer layers (Infrastructure or Application).
*   **Separate Models**: We use different models for Domain (Entities), Persistence, and API (DTOs) to prevent tightly coupling external contracts with internal logic.
*   **Use Cases as Interfaces**: Input ports are defined as interfaces in the Domain layer and implemented in the Application layer.
*   **Mappers**: Mappers are used to convert between Domain models and Infrastructure models (DTOs/Entities).
*   **Configuration**: Adapters are wired to ports using Spring's dependency injection mechanisms.
*   **Testing**: Domain and Application layers are designed to be testable without loading the full Spring context.
*   **Validation**:
    *   **API Validation**: Occurs in the controllers (Infrastructure).
    *   **Business Validation**: Occurs inside the Domain entities and value objects.


## Project Structure

```text
src/main/java/net/atilimited/hexagonalarchitecturecrud/
├── domain/                    # The Center: Business Logic
│   ├── model/                 # Domain Entities
│   ├── valueobject/           # Value Objects
│   ├── port/
│   │   ├── in/                # Input Ports (Use Case Interfaces)
│   │   └── out/               # Output Ports (Repository Interfaces)
│   └── exception/             # Domain Exception
├── application/               # The Orchestrator
│   └── service/               # Implementation of Input Ports
└── infrastructure/            # The Edge: Frameworks & I/O
    ├── adapter/
    │   ├── in/                # Driving Adapters (e.g., REST Controllers)
    │   └── out/               # Driven Adapters (e.g., Persistence)
    └── config/                # Spring Configuration
