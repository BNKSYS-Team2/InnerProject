package com.bnksys.innerProject.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import org.hibernate.annotations.ColumnDefault;
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
@IdClass(ScheduleDatePk.class)
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDate {

	@Id
	@Column(name="year")
	private int year;
	@Id
	@Column(name="month")
	private int month;
	@Id
	@Column(name="day")
	private int day;
	@Id
	@Column(name="time")
	private int time;
	
	private int dt;
	
	@ColumnDefault(value = "0")
	private int pmCnt;
	
}
