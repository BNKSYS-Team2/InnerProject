package com.bnksys.innerProject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bnksys.innerProject.domain.Template;

public interface TemplateRepository extends JpaRepository<Template, Long>{
	
	//제목 또는 태그로 여러건 검색
	Optional<List<Template>> findByTitleContainsOrTag1ContainsOrTag2ContainsOrTag3ContainsOrTag4ContainsOrTag5Contains(String Title,String tag1,String tag2,String tag3,String tag4,String tag5);
}
