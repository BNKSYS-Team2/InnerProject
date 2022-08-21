package com.bnksys.innerProject.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

}
