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
public class PromotionMaterial {
	//저작물 번호
	@Id
	@GeneratedValue
	private long pmNo;
	
	//유저 번호
	@Column(nullable = false)
	private long userNo;
	
	//제목
	@Column(length = 100, nullable = false)
	private String pmTitle;
	
	//파일 확장자명
	@Column(length = 100, nullable = false)
	private String fileExtension;
	
}
