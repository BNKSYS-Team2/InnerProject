package com.bnksys.innerProject.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnksys.innerProject.domain.ClientInfo;
import com.bnksys.innerProject.dto.ClientUnitDto;
import com.bnksys.innerProject.repository.ClientInfoRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional
public class ClientInfoServiceImpl implements ClientInfoService {
	private final ClientInfoRepository clientInfoRepository;
	
	@Override
	public List<String> company() {
		
		return clientInfoRepository.findCompany().orElse(new ArrayList<String>());
	}

	@Override
	public List<String> loaction(String company) {
		return clientInfoRepository.findLocation(company).orElse(new ArrayList<String>());
	}

	@Override
	public List<ClientUnitDto> unit(String company, String location) {
		return clientInfoRepository.findUnit(company, location).orElse(new ArrayList<>()).stream().map((c)->new ClientUnitDto(c.getClientNo(), c.getUnit(), c.getUtNo())).collect(Collectors.toList());
	}

	@Override
	public boolean save(ClientInfo ci) {
		if(clientInfoRepository.findByCompanyAndLocationAndUnit(ci.getCompany(),ci.getLocation(),ci.getUnit()).isPresent() == true) {
			throw new IllegalStateException("이미 해당클라이언트가 존재합니다");
		}
		
		clientInfoRepository.save(ci);
		return true;
	}

	@Override
	public long login(ClientInfo ci) {
		ci = clientInfoRepository.findByCompanyAndLocationAndUnit(ci.getCompany(),ci.getLocation(),ci.getUnit()).orElseThrow(()->new IllegalStateException("해당클라이언트가 존재하지 않습니다"));
		return ci.getClientNo();
	}

}
