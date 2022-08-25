package com.bnksys.innerProject.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoField;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnksys.innerProject.domain.ClientInfo;
import com.bnksys.innerProject.domain.MaterialSchedule;
import com.bnksys.innerProject.domain.PromotionMaterial;
import com.bnksys.innerProject.domain.PromotionSchedule;
import com.bnksys.innerProject.domain.ScheduleClient;
import com.bnksys.innerProject.dto.DayDto;
import com.bnksys.innerProject.dto.PromotionMaterialDto;
import com.bnksys.innerProject.dto.PromotionScheduleDto;
import com.bnksys.innerProject.dto.TimeDto;
import com.bnksys.innerProject.repository.ClientInfoRepository;
import com.bnksys.innerProject.repository.PromotionMaterialRepository;
import com.bnksys.innerProject.repository.PromotionScheduleRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional
public class PromotionScheduleServiceImple implements PromotionScheduleService {
	
	final private PromotionScheduleRepository psRepository;
	final private ClientInfoRepository clientInfoRepository;
	final private PromotionMaterialRepository pmRepository;
	
	
	@Override
	public boolean setSchedule(PromotionSchedule ps, List<Long> clientNoList, List<Long> pmNoList) {
		//sdRepository에도 저장 해야함
		String strDt = ps.getStartDt().format(DateTimeFormatter.ofPattern("yyyMMddHH"));
		String endDt = ps.getEndDt().format(DateTimeFormatter.ofPattern("yyyMMddHH"));
		
		log.info("/api/schedule/save"+ strDt + " " + endDt);
		
		for(Long i : clientNoList) {
			ClientInfo ci = clientInfoRepository.findById(i).orElseThrow(() -> new IllegalStateException(i+" 클라이언트번호가 존재하지 않습니다"));
			ps.getClients().add(new ScheduleClient(ps,ci));
		}
		
		for(Long i : pmNoList) {
			PromotionMaterial pm = pmRepository.findById(i).orElseThrow(() -> new IllegalStateException(i+" 저작물번호가 존재하지 않습니다"));
			ps.getPromotionMaterials().add(new MaterialSchedule(ps,pm));
		}
		
		
		psRepository.save(ps);

		return true;
	}

	@Override
	public boolean isSettable(PromotionSchedule ps, List<Long> clientNoList) {
		//해당 저작물이 등록가능한지 여부 리턴	
		
		for(Long l : clientNoList) {
			ClientInfo ci = clientInfoRepository.findById(l).orElseThrow(()->new IllegalStateException(l+" 클라이언트번호가 존재하지 않습니다"));
			int cnt = psRepository.getPromotinMaterialCountByClientNo(ci,ps.getStartDt(),ps.getEndDt()).get();
			if(cnt >= 3) {
				throw new IllegalStateException("이미 예약이 가득 찼습니다 clientNo : "+ci.getClientNo());
			}
		
		}

		
		
		return true;
	}

	@Override
	public List<DayDto> getDayList(String dt, List<Long> clientNoList) {
		List<DayDto> ret = new ArrayList<DayDto>();
		
		int lastDay = getLastDateOfMonth(Integer.parseInt(dt.substring(0,4)), Integer.parseInt(dt.substring(4,6)));		
		
		DateTimeFormatter DATEFORMATTER = new DateTimeFormatterBuilder()
				.append(DateTimeFormatter.ofPattern("yyyyMM"))
				.parseDefaulting(ChronoField.DAY_OF_MONTH, 1)	// 1일
				.parseDefaulting(ChronoField.HOUR_OF_DAY, 9)	// 0시
			    .parseDefaulting(ChronoField.MINUTE_OF_HOUR, 0)// 분은 0으로 
			    .parseDefaulting(ChronoField.SECOND_OF_MINUTE, 0) // 초도 0으로
			    .toFormatter();
			
		LocalDateTime startDt = LocalDateTime.parse(dt, DATEFORMATTER);
		LocalDateTime endDt = startDt.plusHours(9);
		int year = Integer.parseInt(dt.substring(0,4));
		int month = Integer.parseInt(dt.substring(4,6));
		boolean isFull = false;
		
		for(int i = 1 ; i <=lastDay ; i ++) {
			isFull = false;
			for(Long l : clientNoList) {
				ClientInfo ci = clientInfoRepository.findById(l).orElseThrow(()->new IllegalStateException(l+" 클라이언트번호가 존재하지 않습니다"));
				int cnt = psRepository.getPromotinMaterialCountByClientNo(ci,startDt,endDt).get();
				
				if(cnt >= 3) {
					ret.add(new DayDto(year, month, i, false));
					isFull = true;
					break;
				}
			}
			if(isFull == false) {
				ret.add(new DayDto(year, month, i, true));
			}
			startDt = startDt.plusDays(1);
			endDt = endDt.plusDays(1);
			
		}
		
		
		//주어진 년,월에 대해 1일부터 마지막일까지의 예약 가능여부 리턴
		
		return ret;
	}

