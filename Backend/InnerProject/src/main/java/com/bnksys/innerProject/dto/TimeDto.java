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
public class TimeDto {
	//년
	private int year;
	
	//월
	private int month;
	
	//일자
	private int day;
	
	//시간
	private int time;
	
	//예약된 저작물 갯수
	private int pmCnt;
	
	public TimeDto(int time, int pmCnt) {
		this.time = time;
		this.pmCnt = pmCnt;
	}
}
