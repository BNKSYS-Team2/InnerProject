package com.bnksys.innerProject.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@DynamicInsert
@ToString
public class User {
	//유저번호
	@Id
	@Column(name="user_no")
	@GeneratedValue
	private long userNo;
	
	//유저 아이디
	@Column(length = 100, unique = true, nullable = false)
	private String userId;
	
	//유저 비밀번호
	@Column(length = 100, nullable = false)
	private String userPassword;
	
	
	//유저 이름
	@Column(length = 50, nullable = false)
	private String userName;
	
	//권한 1:계원, 2:책임자
	@ColumnDefault(value = "1")
	private Long authority;
}
