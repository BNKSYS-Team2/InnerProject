package com.bnksys.innerProject.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bnksys.innerProject.domain.PromotionMaterial;
import com.bnksys.innerProject.service.FileService;
import com.bnksys.innerProject.service.PromotionMaterialService;

import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/api/pm")
public class PromotionMaterialController {
	
	@Autowired
	private PromotionMaterialService pmService;
	
	@Autowired
	private FileService fileService;
	
	
	@PostMapping("/save")
	public Map<String, Object> save(
			@RequestParam(value = "pm") MultipartFile pmFile, 
			@RequestParam(value = "userNo") long userNo, 
			@RequestParam(value = "title", required = false, defaultValue = "untitle") String title
			) {
		Map<String, Object> ret = new HashMap<>();
		
		PromotionMaterial pm = new PromotionMaterial();
		pm.setPmTitle(title);
		pm.setUserNo(userNo);
		pm.setFileExtension(pmFile.getOriginalFilename().split("\\.")[1]);
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
	
	
	@GetMapping("/load/{userNo}/{pmNo}")
	public  ResponseEntity<?> load(
			@PathVariable(name = "userNo") Long userNo,
			@PathVariable(name = "pmNo") Long pmNo,
			HttpServletRequest request
			) {
		Map<String, Object> ret = new HashMap<>();
		Resource resource = null;

		PromotionMaterial pm = new PromotionMaterial();
		pm.setPmNo(pmNo);
		String fileName = null;
		
		pm = pmService.load(pm);
		fileName = pm.getPmNo() + "." +pm.getFileExtension();
		
		log.info("--헌국 pm" + pm);
		log.info("--헌국 userNo" + userNo );
		log.info("--헌국 fileName" + fileName );
		
		
		if(pm.getUserNo() != userNo) {
			ret.put("success", "False");
			ret.put("msg", "해당 유저의 저작물이 아닙니다.");
			return new ResponseEntity<>(ret, HttpStatus.OK);
		}
			
		
		try {
			resource = fileService.loadFile(fileName);
		} catch (FileNotFoundException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return new ResponseEntity<>(ret, HttpStatus.OK);
		}

		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			log.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}

}
