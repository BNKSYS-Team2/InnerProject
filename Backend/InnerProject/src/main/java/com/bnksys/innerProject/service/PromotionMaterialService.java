package com.bnksys.innerProject.service;

import java.util.List;

import com.bnksys.innerProject.domain.PromotionMaterial;
import com.bnksys.innerProject.dto.PromotionMaterialDto;

public interface PromotionMaterialService {

	//작업물 저장하기
	long save(PromotionMaterial pm);
	
	//작업물 불러오기(SVG로 불러오기)
	PromotionMaterial load(PromotionMaterial pm);
	
	//작업물 삭제하기
	boolean delete(PromotionMaterial pm);
	
	//작업물 리스트 조회
	List<PromotionMaterialDto> loadList(long userNo);
	
	//용도타입일치하는 작업물 리스트 조회
	List<PromotionMaterialDto> loadListUseTypeNo(long userNo, long utNo);
}
