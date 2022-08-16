package com.bnksys.innerProject.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnksys.innerProject.domain.User;
import com.bnksys.innerProject.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
	private final UserRepository userRepository;
	
	//회원가입
	@Override
	public long signup(User user) {
		String userId = user.getUserId().trim();
		String userPassword = user.getUserPassword().trim();
		String userName = user.getUserName().trim();
		String msg = "";
		
		
		if (3>userId.length() || userId.length()>20) {
			msg = "아이디는 3자이상, 20자 이하로 입력하여 주십시오";
			throw new IllegalStateException(msg);
		}
		if (10>userPassword.length() || userPassword.length()>20) {
			msg = "비밀번호는 10자이상, 20자 이하로 입력하여 주십시오";
			throw new IllegalStateException(msg);
		}
		if (2>userName.length() || userName.length()>10) {
			msg = "이름은 2자이상, 10자 이하로 입력하여 주십시오";
			throw new IllegalStateException(msg);
		}
		
		//아이디 중복확인
		if (userRepository.findByUserId(user.getUserId()).isPresent())
			throw new IllegalStateException("이미 존재하는 아이디입니다");
		
		userRepository.save(user);
		return user.getUserNo();
	}

	//로그인
	@Override
	public long login(User user) {
		
		if(userRepository.findByUserId(user.getUserId()).isPresent() == false)
			throw new IllegalStateException("존재하지 않는 아이디 입니다");
		
		User selectedUser = userRepository.findByUserId(user.getUserId()).get();
		if(selectedUser.getUserPassword().compareTo(user.getUserPassword()) != 0)
			throw new IllegalStateException("비밀번호가 일치하지 않습니다");
		
		
		return selectedUser.getUserNo();
	}

	//회원탈퇴
	@Override
	public void deleteUser(User user) {
		if(userRepository.findByUserId(user.getUserId()).isPresent() == false)
			throw new IllegalStateException("존재하지 않는 아이디 입니다");
		
		userRepository.deleteById(userRepository.findByUserId(user.getUserId()).get().getUserNo());
		
		return;
		
	}

}
