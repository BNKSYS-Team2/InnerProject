package com.bnksys.innerProject.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bnksys.innerProject.domain.Template;
import com.bnksys.innerProject.domain.UseType;
import com.bnksys.innerProject.service.FileService;
import com.bnksys.innerProject.service.TemplateService;

import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/api/template")
@CrossOrigin
public class TemplateController {

	@Autowired
	private TemplateService templateService;
	
	@Autowired
	private FileService fileService;
	
	
	@PostMapping("/save")
	public Map<String, Object> save(
			@RequestParam(value = "template") MultipartFile tmpFile, 
			@RequestParam(value = "utNo") Long utNo, // 용도타입 번호 
			@RequestParam(value = "title", required = false, defaultValue = "untitle") String title,	//제목
			@RequestParam(value = "tag1", required = false) String tag1, // 태그1
			@RequestParam(value = "tag2", required = false) String tag2, // 태그2
			@RequestParam(value = "tag3", required = false) String tag3, // 태그3
			@RequestParam(value = "tag4", required = false) String tag4, // 태그4
			@RequestParam(value = "tag5", required = false) String tag5  // 태그5
			) {
		Map<String, Object> ret = new HashMap<>();
		
		Template tmp = new Template();
		tmp.setTitle(title);
		tmp.setTag1(tag1);
		tmp.setTag2(tag2);
		tmp.setTag3(tag3);
		tmp.setTag4(tag4);
		tmp.setTag5(tag5);
		tmp.setUtNo(new UseType(utNo));
		
		Long tmpNo = null;
		
		
		// 데이터베이스에 저장
		try {
			tmpNo = templateService.save(tmp);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}
		
		
		// 파일 저장
		try {
			fileService.saveFile(tmpFile, tmpNo);
		} catch (IllegalStateException e) {
			try {
				templateService.delete(tmp);
			} catch (IllegalStateException e2) {
				ret.put("success", "False");
				ret.put("msg", e2.getMessage());
				return ret;
			}
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}
		ret.put("success", "True");
		ret.put("msg", "저장 성공");

		return ret;
	}
	
	@GetMapping("/load/{temNo}")
	public  ResponseEntity<?> load(
			@PathVariable(name = "temNo") Long temNo,
			HttpServletRequest request
			) {
		Map<String, Object> ret = new HashMap<>();
		Resource resource = null;

		Template tmp = new Template();
		tmp.setTemNo(temNo);
		String fileName = null;
		
		try {
			tmp = templateService.load(tmp);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return new ResponseEntity<>(ret, HttpStatus.OK);
		}
		
		fileName = tmp.getTemNo() + ".svg" ;			
		
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

	@GetMapping("/loadString/{temNo}")
	public  ResponseEntity<?> loadString(
			@PathVariable(name = "temNo") Long temNo,
			HttpServletRequest request
			) {
		Map<String, Object> ret = new HashMap<>();
		List<String> list = null;
		Resource resource = null;

		Template tmp = new Template();
		tmp.setTemNo(temNo);
		String fileName = null;
		
		try {
			tmp = templateService.load(tmp);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return new ResponseEntity<>(ret, HttpStatus.OK);
		}
		
		fileName = tmp.getTemNo() + ".svg" ;			
		
		try {
			resource = fileService.loadFile(fileName);
		} catch (FileNotFoundException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return new ResponseEntity<>(ret, HttpStatus.OK);
		}

		try {
			log.info("file String");
			list=Files.readAllLines(resource.getFile().toPath());
		} catch (Exception e) {
			ret.put("success", "False");
			ret.put("msg", "파일로드 실패");
		}
		
		StringBuilder sb = new StringBuilder();
        for (String item : list) {
            sb.append(item);
            sb.append(" ");
        }
        
		ret.put("fileString",sb.toString());
		ret.put("success", "True");
	
		return new ResponseEntity<>(ret, HttpStatus.OK);
	}
	
	
	@GetMapping("/searchList/{searchValue}")
	public  Map<String, Object> loadListSearch(
			@PathVariable(name = "searchValue") String searchVal,
			HttpServletRequest request
			) {
		Map<String, Object> ret = new HashMap<>();

		List<Template> tmp = new ArrayList<>();
		
		
		try {
			tmp = templateService.loadListSearch(searchVal);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}	
	
		
		ret.put("temList", tmp);
		ret.put("temCount", tmp.size());
		
		
		return ret;
	}
	
	@GetMapping("/allList")
	public  Map<String, Object> loadList(
			HttpServletRequest request
			) {
		Map<String, Object> ret = new HashMap<>();

		List<Template> tmp = new ArrayList<>();
		
		
		try {
			tmp = templateService.loadList();
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}	
	
		
		ret.put("temList", tmp);
		ret.put("temCount", tmp.size());
		
		
		return ret;
	}

	@GetMapping("/list/{utNo}")
	public  Map<String, Object> loadList(
			@PathVariable(name = "utNo") Long utNo,
			HttpServletRequest request
			) {
		Map<String, Object> ret = new HashMap<>();

		List<Template> tmp = new ArrayList<>();
		
		
		try {
			tmp = templateService.loadList(utNo);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}	
	
		
		ret.put("temList", tmp);
		ret.put("temCount", tmp.size());
		
		
		return ret;
	}
}
