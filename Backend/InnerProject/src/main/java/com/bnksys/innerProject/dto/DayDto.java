package com.bnksys.innerProject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DayDto {
	//년
	private int year;
	
	//월
	private int month;
	
	//일자
	private int day;
	
	//예약 가능 여부
	private boolean isBookable;
}
