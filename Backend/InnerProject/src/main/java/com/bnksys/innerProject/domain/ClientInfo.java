package com.bnksys.innerProject.domain;

import javax.persistence.Column;
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
public class ClientInfo {
	//클라이언트 번호
	@Id
	@GeneratedValue
	private long clientNo;
	
	//회사
	@Column(length = 100, nullable = false)
	private String company;
	
	//위치
	@Column(length = 100, nullable = false)
	private String location;
	
	
	//단말기
	@Column(length = 100, nullable = false)
	private String unit;
	
	//용도타입
	@ManyToOne
	@JoinColumn(name="UT_NO")
	private UseType utNo;
}
