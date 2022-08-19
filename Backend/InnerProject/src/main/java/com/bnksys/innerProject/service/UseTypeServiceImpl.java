package com.bnksys.innerProject.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnksys.innerProject.domain.UseType;
import com.bnksys.innerProject.repository.UseTypeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UseTypeServiceImpl implements UseTypeService {
	private final UseTypeRepository useTypeRepository;
	
	@Override
	public List<UseType> loadList() {
		return useTypeRepository.findAll();
	}

}
