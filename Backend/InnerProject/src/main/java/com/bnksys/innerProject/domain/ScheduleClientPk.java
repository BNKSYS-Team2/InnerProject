package com.bnksys.innerProject.domain;

import java.io.Serializable;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleClientPk implements Serializable{
	//PromotionSchedule 도메인과 관계 
	private long psNo;
	
	//ClientInfo 도메인과 관계
	private long clientNo;
}
