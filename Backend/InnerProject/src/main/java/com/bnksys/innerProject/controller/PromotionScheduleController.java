package com.bnksys.innerProject.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoField;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnksys.innerProject.domain.PromotionSchedule;
import com.bnksys.innerProject.domain.ScheduleClient;
import com.bnksys.innerProject.dto.DayDto;
import com.bnksys.innerProject.dto.PromotionScheduleDto;
import com.bnksys.innerProject.dto.TimeDto;
import com.bnksys.innerProject.service.PromotionScheduleService;

import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/api/schedule")
@CrossOrigin
public class PromotionScheduleController {

	@Autowired
	private PromotionScheduleService promotionScheduleService;
	
	@PostMapping("/save")
	public  Map<String, Object> save(@RequestBody Map<String, Object> req) {
		Map<String, Object> ret = new HashMap<>();

		PromotionSchedule ps = new PromotionSchedule();
		ps.setUserNo(Integer.parseInt((String)req.get("userNo")));	// 게시자 PK
		
		DateTimeFormatter DATEFORMATTER = new DateTimeFormatterBuilder()
			.append(DateTimeFormatter.ofPattern("yyyyMMddHH"))
		    .parseDefaulting(ChronoField.MINUTE_OF_HOUR, 0)// 분은 0으로 
		    .parseDefaulting(ChronoField.SECOND_OF_MINUTE, 0) // 초도 0으로
		    .toFormatter();
		
		ps.setStartDt(LocalDateTime.parse((String)req.get("startDt"), DATEFORMATTER));
		ps.setEndDt(LocalDateTime.parse((String)req.get("endDt"), DATEFORMATTER));
		
		//어디로 뿌릴지 대상인 클라이언트들
		ps.setClients(new ArrayList<ScheduleClient>());
		List<Long> clientNoList = ((List<String>) (req.get("clientNo"))).stream().map((s)->Long.parseLong(s)).collect(Collectors.toList());
		
		//뿌릴 대상인 저작물들
		ps.setPromotionMaterials(new ArrayList<>());
		List<Long> pmNoList = ((List<String>) (req.get("pmNo"))).stream().map((s)->Long.parseLong(s)).collect(Collectors.toList());
		
		
		try {
			promotionScheduleService.isSettable(ps,clientNoList);
			promotionScheduleService.setSchedule(ps,clientNoList, pmNoList);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}	
	
		
		ret.put("success", "Ture");
		ret.put("scheduleNo", ps.getPsNo());
		
		return ret;
	}
	
	@PostMapping("/dayList")
	public  Map<String, Object> getDayList(@RequestBody Map<String, Object> req) {
		Map<String, Object> ret = new HashMap<>();
		List<DayDto> list = new ArrayList<DayDto>();
		
		String dt = (String)req.get("startDt");
		
		//어디로 뿌릴지 대상인 클라이언트들
		List<Long> clientNoList = ((List<String>) (req.get("clientNo"))).stream().map((s)->Long.parseLong(s)).collect(Collectors.toList());
		
		try {
			list = promotionScheduleService.getDayList(dt,clientNoList);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}	
	
		
		ret.put("success", "Ture");
		ret.put("list", list);
		ret.put("listCnt", list.size());
		
		
		return ret;
	}
	
	
	@PostMapping("/timeList")
	public  Map<String, Object> getTimeList(@RequestBody Map<String, Object> req) {
		Map<String, Object> ret = new HashMap<>();
		List<TimeDto> list = new ArrayList<TimeDto>();
		
		String dt = (String)req.get("startDt");
		
		//어디로 뿌릴지 대상인 클라이언트들
		List<Long> clientNoList = ((List<String>) (req.get("clientNo"))).stream().map((s)->Long.parseLong(s)).collect(Collectors.toList());
		
		try {
			list = promotionScheduleService.getTimeList(dt,clientNoList);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}	
	
		
		ret.put("success", "Ture");
		ret.put("list", list);
		ret.put("listCnt", list.size());
		
		
		return ret;
	}
	
	
	@GetMapping("/list/{userNo}")
	public  Map<String, Object> load(			
			@PathVariable(name = "userNo") long userNo,
			HttpServletRequest request) {
		Map<String, Object> ret = new HashMap<>();

		List<PromotionScheduleDto> list = new ArrayList<>();
		
		try {
			list=promotionScheduleService.getScheduleList(userNo);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}	
	
		
		ret.put("success", "Ture");
		ret.put("list", list);
		ret.put("listCnt", list.size());
		
		
		return ret;
	}
}
