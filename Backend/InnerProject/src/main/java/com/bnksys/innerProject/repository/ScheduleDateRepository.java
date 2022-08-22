package com.bnksys.innerProject.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bnksys.innerProject.domain.ScheduleDate;
import com.bnksys.innerProject.domain.ScheduleDatePk;

public interface ScheduleDateRepository extends JpaRepository<ScheduleDate, ScheduleDatePk>{

	//연, 월로 일자별 예약이 가득 찬 일자 조회
	@Query("SELECT SD.day FROM ScheduleDate SD WHERE SD.year = :year AND SD.month = :month GROUP BY SD.day HAVING sum(SD.pmCnt)>=3*10")
	Optional<List<Integer>> findDay(@Param("year")int year, @Param("month")int month);
	
	//연, 월, 일, 저작물 갯수로 스케줄 조회
	@Query("SELECT new map(SD.time as time,sum(SD.pmCnt) as pmCnt) FROM ScheduleDate SD WHERE SD.year = :year AND SD.month = :month AND SD.day = :day GROUP BY SD.time")
	Optional<List<Map<String,Integer>>> findTime(@Param("year")int year, @Param("month")int month, @Param("day")int day);
	
	//dt1 이상, dt2미만의 시간동안 배포등록된 저작물의 갯수가 3개이상인 애들이 존재하는지 리턴
	Optional<Boolean> existsByDtGreaterThanEqualAndDtLessThanAndPmCntGreaterThanEqual(int dt1, int dt2, int pmCnt);
	
}
