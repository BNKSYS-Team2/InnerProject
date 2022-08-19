package com.bnksys.innerProject.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnksys.innerProject.domain.UseType;
import com.bnksys.innerProject.service.UseTypeService;

@RestController
@RequestMapping("/api/useType")
@CrossOrigin
public class UseTypeController {
	@Autowired
	private UseTypeService useTypeService;
	
	@GetMapping("/list")
	public  Map<String, Object> loadListSearch(
			HttpServletRequest request
			) {
		Map<String, Object> ret = new HashMap<>();

		List<UseType> ut = new ArrayList<>();
		
		
		try {
			ut = useTypeService.loadList();
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}	
	
		
		ret.put("useTypeList", ut);
		ret.put("useTypeCount", ut.size());
		
		
		return ret;
	}
}
