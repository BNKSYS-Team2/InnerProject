package com.bnksys.innerProject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bnksys.innerProject.domain.PromotionMaterial;
import com.bnksys.innerProject.domain.UseType;

public interface PromotionMaterialRepository extends JpaRepository<PromotionMaterial, Long>{
	// userId을 통한 select
	Optional<List<PromotionMaterial>> findByUserNo(long userNo);
	
	// userId,utNo을 통한 select
	Optional<List<PromotionMaterial>> findByUserNoAndUtNo(long userNo, UseType ut);
	
	
}
