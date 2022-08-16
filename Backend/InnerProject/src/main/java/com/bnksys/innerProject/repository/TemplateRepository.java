package com.bnksys.innerProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bnksys.innerProject.domain.User;

public interface TemplateRepository extends JpaRepository<User, Long>{
	
}
