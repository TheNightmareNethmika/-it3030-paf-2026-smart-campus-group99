package com.uniflow.system.repository;

import com.uniflow.system.model.Role;
import com.uniflow.system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    List<User> findByRole(Role role);

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailIgnoreCase(String email);

    @Modifying
    @Transactional
    @Query("update User u set u.role = :role where u.id = :id")
    int updateRoleById(@Param("id") String id, @Param("role") Role role);
}
