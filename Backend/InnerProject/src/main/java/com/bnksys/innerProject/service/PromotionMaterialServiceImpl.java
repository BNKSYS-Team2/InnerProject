package com.bnksys.innerProject.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnksys.innerProject.domain.ClientInfo;
import com.bnksys.innerProject.domain.MaterialSchedule;
import com.bnksys.innerProject.domain.PromotionMaterial;
import com.bnksys.innerProject.domain.UseType;
import com.bnksys.innerProject.dto.PromotionMaterialDto;
import com.bnksys.innerProject.repository.ClientInfoRepository;
import com.bnksys.innerProject.repository.MaterialScheduleRepository;
import com.bnksys.innerProject.repository.PromotionMaterialRepository;
import com.bnksys.innerProject.repository.UseTypeRepository;
import com.bnksys.innerProject.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional
public class PromotionMaterialServiceImpl implements PromotionMaterialService {

	private final PromotionMaterialRepository pmRepository;
	private final UserRepository userRepository;
	private final UseTypeRepository useTypeRepository;
	private final ClientInfoRepository clientInfoRepository;
	private final MaterialScheduleRepository msRepository;
	
	
	
	@Override
	public long save(PromotionMaterial pm) {
		if(userRepository.findById(pm.getUserNo()).isPresent() == false)
			throw new IllegalStateException("존재하지 않는 아이디 입니다");
		
		useTypeRepository.findById(pm.getUtNo().getUtNo()).orElseThrow(()->new IllegalStateException("존재하지 않는 용도타입 입니다"));
		
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
		pm = pmRepository.findById(pm.getPmNo()).orElseThrow(()->new IllegalStateException("존재하지 않는 저작물 입니다"));

		List<MaterialSchedule> list = msRepository.findByPmNo(pm).get();
		
		if(msRepository.findByPmNo(pm).get().size() != 0)
			throw new IllegalStateException("배포스케줄이 존재하여 삭제 불가능 합니다");
		
		pmRepository.delete(pm);
		
		
		return true;
	}

	@Override
	public List<PromotionMaterialDto> loadList(long userNo) {
		if(userRepository.findById(userNo).isPresent() == false)
			throw new IllegalStateException("존재하지 않는 아이디 입니다");
		
		//List<PromotionMaterial> -> List<PromotionMaterialDto> 형변환 후 리턴
		return pmRepository.findByUserNo(userNo).orElse(new ArrayList<>())
				.stream().map(pm->new PromotionMaterialDto(pm.getPmNo(),pm.getPmTitle(),pm.getUtNo())).collect(Collectors.toList());
	}

	@Override
	public List<PromotionMaterialDto> loadListUseTypeNo(long userNo, long utNo) {
		if(userRepository.findById(userNo).isPresent() == false)
			throw new IllegalStateException("존재하지 않는 아이디 입니다");
		
		UseType ut = useTypeRepository.findById(utNo).orElseThrow(()->new IllegalStateException("존재하지 않는 용도타입 입니다"));

		//List<PromotionMaterial> -> List<PromotionMaterialDto> 형변환 후 리턴
		return pmRepository.findByUserNoAndUtNo(userNo,ut).orElse(new ArrayList<>())
				.stream().map(pm->new PromotionMaterialDto(pm.getPmNo(),pm.getPmTitle(),pm.getUtNo())).collect(Collectors.toList());
	}
	
	@Override
	public List<PromotionMaterialDto> getClientScheduleList(long clientNo) {
		ClientInfo ci = null;
		ci = clientInfoRepository.findById(clientNo).orElseThrow(()-> new IllegalStateException("존재하지 않는 클라이언트 입니다"));
		
		log.info(LocalDateTime.now()+" /api/pm/now/"+clientNo);
		
		return pmRepository.findpmNoListByClientNo(ci, LocalDateTime.now()).orElse(new ArrayList<>())
				.stream().map(pm->new PromotionMaterialDto(pm.getPmNo(),pm.getPmTitle(),pm.getUtNo())).collect(Collectors.toList());
	}

}
