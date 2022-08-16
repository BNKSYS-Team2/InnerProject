package com.bnksys.innerProject.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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
	
	//시작시간
	@Column(nullable = false)
	private LocalDateTime startDt;
	
	//종료시간
	@Column(length = 100, nullable = false)
	private LocalDateTime endDt;
	
	//저작물번호
	@Column(nullable = false)
	private long pmNo;
	
}
