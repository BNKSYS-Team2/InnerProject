package com.bnksys.innerProject.domain;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MaterialSchedulePk implements Serializable{
	//PromotionSchedule 도메인과 관계
	private long psNo;	
	//PromotionMaterial 도메인과 관계
	private long pmNo;
}
