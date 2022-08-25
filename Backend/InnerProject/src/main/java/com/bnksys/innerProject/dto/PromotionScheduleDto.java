package com.bnksys.innerProject.dto;

import java.util.List;

import com.bnksys.innerProject.domain.ClientInfo;

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
public class PromotionScheduleDto {
	//스케줄 번호
	private long psNo;

	//스케줄 등록 유저
	private long userNo;
	
	//시작시간
	private String startDt;
	
	//종료시간
	private String endDt;
	
	//클라이언트 리스트
	private List<ClientInfo> clients;
	
	//저작물 리스트
	private List<PromotionMaterialDto> promotionMaterials;
	
	private String scheduleState;
}
