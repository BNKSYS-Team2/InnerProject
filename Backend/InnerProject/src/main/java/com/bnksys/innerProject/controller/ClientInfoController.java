package com.bnksys.innerProject.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnksys.innerProject.domain.ClientInfo;
import com.bnksys.innerProject.dto.ClientUnitDto;
import com.bnksys.innerProject.service.ClientInfoService;

@RestController
@RequestMapping("/api/client")
@CrossOrigin
public class ClientInfoController {
	@Autowired
	private ClientInfoService clientInfoService;
	
	@GetMapping("/company")
	public  Map<String, Object> company(
			HttpServletRequest request
			) {
		Map<String, Object> ret = new HashMap<>();

		List<String> list = new ArrayList<>();
		
		
		try {
			list = clientInfoService.company();
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}	
	
		
		ret.put("company", list);
		ret.put("companyCount", list.size());
		
		
		return ret;
	}
	
	
	@GetMapping("/location/{company}")
	public  Map<String, Object> loaction(
			@PathVariable(name = "company") String company,
			HttpServletRequest request
			) {
		Map<String, Object> ret = new HashMap<>();

		List<String> list = new ArrayList<>();
		
		
		try {
			list = clientInfoService.loaction(company);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}	
	
		
		ret.put("loaction", list);
		ret.put("locationCount", list.size());
		
		
		return ret;
	}
	
	
	@GetMapping("/unit/{company}/{location}")
	public  Map<String, Object> unit(
			@PathVariable(name = "company") String company,
			@PathVariable(name = "location") String location,
			HttpServletRequest request
			) {
		Map<String, Object> ret = new HashMap<>();

		List<ClientUnitDto> list = new ArrayList<>();
		
		try {
			list = clientInfoService.unit(company, location);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}	
	
		
		ret.put("unit", list);
		ret.put("unitCount", list.size());
		
		
		return ret;
	}
	
	
	@PostMapping("/save")
	public  Map<String, Object> unit(@RequestBody Map<String, Object> req) {
		Map<String, Object> ret = new HashMap<>();

		ClientInfo ci = new ClientInfo();
		ci.setCompany((String)req.get("company"));
		ci.setLocation((String)req.get("location"));
		ci.setUnit((String)req.get("unit"));
		
		try {
			clientInfoService.save(ci);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}	
	
		ret.put("success", "True");
		ret.put("clientNo", ci.getClientNo());
		
		
		return ret;
	}
	
	@PostMapping("/login")
	public  Map<String, Object> login(@RequestBody Map<String, Object> req) {
		Map<String, Object> ret = new HashMap<>();

		ClientInfo ci = new ClientInfo();
		ci.setCompany((String)req.get("company"));
		ci.setLocation((String)req.get("location"));
		ci.setUnit((String)req.get("unit"));
		long clientNo = 0;
		try {
			clientNo=clientInfoService.login(ci);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}	
	
		ret.put("success", "True");
		ret.put("clientNo", clientNo);
		
		
		return ret;
	}
}
