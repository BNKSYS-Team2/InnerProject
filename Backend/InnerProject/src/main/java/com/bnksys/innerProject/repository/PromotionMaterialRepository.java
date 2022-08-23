package com.bnksys.innerProject.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bnksys.innerProject.domain.ClientInfo;
import com.bnksys.innerProject.domain.PromotionMaterial;
import com.bnksys.innerProject.domain.UseType;

public interface PromotionMaterialRepository extends JpaRepository<PromotionMaterial, Long>{
	// userId을 통한 select
	Optional<List<PromotionMaterial>> findByUserNo(long userNo);
	
	// userId,utNo을 통한 select
	Optional<List<PromotionMaterial>> findByUserNoAndUtNo(long userNo, UseType ut);
	
	
	//클라이언트 ID로 해당 클라이언트에 해당 시간에 뿌려져야 할 저작물 리스트 리턴
	@Query("SELECT  pm " + 
			"FROM PromotionSchedule ps " + 
			"    , ScheduleClient sc " + 
			"    , MaterialSchedule ms " + 
			"    , PromotionMaterial pm " + 
			"WHERE sc.clientNo = :clientNo " + 
			"AND ps.psNo = sc.psNo " + 
			"AND ps.startDt <= :nowDt " + 
			"AND ps.endDt > :nowDt " + 
			"AND ms.psNo = ps.psNo " +
			"AND pm.pmNo = ms.pmNo" 
			)
	Optional<List<PromotionMaterial>> findpmNoListByClientNo(@Param("clientNo")ClientInfo clientNo, @Param("nowDt")LocalDateTime nowDt);
}
