package com.bnksys.innerProject.service;

import com.bnksys.innerProject.domain.User;

public interface UserService {

	//회원가입
	long signup(User user);
	
	//로그인
	long login(User user);
	
	//회원탈퇴
    void deleteUser(User user);
}
