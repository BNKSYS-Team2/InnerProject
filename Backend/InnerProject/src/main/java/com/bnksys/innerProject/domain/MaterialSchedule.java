package com.bnksys.innerProject.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.DynamicInsert;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@DynamicInsert
@Getter
@Setter
@ToString
@IdClass(MaterialSchedulePk.class)
@AllArgsConstructor
@NoArgsConstructor
public class MaterialSchedule {
	//PromotionSchedule 도메인과 관계 
	@Id
	@ManyToOne
	@JoinColumn(name="ps_no")
	private PromotionSchedule psNo;
	
	//PromotionMaterial 도메인과 관계
	@Id
	@ManyToOne
	@JoinColumn(name="pm_no")
	private PromotionMaterial pmNo;
}
