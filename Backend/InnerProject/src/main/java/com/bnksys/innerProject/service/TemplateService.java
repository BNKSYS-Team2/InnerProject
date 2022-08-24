package com.bnksys.innerProject.service;

import java.util.List;

import com.bnksys.innerProject.domain.Template;

public interface TemplateService {
	
	//템플릿 저장하기
	long save(Template tmp);
	
	//템플릿 삭제하기
	boolean delete(Template tmp);
	
	//검색어로 리스트 가져오기
	List<Template> loadListSearch(String SearchVal);
	
	//모두 가져오기
	List<Template> loadList();
	
	//용도타입별 가져오기
	List<Template> loadList(long utNo);
	
	//템플릿 가져오기
	Template load(Template tmp);
	
	
}
