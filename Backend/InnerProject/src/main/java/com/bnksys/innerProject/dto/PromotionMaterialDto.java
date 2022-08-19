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
public class PromotionMaterialDto {
	//저작물 번호
	private long pmNo;
	
	//제목
	private String pmTitle;
	
	//용도타입
	private UseType utNo;
}
