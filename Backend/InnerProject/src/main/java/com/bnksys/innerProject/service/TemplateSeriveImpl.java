package com.bnksys.innerProject.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnksys.innerProject.domain.Template;
import com.bnksys.innerProject.repository.TemplateRepository;
import com.bnksys.innerProject.repository.UseTypeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional
public class TemplateSeriveImpl implements TemplateService {
	private final TemplateRepository templateRepository;
	private final UseTypeRepository useTypeRepository;
	
	
	@Override
	public long save(Template tmp) {
		tmp.setUtNo(useTypeRepository.findById(tmp.getUtNo().getUtNo()).orElseThrow(()->new IllegalStateException("존재하지 않는 용도타입 입니다")));
		
		// 원래는 템플릿 저장할떄 존재하는 태그인지 확인 후  insert해야 하지만 탬플릿 저장기능 프론트에서 안만드니까 태그검증 생략함
		
		templateRepository.save(tmp);
		
		return tmp.getTemNo();
	}

	@Override
	public boolean delete(Template tmp) {
		if(templateRepository.findById(tmp.getTemNo()).isPresent() == false)
			throw new IllegalStateException("존재하지 않는 템플릿 입니다");
		
		templateRepository.delete(tmp);
		
		return true;
	}

	
	@Override
	public List<Template> loadListSearch(String SearchVal) {
		return templateRepository.findByTitleContainsOrTag1ContainsOrTag2ContainsOrTag3ContainsOrTag4ContainsOrTag5Contains(SearchVal, SearchVal, SearchVal, SearchVal, SearchVal, SearchVal).get();
	}
	
	@Override
	public List<Template> loadList() {
		return templateRepository.findAll();
	}

	@Override
	public Template load(Template tmp) {
		if(templateRepository.findById(tmp.getTemNo()).isPresent() == false)
			throw new IllegalStateException("존재하지 않는 템플릿 입니다");
		
		return templateRepository.findById(tmp.getTemNo()).get();
		
	}




}
