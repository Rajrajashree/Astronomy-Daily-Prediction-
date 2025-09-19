package com.react.reactproject.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.react.reactproject.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
 //boolean existsByEmail(String email);
//    Optional<User> findByEmailAndPassword(String email, String password);
    Optional<User> findByPhone(String phone);

}