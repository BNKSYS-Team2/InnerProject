package com.bnksys.innerProject.service;

import com.bnksys.innerProject.domain.PromotionMaterial;

public interface PromotionMaterialService {

	//작업물 저장하기
	long save(PromotionMaterial pm);
	
	//작업물 불러오기(SVG로 불러오기)
	PromotionMaterial load(PromotionMaterial pm);
	
	//작업물 삭제하기
	boolean delete(PromotionMaterial pm);
	
}
