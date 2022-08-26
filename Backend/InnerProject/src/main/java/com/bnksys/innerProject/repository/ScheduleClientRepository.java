package com.bnksys.innerProject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bnksys.innerProject.domain.ClientInfo;
import com.bnksys.innerProject.domain.PromotionSchedule;
import com.bnksys.innerProject.domain.ScheduleClient;

public interface ScheduleClientRepository extends JpaRepository<ScheduleClient, Long>{
	// pmNo로 조회
	Optional<List<ScheduleClient>> findByClientNo(ClientInfo clientNo);
	
	// psNo로 조회
	Optional<List<ScheduleClient>> findByPsNo(PromotionSchedule psNo);
	
	Long deleteByClientNo(ClientInfo clientNo);
	
	Long deleteByPsNo(PromotionSchedule psNo);
	

}
