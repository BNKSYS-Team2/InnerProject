package com.bnksys.innerProject.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnksys.innerProject.domain.User;
import com.bnksys.innerProject.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {
	@Autowired
	private UserService userService;
	
	@PostMapping("/signup")
	public Map<String, String> signup(@RequestBody Map<String, Object> req) {

		User user = new User();
		user.setUserId((String) req.get("id"));
		user.setUserPassword((String) req.get("password"));
		user.setUserName((String) req.get("name"));

		Map<String, String> ret = new HashMap<>();
		try {
			userService.signup(user);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}
		ret.put("success", "True");
		ret.put("msg", "회원가입 성공");

		return ret;
	}
	
	
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody Map<String, String> req) {
		User user=new User();
		user.setUserId((String) req.get("id"));
		user.setUserPassword((String) req.get("password"));

		Map<String, Object> ret = new HashMap<>();
		long userNo = 0;
		
		try {
			userNo = userService.login(user);
		} catch (IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}

		ret.put("success", "True");
		ret.put("msg", "로그인 성공");
		ret.put("userNo", userNo);

		return ret;
	}

	
	//회원 탈퇴
	@PostMapping("/delete")
	public Map<String, Object> deleteMember(@RequestBody Map<String, String> req){
		Map<String, Object> ret = new HashMap<>();

		User user=new User();
		user.setUserNo(Long.parseLong(req.get("userNo")));
		
		try {
			userService.deleteUser(user);			
		}catch(IllegalStateException e) {
			ret.put("success", "False");
			ret.put("msg", e.getMessage());
			return ret;
		}
		ret.put("success", "True");
		return ret;
	}
	
}
