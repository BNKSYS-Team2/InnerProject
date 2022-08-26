package com.bnksys.innerProject.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bnksys.innerProject.domain.ClientInfo;
import com.bnksys.innerProject.domain.PromotionSchedule;

public interface PromotionScheduleRepository extends JpaRepository<PromotionSchedule, Long>{
	//내 배포목록 가져오기
	Optional<List<PromotionSchedule>> findByUserNoOrderByStartDtDesc(long userNo);
	
	
	//해당 지점에 시작시간 ~ 끝시간동안 몇개가 배포 예약 되어있는지 갯수 리턴
	@Query("SELECT count(ps) " + 
			"FROM PromotionSchedule ps " + 
			"    , ScheduleClient sc " + 
			"WHERE sc.clientNo = :clientNo " + 
			"AND ps.psNo = sc.psNo " + 
			"AND ((ps.startDt <= :startDt AND ps.endDt > :startDt) " + 
			"OR "+
			"(ps.startDt < :endDt AND ps.endDt >= :endDt))")
	Optional<Integer> getPromotinMaterialCountByClientNo(@Param("clientNo")ClientInfo clientNo, @Param("startDt")LocalDateTime startDt, @Param("endDt")LocalDateTime endDt);
	
	
	
}
