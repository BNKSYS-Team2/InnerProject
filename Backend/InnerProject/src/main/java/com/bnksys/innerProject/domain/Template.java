package com.bnksys.innerProject.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
	
	//용도타입
	@ManyToOne
	@JoinColumn(name="UT_NO")
	private UseType utNo;
	
	//제목
	private String title;
	
}
