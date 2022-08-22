package com.bnksys.innerProject.domain;

import java.io.Serializable;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDatePk implements Serializable{
	private int year;
	
	private int month;
	
	private int day;
	
	private int time;
}
