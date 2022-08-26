package com.bnksys.innerProject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bnksys.innerProject.domain.MaterialSchedule;
import com.bnksys.innerProject.domain.PromotionMaterial;
import com.bnksys.innerProject.domain.PromotionSchedule;

public interface MaterialScheduleRepository extends JpaRepository<MaterialSchedule, Long>{
	// pmNo로 조회
	Optional<List<MaterialSchedule>> findByPmNo(PromotionMaterial pmNo);
	
	// psNo로 조회
	Optional<List<MaterialSchedule>> findByPsNo(PromotionSchedule psNo);
	
	
	// psNo로 삭제
	Long deleteByPsNo(PromotionSchedule psNo);
	
	// PmNo로 삭제
	Long deleteByPmNo(PromotionMaterial pmNo);
		
}
