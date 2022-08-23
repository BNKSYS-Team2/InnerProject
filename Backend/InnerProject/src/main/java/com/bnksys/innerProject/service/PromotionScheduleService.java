package com.bnksys.innerProject.service;

import java.time.LocalDateTime;
import java.util.List;

import com.bnksys.innerProject.domain.PromotionSchedule;
import com.bnksys.innerProject.dto.DayDto;
import com.bnksys.innerProject.dto.PromotionMaterialDto;
import com.bnksys.innerProject.dto.PromotionScheduleDto;
import com.bnksys.innerProject.dto.TimeDto;

public interface PromotionScheduleService {

	//스케줄 등록
	boolean setSchedule(PromotionSchedule ps, List<Long> clientNoList, List<Long> pmNoList);
	
	//스케줄 등록 가능 여부 체크
	boolean isSettable(PromotionSchedule ps, List<Long> clientNoList);
	
	//스케줄 등록 가능 일자리스트 조회
	List<DayDto> getDayList(String dt, List<Long> clientNoList);
	
	//스케줄 등록 가능 시간리스트 조회(시간별 등록된 예약물 갯수 조회)
	List<TimeDto> getTimeList(String dt, List<Long> clientNoList);
	
	//자신의 스케줄 현황 조회
	List<PromotionScheduleDto> getScheduleList(long userNo);
	
}
