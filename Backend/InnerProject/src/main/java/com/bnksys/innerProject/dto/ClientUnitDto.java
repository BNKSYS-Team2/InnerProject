package com.bnksys.innerProject.dto;

import com.bnksys.innerProject.domain.UseType;

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
public class ClientUnitDto {
	//클라이언트 번호
	private long clientNo;
	
	//단말기
	private String unit;
	
	//용도타입
	private UseType utNo;
}
