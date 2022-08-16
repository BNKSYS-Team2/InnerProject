package com.bnksys.innerProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bnksys.innerProject.domain.Template;

public interface TemplateRepository extends JpaRepository<Template, Long>{
	
}
