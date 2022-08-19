package com.bnksys.innerProject.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class Tag {
	//유저번호
	@Id
	@GeneratedValue
	private String tagName;
	
	//유저번호(등록자)
	@Column(unique = true, nullable = false)
	private long userNo;
	
	//등록일시
	@Column(updatable = false, columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@CreationTimestamp
	private LocalDateTime regDt;
}
