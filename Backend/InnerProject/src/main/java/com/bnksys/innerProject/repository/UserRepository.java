package com.bnksys.innerProject.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bnksys.innerProject.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	// userId을 통한 select
	Optional<User> findByUserId(String userId);
}
