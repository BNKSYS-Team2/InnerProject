package com.bnksys.innerProject.domain;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class PromotionSchedule {
	//스케줄 번호
	@Id
	@GeneratedValue
	private long psNo;
	
	//등록한 유저번호
	@Column(nullable = false)
	private long userNo;
	
	//시작시간
	@Column(nullable = false)
	private LocalDateTime startDt;
	
	//종료시간
	@Column(length = 100, nullable = false)
	private LocalDateTime endDt;
	
	
	//클라이언트 리스트
	@OneToMany(mappedBy = "psNo", cascade = CascadeType.ALL)
	private List<ScheduleClient> clients;
	
	//저작물 리스트
	@OneToMany(mappedBy = "psNo", cascade = CascadeType.ALL)
	private List<MaterialSchedule> promotionMaterials;
}
