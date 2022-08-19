package com.bnksys.innerProject.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class UseType {
	//용도타입번호
	@Id
	@GeneratedValue
	private long utNo;
	
	//용도타입명
	@Column(length = 100, unique = true, nullable = false)
	private String utName;
	
	//너비
	@Column(nullable = false)
	private long width;
	
	
	//높이
	@Column(nullable = false)
	private long height;
}
