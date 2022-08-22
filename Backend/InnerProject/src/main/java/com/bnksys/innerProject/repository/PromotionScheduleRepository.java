package com.bnksys.innerProject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bnksys.innerProject.domain.PromotionSchedule;
import com.bnksys.innerProject.domain.ScheduleDate;

public interface PromotionScheduleRepository extends JpaRepository<PromotionSchedule, Long>{
	//내 배포목록 가져오기
	Optional<List<PromotionSchedule>> findByUserNo(long userNo);
}
