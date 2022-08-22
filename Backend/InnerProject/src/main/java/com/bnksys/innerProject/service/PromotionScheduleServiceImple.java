package com.bnksys.innerProject.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnksys.innerProject.domain.ClientInfo;
import com.bnksys.innerProject.domain.MaterialSchedule;
import com.bnksys.innerProject.domain.PromotionMaterial;
import com.bnksys.innerProject.domain.PromotionSchedule;
import com.bnksys.innerProject.domain.ScheduleClient;
import com.bnksys.innerProject.domain.ScheduleDate;
import com.bnksys.innerProject.domain.ScheduleDatePk;
import com.bnksys.innerProject.dto.DayDto;
import com.bnksys.innerProject.dto.PromotionMaterialDto;
import com.bnksys.innerProject.dto.PromotionScheduleDto;
import com.bnksys.innerProject.dto.TimeDto;
import com.bnksys.innerProject.repository.ClientInfoRepository;
import com.bnksys.innerProject.repository.PromotionMaterialRepository;
import com.bnksys.innerProject.repository.PromotionScheduleRepository;
import com.bnksys.innerProject.repository.ScheduleDateRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional
public class PromotionScheduleServiceImple implements PromotionScheduleService {
	
	final private PromotionScheduleRepository psRepository;
	final private ScheduleDateRepository sdRepository;
	final private ClientInfoRepository clientInfoRepository;
	final private PromotionMaterialRepository pmRepository;
	
	
	
	@Override
	public boolean setSchedule(PromotionSchedule ps, List<Long> clientNoList, List<Long> pmNoList) {
		//sdRepository에도 저장 해야함
		ScheduleDate sd = null;
		String strDt = ps.getStartDt().format(DateTimeFormatter.ofPattern("yyyMMddHH"));
		String endDt = ps.getEndDt().format(DateTimeFormatter.ofPattern("yyyMMddHH"));
		
		int strYear = Integer.parseInt(strDt.substring(0,4));
		int endYear = Integer.parseInt(endDt.substring(0,4));
		
		int strMonth = Integer.parseInt(strDt.substring(4,6));
		int endMonth = Integer.parseInt(endDt.substring(4,6));
		
		int strDay = Integer.parseInt(strDt.substring(6,8));
		int endDay = Integer.parseInt(endDt.substring(6,8));
		
		int strTime = Integer.parseInt(strDt.substring(8,10));
		int endTime = Integer.parseInt(endDt.substring(8,10));
		
		for(int i = strYear; i<=endYear; i++) {
			for(int j = strMonth ; j <= endMonth ; j++) {
				for(int k = strDay ; k <= endDay ; k++) {
					for(int l = strTime ; l <= endTime ; l++) {
						int dt = Integer.parseInt(Integer.toString(i)+Integer.toString(j)+Integer.toString(k)+Integer.toString(l));
						sd = sdRepository.findById(new ScheduleDatePk(i,j,k,l)).orElse(new ScheduleDate(i, j, k, l, dt, 0));
						sd.setPmCnt(sd.getPmCnt()+1);
						if(sd.getPmCnt() >3)
							throw new IllegalStateException("이미 "+dt+" 예약건이 가득 찼습니다");
						sdRepository.save(sd);
					}
				}
			}
		}
		
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
	public boolean isSettable(PromotionSchedule ps) {
		//해당 저작물이 등록가능한지 여부 리턴
		int startDt = Integer.parseInt(ps.getStartDt().format(DateTimeFormatter.ofPattern("yyyMMddHH")));
		int endDt = Integer.parseInt(ps.getEndDt().format(DateTimeFormatter.ofPattern("yyyMMddHH")));
		
		boolean bool1 = sdRepository.existsByDtGreaterThanEqualAndDtLessThanAndPmCntGreaterThanEqual(startDt, endDt, 3).get();
		log.info(startDt + " "+ endDt+ " " +bool1);
		
		if(bool1 == true) {
			throw new IllegalStateException("해당시간은 이미 예약이 가득 찼습니다");
		}		
		
		return true;
	}

	@Override
	public List<DayDto> getDayList(int year, int month) {
		List<DayDto> ret = new ArrayList<DayDto>();
		List<DayDto> list = new ArrayList<DayDto>();
		
		int lastDay = getLastDateOfMonth(year, month);
		
		list = sdRepository.findDay(year, month)
				.orElse(new ArrayList<>())
				.stream().map((p)->new DayDto(year, month,p,false))
				.collect(Collectors.toList());
		
		Collections.sort(list,(p1,p2)->p1.getDay()-p2.getDay());
		
		int listidx = 0;
		for(int i = 1; i <= lastDay; i++) {
			if(list.get(listidx).getDay() == i) {
				ret.add(new DayDto(year, month, i, list.get(listidx++).isBookable()));
			}
			ret.add(new DayDto(year, month, i, true));
		}
		
		//주어진 년,월에 대해 1일부터 마지막일까지의 예약 가능여부 리턴
		
		return ret;
	}

	@Override
	public List<TimeDto> getTimeList(int year,int month, int day) {
		List<TimeDto> ret = new ArrayList<TimeDto>();
		List<TimeDto> list = new ArrayList<TimeDto>();
		
		
		
		list = sdRepository.findTime(year, month, day)
				.orElse(new ArrayList<>())
				.stream().map((p)->new TimeDto(year, month, day, p.get("time"),p.get("pmCnt")))
				.collect(Collectors.toList());
		
		Collections.sort(list,(p1,p2)->p1.getTime()-p2.getTime());
		
		
		int listidx = 0;
		//9시부터 18시까지만 예약가능
		for(int i = 9; i <= 18; i++) {
			if(list.get(listidx).getDay() == i) {
				ret.add(new TimeDto(year, month, day, i, list.get(listidx++).getPmCnt()));
			}
			ret.add(new TimeDto(year, month, day, i, 0));
		}
		
		return ret;
	}

	@Override
	public List<PromotionScheduleDto> getScheduleList(long userNo) {
		List<PromotionSchedule> list = null;
		List<PromotionScheduleDto> ret = new ArrayList<PromotionScheduleDto>();
		
		list = psRepository.findByUserNo(userNo).get();

		// PromotionSchedule -> PromotionScheduleDto 형변환
		ret = list.stream().map((p)->new PromotionScheduleDto(
				p.getPsNo(),
				p.getUserNo(),
				p.getStartDt().format(DateTimeFormatter.ofPattern("yyyMMddHH")),
				p.getEndDt().format(DateTimeFormatter.ofPattern("yyyMMddHH")),
				p.getClients().stream().map((p2)-> p2.getClientNo()).collect(Collectors.toList()),
				p.getPromotionMaterials().stream().map((p3)-> new PromotionMaterialDto(p3.getPmNo().getPmNo(),p3.getPmNo().getPmTitle(),p3.getPmNo().getUtNo())).collect(Collectors.toList())			
				)).collect(Collectors.toList());
		
		return ret;
	}
	
	
	public int getLastDateOfMonth(int year, int month) {	
		
		Calendar cal = Calendar.getInstance();
		cal.set(year,month-1,1);
		
		return cal.getActualMaximum(Calendar.DAY_OF_MONTH);
	}

}