	@Override
	public List<TimeDto> getTimeList(String dt, List<Long> clientNoList) {
	List<TimeDto> ret = new ArrayList<TimeDto>();	
		
		DateTimeFormatter DATEFORMATTER = new DateTimeFormatterBuilder()
				.append(DateTimeFormatter.ofPattern("yyyyMMdd"))
				.parseDefaulting(ChronoField.HOUR_OF_DAY, 9)	// 0시
			    .parseDefaulting(ChronoField.MINUTE_OF_HOUR, 0)// 분은 0으로 
			    .parseDefaulting(ChronoField.SECOND_OF_MINUTE, 0) // 초도 0으로
			    .toFormatter();
			
		LocalDateTime startDt = LocalDateTime.parse(dt, DATEFORMATTER);
		LocalDateTime endDt = startDt.plusHours(1);
		int year = Integer.parseInt(dt.substring(0,4));
		int month = Integer.parseInt(dt.substring(4,6));
		int day = Integer.parseInt(dt.substring(6,8));
		
		boolean isFull = false;
		
		for(int i = 9 ; i <=18 ; i ++) {
			isFull = false;
			for(Long l : clientNoList) {
				ClientInfo ci = clientInfoRepository.findById(l).orElseThrow(()->new IllegalStateException(l+" 클라이언트번호가 존재하지 않습니다"));
				int cnt = psRepository.getPromotinMaterialCountByClientNo(ci,startDt,endDt).get();
				
				if(cnt >= 3) {
					ret.add(new TimeDto(year, month, day, i, false));
					isFull = true;
					break;
				}
			}
			if(isFull == false) {
				ret.add(new TimeDto(year, month, day, i, true));
			}
			startDt = startDt.plusHours(1);
			endDt = endDt.plusHours(1);
		}
		
		
		//9시부터 18시까지만 예약 가능
		
		return ret;
	}

	@Override
	public List<PromotionScheduleDto> getScheduleList(long userNo) {
		List<PromotionSchedule> list = null;
		List<PromotionScheduleDto> ret = new ArrayList<PromotionScheduleDto>();
		
		list = psRepository.findByUserNoOrderByStartDtDesc(userNo).get();

		// PromotionSchedule -> PromotionScheduleDto 형변환
		ret = list.stream().map((p)->new PromotionScheduleDto(
				p.getPsNo(),
				p.getUserNo(),
				p.getStartDt().format(DateTimeFormatter.ofPattern("yyyMMddHH")),
				p.getEndDt().format(DateTimeFormatter.ofPattern("yyyMMddHH")),
				p.getClients().stream().map((p2)-> p2.getClientNo()).collect(Collectors.toList()),
				p.getPromotionMaterials().stream().map((p3)-> new PromotionMaterialDto(p3.getPmNo().getPmNo(),p3.getPmNo().getPmTitle(),p3.getPmNo().getUtNo())).collect(Collectors.toList()),
				getScheduleState(p)
				)).collect(Collectors.toList());
		
		return ret;
	}	
	
	public int getLastDateOfMonth(int year, int month) {	
		
		Calendar cal = Calendar.getInstance();
		cal.set(year,month-1,1);
		
		return cal.getActualMaximum(Calendar.DAY_OF_MONTH);
	}

	public String getScheduleState(PromotionSchedule ps) {	
		LocalDateTime now = LocalDateTime.now();
		if(now.isBefore(ps.getStartDt())) { // 스케줄보다 지금이 작을떄
			return "배포예정";
		}else if(now.isAfter(ps.getEndDt())) {
			return "배포종료";
		}else {
			return "배포중";
		}
	}

}
