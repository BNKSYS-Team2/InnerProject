package com.bnksys.innerProject.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnksys.innerProject.domain.PromotionMaterial;
import com.bnksys.innerProject.repository.PromotionMaterialRepository;
import com.bnksys.innerProject.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PromotionMaterialServiceImpl implements PromotionMaterialService {

	private final PromotionMaterialRepository pmRepository;
	private final UserRepository userRepository;
	
	@Override
	public long save(PromotionMaterial pm) {
		if(userRepository.findById(pm.getUserNo()).isPresent() == false)
			throw new IllegalStateException("존재하지 않는 아이디 입니다");
		
		pmRepository.save(pm);
		
		return pm.getPmNo();
	}

	@Override
	public PromotionMaterial load(PromotionMaterial pm) {
		
		if(pmRepository.findById(pm.getPmNo()).isPresent() == false)
			throw new IllegalStateException("존재하지 않는 저작물 입니다");
		
		return pmRepository.findById(pm.getPmNo()).get();
	}

	@Override
	public boolean delete(PromotionMaterial pm) {
		if(pmRepository.findById(pm.getPmNo()).isPresent() == false)
			throw new IllegalStateException("존재하지 않는 저작물 입니다");
		
		pmRepository.delete(pm);
		
		return true;
	}

}
