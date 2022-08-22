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
public class ClientInfoDto {
	//클라이언트 번호
	private long clientNo;
	
	//회사
	private String company;
	
	//위치
	private String location;
	
	//단말기
	private String unit;
}
