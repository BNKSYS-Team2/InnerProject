package com.bnksys.innerProject.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bnksys.innerProject.domain.PromotionMaterial;
import com.bnksys.innerProject.service.FileService;
import com.bnksys.innerProject.service.PromotionMaterialService;

@RestController
@RequestMapping("/api/pm")
public class PromotionMaterialController {
	
	@Autowired
	private PromotionMaterialService pmService;
	
	@Autowired
	private FileService fileService;
	
	
	@PostMapping("/save")
	public Map<String, Object> signup(@RequestParam(value = "pm") MultipartFile pmFile, @RequestParam(value = "userNo") long userNo, @RequestParam(value = "title", required = false, defaultValue = "untitle") String title) {
		Map<String, Object> ret = new HashMap<>();
		
		PromotionMaterial pm = new PromotionMaterial();
		pm.setPmTitle(title);
		pm.setUserNo(userNo);
		Long pmNo = null;
		
		
		// 데이터베이스에 저장
		try {
			pmNo = pmService.save(pm);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}
		
		
		// 파일 저장
		try {
			fileService.saveFile(pmFile, pmNo);
		} catch (IllegalStateException e) {
			pmService.delete(pm);
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}
		ret.put("success", "True");
		ret.put("msg", "저장 성공");

		return ret;
	}

}
