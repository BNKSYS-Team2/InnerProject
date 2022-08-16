package com.bnksys.innerProject.domain;

import java.time.LocalDateTime;

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
public class Template {

	//템플릿 번호
	@Id
	@GeneratedValue
	private long temNo;
	
	private String tag1;
	
	private String tag2;
	
	private String tag3;
	
	private String tag4;
	
	private String tag5;
	
	
}
